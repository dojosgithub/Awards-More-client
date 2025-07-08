import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

const HomeElevate: React.FC = () => (
  <Box
    sx={{
      height: 322,
      backgroundImage: 'url(/assets/images/home/hero/homeelevate.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      px: { xs: 2, sm: 4, md: 8 },
    }}
  >
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      direction={{ xs: 'column', md: 'row' }}
    >
      <Grid item xs={12} md={8}>
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', md: '30px' },
            fontWeight: 700,
            color: '#fff',
            mb: 1,
          }}
        >
          Ready To Elevate Your Awards?
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '16px' },
            fontWeight: 400,
            color: '#fff',
            maxWidth: 600,
          }}
        >
          Contact us today to start creating custom trophies and apparel for your next event.
        </Typography>
      </Grid>

      <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'right' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#275668',
            width: '135px',
            height: '47px',
            border: '2px solid #FFFFFF',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '14px',
            px: 4,
            py: 1.5,
            mt: { xs: 2, md: 0 },
            '&:hover': {
              backgroundColor: '#357bb0',
            },
          }}
        >
          Shop Now
        </Button>
      </Grid>
    </Grid>
  </Box>
);

export default HomeElevate;
