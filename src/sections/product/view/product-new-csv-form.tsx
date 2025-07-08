import * as yup from 'yup';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useCallback } from 'react';
import { RHFUploadExcel } from 'src/components/hook-form/rhf-upload-excel';

export default function NewProductExcelUploadForm() {
  const NewProductCsvSchema = yup.object().shape({
    excelFile: yup
      .mixed()
      .nullable()
      .notRequired() // allow undefined as well
      .test('fileType', 'Only .xls or .xlsx files are allowed', (value) => {
        if (!value) return true; // pass if no file (optional)
        const file = value as File;
        return [
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ].includes(file.type);
      })
      .test('fileSize', 'File size is too large (max 5MB)', (value) => {
        if (!value) return true;
        const file = value as File;
        return file.size <= 5 * 1024 * 1024;
      }),
  });

  const methods = useForm({
    resolver: yupResolver(NewProductCsvSchema),
  });
  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'excelFile',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => setValue('excelFile', null), [setValue]);

  const onSubmit = (data: any) => {
    console.log('Submitted data:', data);
    // Handle file upload logic here
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFUploadExcel
            name="excelFile"
            maxSize={5 * 1024 * 1024}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
            helperText="Upload your Excel file (.xls or .xlsx)"
          />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Upload Excel
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
