// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import PromoCodeNewEditForm from '../promo-code-new-edit-form';

// ----------------------------------------------------------------------

export default function PromoCodeCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Promo Code"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Promo Code',
            href: paths.dashboard.category.root,
          },
          {
            name: 'New Promo Code',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PromoCodeNewEditForm />
    </Container>
  );
}
