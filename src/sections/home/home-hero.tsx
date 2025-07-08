import React from 'react';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => (
  <Box
    sx={{
      position: 'relative',
      height: '756px',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      marginTop: '64px',
    }}
  >
    {/* Background Video */}
    {/* <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        opacity: 0.4,
      }}
    >
      <source src="/assets/background/WebsiteHeader.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}

    {/* Centered Text */}
    <Box sx={{ zIndex: 1, px: 2 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
        }}
      >
        THE CUSTOM Designs
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 400,
          fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem' },
          mt: 1,
        }}
      >
        EXPERIENCE YOU DESERVE
      </Typography>
    </Box>
  </Box>
);

export default Home;
