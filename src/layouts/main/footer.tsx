import React from 'react';
import { Box, Typography, Grid, Link, TextField, Button, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import Logo from 'src/components/logo';

const Footer: React.FC = () => (
  <Box sx={{ bgcolor: 'black', color: 'white', px: 4, py: 6 }}>
    <Grid container spacing={4} justifyContent="space-between">
      {/* Logo & Description */}
      <Grid item xs={12} sm={6} md={3}>
        <Logo sx={{ mb: 1, mx: 'auto' }} />
        <Typography variant="body2" sx={{ color: '#ccc' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry
        </Typography>
        <Box mt={2} display="flex" gap={1}>
          <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
          <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
          <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
          <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ flexShrink: 0, ml: 0.5 }} />
        </Box>
      </Grid>

      {/* Quick Links */}
      <Grid item xs={12} sm={6} md={2}>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        {['Home', 'About Us', 'Service', 'Contact Us'].map((text) => (
          <Typography key={text} variant="body2" sx={{ mt: 1 }}>
            <Link href="#" color="inherit" underline="hover">
              {text}
            </Link>
          </Typography>
        ))}
      </Grid>

      {/* Contact Us */}
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ flexShrink: 0, ml: 0.5 }} />

          <Typography variant="body2">+1-222-333-4444</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ flexShrink: 0, ml: 0.5 }} />

          <Typography variant="body2">example@gmailcom</Typography>
        </Box>
      </Grid>

      {/* Newsletter */}
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" gutterBottom>
          Subscribe To Our Newsletter
        </Typography>
        <Typography variant="body2" sx={{ color: '#ccc', mb: 2 }}>
          Subscribe to our newsletter to get latest contents and updates of Awards & More.
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            placeholder="Enter your email"
            variant="outlined"
            size="small"
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              input: { p: 1 },
              width: '100%',
            }}
          />
          <Button variant="contained" sx={{ bgcolor: '#1976d2' }}>
            Subscribe Now
          </Button>
        </Box>
      </Grid>
    </Grid>

    {/* Bottom Footer */}
    <Box
      mt={6}
      borderTop={1}
      borderColor="gray"
      pt={2}
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Typography variant="body2" sx={{ color: '#aaa' }}>
        Copyright © 2024 Awards & More. All rights reserved.
      </Typography>
      <Box mt={{ xs: 1, md: 0 }}>
        <Link href="#" underline="hover" color="inherit" sx={{ mr: 2 }}>
          Privacy Policy
        </Link>
        <Link href="#" underline="hover" color="inherit">
          Terms & Conditions
        </Link>
      </Box>
    </Box>
  </Box>
);

export default Footer;
