import { useCallback, useEffect, useMemo } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// types
import { debounce } from 'lodash';
import { IInvoiceTableFilterValue } from 'src/types/category';
// components
import Iconify from 'src/components/iconify';
import { IPromoCodeTableFilters } from 'src/types/promo-codes';

// ----------------------------------------------------------------------

type Props = {
  filters: IPromoCodeTableFilters;
  onFilters: (code: string, value: IInvoiceTableFilterValue) => void;
  //
  // dateError: boolean;
};

export default function PromoCodeTableToolbar({ filters, onFilters }: Props) {
  const handleFilterName = useMemo(
    () => debounce((value: string) => onFilters('code', value), 300),
    [onFilters]
  );

  useEffect(
    () => () => handleFilterName.cancel(), // cleanup on unmount
    [handleFilterName]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          fullWidth
          value={filters.code}
          onChange={(e) => handleFilterName(e.target.value)}
          placeholder="Search "
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}
