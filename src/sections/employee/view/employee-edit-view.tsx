// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _tours } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { useGetEmployee } from 'src/api/employee';
import EmployeeNewEditForm from '../employee-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EmployeeEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { employee: currentEmployee, employeeLoading } = useGetEmployee(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Employee',
            href: paths.dashboard.employee.root,
          },
          { name: currentEmployee?.firstName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {!employeeLoading && currentEmployee && (
        <EmployeeNewEditForm currentEmployee={currentEmployee} />
      )}
    </Container>
  );
}
