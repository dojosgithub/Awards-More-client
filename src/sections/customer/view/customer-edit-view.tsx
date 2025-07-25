// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _jobs } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import JobNewEditForm from '../job-new-edit-form';
//

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function CustomerEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentJob = _jobs.find((job) => job.id === id);

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
            name: 'Customer',
            href: paths.dashboard.customer.root,
          },
          { name: currentJob?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobNewEditForm currentJob={currentJob} />
    </Container>
  );
}
