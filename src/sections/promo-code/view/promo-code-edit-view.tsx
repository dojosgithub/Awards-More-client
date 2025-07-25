// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _invoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { useGetCategory } from 'src/api/categories';
import PromoCodeNewEditForm from '../promo-code-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PromoCodeEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { category: currentCategory } = useGetCategory(id);
  // console.log('currentCategory', currentCategory);

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

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
            name: 'Promo Code',
            href: paths.dashboard.category.root,
          },
          // { name: currentInvoice?.invoiceNumber },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PromoCodeNewEditForm />
    </Container>
  );
}
