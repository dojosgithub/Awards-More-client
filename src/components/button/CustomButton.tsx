// components/AddButton.tsx
import { Button, ButtonProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/iconify';

interface AddButtonProps extends ButtonProps {
  label: string;
  icon?: string;
  href?: string;
}

export default function CustomButton({
  label,
  icon = 'mingcute:add-line',
  href,
  onClick,
  sx,
  ...other
}: AddButtonProps) {
  return (
    <Button
      component={RouterLink}
      onClick={onClick}
      to={href}
      startIcon={<Iconify icon={icon} />}
      sx={{
        backgroundColor: '#4491CE',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#357bb0', // darker shade on hover
        },
        ...sx,
      }}
      {...other}
    >
      {label}
    </Button>
  );
}
