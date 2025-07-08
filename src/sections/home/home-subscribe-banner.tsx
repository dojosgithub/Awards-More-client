import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const HomeSubscribeBanner: React.FC = () => (
  <Box
    sx={{
      height: { xs: 'auto', md: '422px' },
      width: { xs: '100%', sm: '90%', md: '556px' },
      backgroundImage: 'url(/assets/background/subscribebanner.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 3, sm: 4 },
      mx: 'auto',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: { xs: '160px', sm: '180px', md: '207px' },
          height: { xs: '60px', sm: '70px', md: '80px' },
          backgroundImage: 'url(/assets/background/bannerFlag.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            textAlign: 'center',
            fontSize: { xs: '16px', md: '19px' },
            fontWeight: 400,
          }}
        >
          Exclusive Offer
        </Typography>
      </Box>

      <Typography
        sx={{
          color: 'white',
          textAlign: 'center',
          fontSize: { xs: '22px', sm: '26px', md: '30px' },
          fontWeight: 700,
        }}
      >
        Lorem is ipsum
      </Typography>

      <Typography
        sx={{
          color: 'white',
          textAlign: 'center',
          fontSize: { xs: '12px', sm: '13px', md: '14px' },
          fontWeight: 400,
          px: { xs: 2, sm: 4 },
        }}
      >
        No ipsum is lorem and lorem is ipsum
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 1, sm: 0 },
          mt: 1,
          width: '100%',
          maxWidth: '380px',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter email"
          sx={{
            width: { xs: '100%', sm: '239px' },
            input: { backgroundColor: 'white' },
            '& .MuiOutlinedInput-root': {
              borderRadius: { xs: 1, sm: '4px 0 0 4px' },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: { xs: '100%', sm: '140px' },
            height: '56px',
            borderTopLeftRadius: { xs: 1, sm: 0 },
            borderBottomLeftRadius: { xs: 1, sm: 0 },
            borderTopRightRadius: { xs: 1, sm: '4px' },
            borderBottomRightRadius: { xs: 1, sm: '4px' },
            textTransform: 'none',
          }}
        >
          Submit
        </Button>
      </Box>

      {/* Flash sale flag */}
      <Box
        sx={{
          width: { xs: '100px', sm: '120px', md: '132px' },
          height: '30px',
          backgroundImage: 'url(/assets/background/flashSaleFlag.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>FLASH30</Typography>
      </Box>

      {/* Redeem button */}
      <Button
        variant="outlined"
        sx={{
          width: { xs: '140px', sm: '155px' },
          height: '47px',
          borderColor: 'white',
          color: 'white',
          textTransform: 'none',
        }}
      >
        Redeem Now
      </Button>
    </Box>
  </Box>
);

export default HomeSubscribeBanner;
