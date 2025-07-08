import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: 389,
      backgroundColor: '#f5f5f5',
      borderRadius: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        width: '100%',
        height: { xs: 200, sm: 250, md: '331px' },
        objectFit: 'cover',
        display: 'block',
      }}
    />
    <Box
      sx={{
        p: 2,
        flexGrow: 1,
        textAlign: 'center',
        background: '#DAE9F5',
        height: '177px',
      }}
    >
      <Typography sx={{ fontWeight: 500, fontSize: '26px' }}>{title}</Typography>
      <Typography sx={{ fontWeight: 400, fontSize: '16px' }}>
        {description.match(/.{1,30}/g)?.map((chunk, idx) => (
          <React.Fragment key={idx}>
            {chunk}
            <br />
          </React.Fragment>
        ))}
      </Typography>
    </Box>
  </Box>
);

const HomeOurServices: React.FC = () => {
  const router = useRouter();
  const services = [
    {
      image: '/assets/images/home/ourServices/ourService1.png',
      title: 'Apparel',
      description:
        'Find custom apparel for all occasion,from stylish uniforms to personalized accessories',
    },
    {
      image: '/assets/images/home/ourServices/ourService2.png',
      title: 'Corporate Awards And Trophies',
      description:
        'Choose from our exquisite trophy selection to honor achievements and milestones.',
    },
    {
      image: '/assets/images/home/ourServices/ourService3.png',
      title: 'Engraving',
      description:
        'Personalize girts and awards wtih precision engraving that adds a special touch.',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, md: 10 },
        textAlign: 'center',
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.75rem' },
            fontWeight: 600,
            color: '#4491CE',
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          Tailored Awards & Apparel <br />
          That Fit You!
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            color: '#313131',
          }}
        >
          - Our Service
        </Typography>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} display="flex" justifyContent="center">
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>

      {/* Button Section */}
      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Button
          onClick={() => router.push(paths.categories)}
          sx={{
            backgroundColor: '#4491CE',
            color: '#FFFFFF',
            px: 4,
            py: 1.5,
            fontSize: { xs: '0.9rem', md: '1rem' },
            borderRadius: 2,
            mt: 1,
            '&:hover': {
              backgroundColor: '#357bb0',
            },
          }}
        >
          Browse All Categories
        </Button>
      </Box>
    </Box>
  );
};

export default HomeOurServices;
