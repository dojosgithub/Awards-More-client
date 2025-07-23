import { format } from 'date-fns';
// @mui

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// hooks

// components

import { ICustomer } from 'src/types/customers';

// ----------------------------------------------------------------------

type Props = {
  row: ICustomer;
  selected: boolean;
  onViewRow: any;
};

export default function CustomerTableRow({ row, selected, onViewRow }: Props) {
  const {
    _id,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    quickbooksId,
    password,
    account_Type,
    orders,
    role,
    imageUrl,
    createdAt,
    updatedAt,
  } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell>{quickbooksId}</TableCell>
      <TableCell>{`${firstName} ${lastName}`}</TableCell>

      <TableCell>{address}</TableCell>

      <TableCell>{email}</TableCell>

      <TableCell sx={{ px: 1 }}>{format(new Date(createdAt), 'dd MMM yyyy')}</TableCell>
    </TableRow>
  );
}
