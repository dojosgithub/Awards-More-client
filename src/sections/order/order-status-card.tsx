import React from 'react';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import {
  Box,
  Card,
  Typography,
  Stepper,
  Step,
  StepLabel,
  styled,
  Chip,
  StepIconProps,
  Stack,
} from '@mui/material';
import { Icon } from '@iconify/react';

interface StepData {
  label: string;
  time: string;
  completed: boolean;
}

const steps: StepData[] = [
  { label: 'Payment Pending', time: '04/16/2025, 01:00 PM', completed: true },
  { label: 'Order', time: '04/16/2025, 01:12 PM', completed: true },
  { label: 'Shipped', time: '04/16/2025, 05:14 AM', completed: true },
  { label: 'Delivered', time: '04/16/2025, 12:00 AM', completed: false },
];

// Connector line style
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderColor: theme.palette.success.main,
    borderStyle: 'solid',
  },
}));

// Custom step icon
const CustomStepIcon = (props: StepIconProps) => {
  const { completed, icon } = props;
  const step = Number(icon);

  let iconName = '';
  let color = '';

  if (completed) {
    iconName = 'mdi:check-circle';
    color = '#2e7d32'; // green
  } else if (step === 4) {
    iconName = 'mdi:help-circle-outline';
    color = '#f57c00'; // orange
  } else {
    iconName = 'mdi:progress-clock';
    color = '#ccc';
  }

  return <Icon icon={iconName} width="24" height="24" color={color} />;
};

const OrderStatusCard: React.FC = () => (
  <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
    <Typography variant="h6" fontWeight="bold">
      Order Payment
    </Typography>
    <Typography variant="body2" color="text.secondary" mb={2}>
      04/16/2025, 11:00 AM
    </Typography>

    <Stepper alternativeLabel activeStep={3} connector={<CustomConnector />} sx={{ mb: 2 }}>
      {steps.map((step, index) => (
        <Step key={index} completed={step.completed}>
          <StepLabel StepIconComponent={CustomStepIcon}>
            <Typography variant="body2">{step.label}</Typography>
            <Typography variant="caption" color="text.secondary">
              {step.time}
            </Typography>
          </StepLabel>
        </Step>
      ))}
      <Chip
        label="Payment Pending"
        color="warning"
        variant="outlined"
        sx={{ fontWeight: 'bold' }}
      />
    </Stepper>

    {/* <Box display="flex" justifyContent="center">
        <Chip
          label="Payment Pending"
          color="warning"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </Box> */}
  </Card>
);

export default OrderStatusCard;
