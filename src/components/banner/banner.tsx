import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

interface BannerProps {
  // backgroundImage: string;
  heading: string;
  subtext: string;
  height?: string | number;
}

const Banner: React.FC<BannerProps> = ({ heading, subtext, height = '456px' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        height,
        backgroundImage: `url(/assets/background/banner.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: { xs: '1.8rem', md: '40px' },
            fontWeight: 700,
            mb: 2,
          }}
        >
          {heading}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.95rem', md: '16px' },
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          {subtext}
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
