import { format } from 'date-fns';
// @mui
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { Box } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { fCurrency } from 'src/utils/format-number';
// types
import { IInvoice } from 'src/types/category';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  row: IInvoice;
  selected: boolean;
  onViewRow: any;
};

export default function CustomerTableRow({ row, selected, onViewRow }: Props) {
  const { sent, invoiceNumber, createDate, dueDate, status, invoiceTo, totalAmount } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell
        onClick={onViewRow}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        c-2323232
      </TableCell>

      <TableCell>Mubashir Ali</TableCell>

      <TableCell>address-232323</TableCell>

      <TableCell>mobi@mailinator.com</TableCell>

      <TableCell sx={{ px: 1 }}>12-12-2022</TableCell>
    </TableRow>
  );
}
