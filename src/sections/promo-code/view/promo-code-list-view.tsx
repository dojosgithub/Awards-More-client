import { useState, useCallback, useEffect } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { Box, Modal, TablePagination } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';

// components

import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';
// types
import { IInvoiceTableFilterValue } from 'src/types/category';
//
import CustomButton from 'src/components/button/CustomButton';
import { deleteCategory } from 'src/api/categories';
import { IPromoCode, IPromoCodeTableFilters } from 'src/types/promo-codes';
import { useGetPromoCodes } from 'src/api/promo-code';
import PromoCodeTableToolbar from '../promo-code-table-toolbar';
import PromoCodeTableRow from '../promo-code-table-row';
import PromoCodeNewEditForm from '../promo-code-new-edit-form';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'Code' },
  { id: 'createdFor', label: 'Created For' },
  { id: 'discountAmount', label: 'Discount Amount' },
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const defaultFilters: IPromoCodeTableFilters = {
  code: '',
  type: '',
  discountAmount: 0,
  role: '',
  createdFor: '',
  _id: '',
};

// ----------------------------------------------------------------------

export default function PromoCodeListView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: '' });
  const [filters, setFilters] = useState<IPromoCodeTableFilters>({
    ...defaultFilters,
    page: 1,
    limit: 10,
  });

  const confirm = useBoolean();
  const { promocodes, mutatePromocodes, totalDocs } = useGetPromoCodes(filters);
  // console.log('category', category);
  const [tableData, setTableData] = useState<IPromoCode[]>([]);

  const [page, setPage] = useState(0); // MUI uses 0-based page index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [limit, setLimit] = useState(10);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (promocodes.length) {
      setTableData(promocodes);
    }
  }, [promocodes]);
  const dataFiltered = tableData;

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;

  const canReset = !!filters.code;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IInvoiceTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    async (id: string) => {
      try {
        await deleteCategory(id);
        enqueueSnackbar('Category deleted successfully!');
        mutatePromocodes();
      } catch (error) {
        console.error('Error deleting Category:', error);
        enqueueSnackbar('Failed to delete Category', { variant: 'error' });
      }
    },
    [mutatePromocodes]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row._id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.promocode.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.category.details(id));
    },
    [router]
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    setFilters((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    setFilters((prev) => ({ ...prev, page: 1, limit: newLimit }));
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Promo Code Management"
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: 'promo Codes',
              href: paths.dashboard.category.root,
            },
          ]}
          action={<CustomButton label="Add Promo Code" href={paths.dashboard.promocode.new} />}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <PromoCodeTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.map((row) => (
                    <PromoCodeTableRow
                      key={row._id}
                      row={row}
                      selected={table.selected.includes(row._id)}
                      onSelectRow={() => table.onSelectRow(row._id)}
                      onViewRow={() => handleViewRow(row._id)}
                      onEditRow={() => handleEditRow(row._id)}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalDocs}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]} // Hide dropdown
            labelRowsPerPage="" // Hide label
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-category-title"
        aria-describedby="add-category-description"
      >
        <Box
          sx={{
            ...style,
            maxHeight: '90vh', // Limit height to 90% of viewport height
            overflowY: 'auto', // Enable vertical scrolling
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 id="add-category-title">Add New Category</h2>

          <PromoCodeNewEditForm handleClose={handleClose} mutateCategory={mutatePromocodes} />
        </Box>
      </Modal>
    </>
  );
}
