// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { MotivationIllustration } from 'src/assets/illustrations';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

import DashboardWidgetSummary from '../dashboard-widget-summary';
import DashboardOrderStatusCard from '../dashboard-order-status-card';
import DashboardYearlySales from '../dashboard-yearly-sales';
import DashboardSalesOverview from '../dashboard-sales-overview';
import DashboardCurrentBalance from '../dashboard-current-balance';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Dashboard"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <DashboardWidgetSummary
            title={
              <>
                Total Sales <span style={{ color: '#4491CE' }}>(current month)</span>
              </>
            }
            total={18765}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <DashboardWidgetSummary title="Total Orders" total={18765} />
        </Grid>

        <Grid xs={12} md={4}>
          <DashboardWidgetSummary title="Total Customers" total={4876} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <DashboardOrderStatusCard
            title="Order Status"
            total={2324}
            chart={{
              series: [
                { label: 'Total', value: 12244 },
                { label: 'Deliverd', value: 53345 },
                { label: 'Pending', value: 44313 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <DashboardYearlySales
            title="Yearly Sales"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Total Income',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'Total Expenses',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Total Income',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'Total Expenses',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <DashboardSalesOverview title="Profit & Loss" data={_ecommerceSalesOverview} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <DashboardCurrentBalance
            title="Current Balance"
            currentBalance={187650}
            sentAmount={25500}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
