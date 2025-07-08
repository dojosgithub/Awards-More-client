import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface CardItem {
  image: string;
  text: string;
}

const cardData: CardItem[] = [
  { image: '/assets/images/home/ourServices/ourService1.png', text: 'Premium Quality Products' },
  { image: '/assets/icons/service.png', text: 'Exceptional Client Service' },
  { image: '/assets/icons/timeline.png', text: 'On-Time Every Time' },
  { image: '/assets/icons/value.png', text: 'Value You Deserve' },
];

const HomeWhyChooseUs: React.FC = () => (
  <Box
    sx={{
      backgroundColor: '#DAE9F5',
      textAlign: 'center',
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 5, sm: 6, md: 8 },
    }}
  >
    {/* Section Titles */}
    <Typography
      sx={{
        fontSize: { xs: '1.75rem', sm: '2rem', md: '40px' },
        fontWeight: 600,
        color: '#4491CE',
        mb: 1,
      }}
    >
      Our Commitment To Excellence
    </Typography>
    <Typography
      sx={{
        fontSize: { xs: '1.125rem', sm: '1.25rem', md: '20px' },
        fontWeight: 700,
        color: '#313131',
        mb: { xs: 4, sm: 6 },
      }}
    >
      - Why Choose Us
    </Typography>

    {/* Card Grid */}
    <Grid container spacing={3} justifyContent="center">
      {cardData.map((card, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={index}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 275,
              height: 247,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              py: 3,
              textAlign: 'center',
            }}
          >
            <Box
              component="img"
              src={card.image}
              alt={card.text}
              sx={{
                width: 58,
                height: 51,
                objectFit: 'contain',
                mb: 2,
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: '15px', sm: '16px' },
                fontWeight: 600,
                color: '#313131',
              }}
            >
              {card.text}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default HomeWhyChooseUs;
