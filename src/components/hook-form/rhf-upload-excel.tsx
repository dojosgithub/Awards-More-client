import { useFormContext, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { Upload, UploadProps } from '../upload';

interface Props extends Omit<UploadProps, 'file' | 'files'> {
  name: string;
  multiple?: boolean;
  helperText?: React.ReactNode;
}

export function RHFUploadExcel({ name, multiple, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{
              'application/vnd.ms-excel': [],
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{
              'application/vnd.ms-excel': [],
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}
