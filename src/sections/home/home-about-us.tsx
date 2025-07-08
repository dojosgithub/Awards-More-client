import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const HomeAboutUsSection: React.FC = () => (
  <Box
    sx={{
      pl: { xs: 2, sm: 4, md: 8 },
      py: { xs: 6, md: 10 },
      backgroundColor: '#fff',
    }}
  >
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
    >
      {/* Left: Text */}
      <Grid item xs={12} md={6}>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', md: '44px' },
              fontWeight: 700,
              color: '#313131',
              mb: 2,
            }}
          >
            About Us
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '16px' },
              color: '#313131',
              lineHeight: 1.7,
            }}
          >
            Awards & More has been a cornerstone in mineral wells, TX, offering personalized items
            that honor special achievements and events. Ourcommitment to quality and customer
            satisfaction is unrivaled.
            <br />
            <br />
            From the historic baker hotel our present location, we have continued the tradition of
            providing exceptional custom apparel, trophies, and more with expert engraving and
            embroidery services. <br />
            <br />
            Awards & More, established in 1994 in Mineral Wells, TX, specializes in custom apparel,
            trophies, engraving, embroidery, and plaques.
          </Typography>
        </Box>
      </Grid>

      {/* Right: Image */}
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src="/assets/images/home/hero/homeAbout.png"
          alt="About Us"
          sx={{
            width: '100%',
            maxWidth: 741,
            height: { xs: 'auto', md: 475 },
            // objectFit: 'cover',
            borderRadius: 2,
            mx: 'auto',
            display: 'block',
          }}
        />
      </Grid>
    </Grid>
  </Box>
);

export default HomeAboutUsSection;
