import Container from '@mui/material/Container';
// routes
import { Box, Grid } from '@mui/material';
import { paths } from 'src/routes/paths';
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { OrderListView } from 'src/sections/order/view';
import { useGetCustomer } from 'src/api/customers';
import CustomerDetailsContent from '../customer-details-content';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function CustomerDetailsView({ id }: Props) {
  const settings = useSettingsContext();
  const { customer } = useGetCustomer(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Customer Management"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Customer Detail',
            href: paths.dashboard.category.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Box sx={{ pl: 3 }}>
        <CustomerDetailsContent customer={customer} />
      </Box>
      <Box sx={{ pt: 3 }}>
        <OrderListView orderId={id} />
      </Box>
    </Container>
  );
}
