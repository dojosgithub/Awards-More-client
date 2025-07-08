import { useState, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import OrderDetailsInfo from '../order-details-info';
import OrderDetailsItems from '../order-details-item';
import OrderDetailsToolbar from '../order-details-toolbar';
import OrderDetailsHistory from '../order-details-history';
import OrderStatusCard from '../order-status-card';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function OrderDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const currentOrder = _orders.filter((order) => order.id === id)[0];

  const [status, setStatus] = useState(currentOrder.status);

  const handleChangeStatus = useCallback((newValue: string) => {
    setStatus(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Order Details"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Order details',
            href: paths.dashboard.order.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {/* <OrderDetailsToolbar
        backLink={paths.dashboard.order.root}
        orderNumber={currentOrder.orderNumber}
        createdAt={currentOrder.createdAt}
        status={status}
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
      /> */}
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <OrderStatusCard />

          <Stack pt={1} spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              items={currentOrder.items}
              taxes={currentOrder.taxes}
              shipping={currentOrder.shipping}
              discount={currentOrder.discount}
              subTotal={currentOrder.subTotal}
              totalAmount={currentOrder.totalAmount}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <OrderDetailsInfo
            customer={currentOrder.customer}
            delivery={currentOrder.delivery}
            payment={currentOrder.payment}
            shippingAddress={currentOrder.shippingAddress}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
