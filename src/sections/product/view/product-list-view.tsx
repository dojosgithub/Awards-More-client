import { useState, useCallback, useEffect } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';

import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { Box, Modal, TablePagination, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
// _mock
import { _invoices, INVOICE_SERVICE_OPTIONS } from 'src/_mock';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';
// types
import CustomButton from 'src/components/button/CustomButton';
import { IProduct, IProductTableFilters, IProductTableFilterValue } from 'src/types/product';
import { deleteProduct, useGetProduct, useGetProducts } from 'src/api/product';
import ProductTableToolbar from '../product-table-toolbar';
import ProductTableRow from '../product-table-row';
import NewProductExcelUploadForm from './product-new-csv-form';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'imageUrl', label: 'Image' },
  { id: 'title', label: 'Title' },
  { id: 'category', label: 'Category' },
  { id: 'sku', label: 'SKU' },
  { id: 'price', label: 'Price' },
  { id: 'minimumOrderQuantity', label: 'Minimum Order' },
  { id: 'action', label: 'Action' },
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
const defaultFilters: IProductTableFilters = {
  name: '',
  startDate: null,
  endDate: null,
  role: '',
  stock: [],
  publish: [],
  service: '',
  status: '',
};

// ----------------------------------------------------------------------

export default function ProductListView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: '' });

  const confirm = useBoolean();
  const [filters, setFilters] = useState<IProductTableFilters>({
    ...defaultFilters,
    page: 1,
    limit: 10,
  });

  const { products, productsLoading, productsError, mutateProducts, totalDocs } =
    useGetProducts(filters);
  // console.log('products', products);

  const [page, setPage] = useState(0); // MUI uses 0-based page index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tableData, setTableData] = useState<IProduct[]>([]);
  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);
  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = tableData;
  // console.log('dataFiltered', dataFiltered);

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.name ||
    // !!filters.service.length ||
    filters.status !== 'all' ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IProductTableFilterValue) => {
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
        await deleteProduct(id);
        enqueueSnackbar('Product deleted successfully!');
        mutateProducts();
      } catch (error) {
        console.error('Error deleting Product:', error);
        enqueueSnackbar('Failed to delete Product', { variant: 'error' });
      }
    },
    [mutateProducts]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  );
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    setFilters((prev) => ({ ...prev, page: newPage + 1 })); // API expects 1-based page
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
          heading="Product Management"
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: 'Products',
              href: paths.dashboard.product.root,
            },
          ]}
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <CustomButton label="Add Product" href={paths.dashboard.product.new} />
              <CustomButton label="Add Bulk" onClick={handleOpen} />
            </Box>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            dateError={dateError}
            serviceOptions={INVOICE_SERVICE_OPTIONS.map((option) => option.name)}
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
                    <ProductTableRow
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
            rowsPerPageOptions={[]}
            labelRowsPerPage=""
          />
        </Card>
      </Container>

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
          <h2 id="add-category-title">Upload CSV</h2>
          <Typography>
            Lorem Ipsumis simply dummy text of the printing and typesetting industry.{' '}
          </Typography>
          <NewProductExcelUploadForm />
        </Box>
      </Modal>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: IProduct[];
  comparator: (a: any, b: any) => number;
  filters: IProductTableFilters;
  dateError: boolean;
}) {
  const { name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by name (title or sku)
  if (name) {
    inputData = inputData.filter(
      (item) =>
        item.title.toLowerCase().includes(name.toLowerCase()) ||
        item.sku.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Date filtering (optional, based on createdAt)
  if (startDate && endDate && !dateError) {
    inputData = inputData.filter((item) => {
      const createdAt = new Date(item.createdAt).getTime();
      return createdAt >= startDate.getTime() && createdAt <= endDate.getTime();
    });
  }

  return inputData;
}
