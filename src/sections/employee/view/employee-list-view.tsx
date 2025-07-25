import sumBy from 'lodash/sumBy';
import { useState, useCallback, useEffect } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';

import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { TablePagination } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
// _mock
import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';
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
import { IInvoiceTableFilterValue } from 'src/types/category';
//
import CustomButton from 'src/components/button/CustomButton';

import { deleteEmployee, useGetEmployees } from 'src/api/employee';
import { IEmployee, IEmployeeTableFilters } from 'src/types/employees';
import EmployeeTableToolbar from '../employee-table-toolbar';
import EmployeeTableRow from '../employee-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'employeeId', label: 'Employee Id' },
  { id: 'name', label: 'Name' },
  { id: 'address', label: 'Address' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'actions', label: 'Actions' },
];

const defaultFilters: IEmployeeTableFilters = {
  service: '',
  status: '',
  name: '',
  role: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function EmployeeListView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: '' });

  const [filters, setFilters] = useState<IEmployeeTableFilters>({
    ...defaultFilters,
    page: 1,
    limit: 10,
  });
  const [page, setPage] = useState(0); // MUI uses 0-based page index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { employees, mutateEmployees, totalDocs } = useGetEmployees(filters);
  // console.log(employees);

  const [tableData, setTableData] = useState<IEmployee[]>([]);
  useEffect(() => {
    if (employees.length) {
      setTableData(employees);
    }
  }, [employees]);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = tableData;

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.name ||
    !!filters.service.length ||
    filters.status !== 'all' ||
    (!!filters.startDate && !!filters.endDate);

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
        await deleteEmployee(id);
        enqueueSnackbar('Employee deleted successfully!');
        mutateEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        enqueueSnackbar('Failed to delete employee', { variant: 'error' });
      }
    },
    [mutateEmployees]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.employee.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.employee.details(id));
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
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Employee Management"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Employees',
            href: paths.dashboard.category.root,
          },
        ]}
        action={<CustomButton label="Add Employee" href={paths.dashboard.employee.new} />}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <EmployeeTableToolbar
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
                  <EmployeeTableRow
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
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: IEmployee[];
  comparator: (a: any, b: any) => number;
  filters: IEmployeeTableFilters;
  dateError: boolean;
}) {
  const { name, role, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by name (first or last)
  if (name) {
    const lowerCaseName = name.toLowerCase();
    inputData = inputData.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(lowerCaseName) ||
        employee.lastName.toLowerCase().includes(lowerCaseName) ||
        employee.email.toLowerCase().includes(lowerCaseName)
    );
  }

  // Filter by role
  if (role && role !== 'all') {
    inputData = inputData.filter((employee) => employee.role === role);
  }

  // Filter by created date
  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((employee) => {
      const createdAt = new Date(employee.createdAt).getTime();
      return createdAt >= startDate.getTime() && createdAt <= endDate.getTime();
    });
  }

  return inputData;
}
