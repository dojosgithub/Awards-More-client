import React from 'react';
import { Box, Card, Grid, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

const HomeContactUs: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Box
      sx={{
        pr: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, md: 10 },
        backgroundColor: '#fff',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: { xs: '1.8rem', sm: '2.5rem', md: '44px' },
          fontWeight: 700,
          color: '#313131',
          mb: 4,
        }}
      >
        Contact Us
      </Typography>

      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        direction={{ xs: 'column', md: 'row' }}
      >
        {/* Left: Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/assets/images/home/hero/homeContactus.png"
            alt="Contact Us"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 741 },
              height: { xs: 'auto', md: 475 },
              borderRadius: 2,
              mx: 'auto',
              display: 'block',
            }}
          />
        </Grid>

        {/* Right: Form */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              width: '100%',
              maxWidth: 600,
              mx: 'auto',
              p: { xs: 2, sm: 3 },
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 600,
                color: '#4491CE',
                mb: 1,
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: '14px' },
                fontWeight: 400,
                color: '#313131',
                mb: 3,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting.
            </Typography>

            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="firstName" label="First Name" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="lastName" label="Last Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name="email" label="Email" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name="message" label="Message" multiline rows={4} fullWidth />
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#4491CE',
                      color: '#fff',
                      textTransform: 'none',
                      px: 4,
                      py: 1.2,
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#357bb0',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </FormProvider>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeContactUs;
