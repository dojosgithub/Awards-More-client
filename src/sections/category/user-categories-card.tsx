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
      maxWidth: 362,
      backgroundColor: '#f5f5f5',
      borderRadius: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '313px',
    }}
  >
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        width: '100%',
        height: { xs: 200, sm: 250, md: '272px' },
        objectFit: 'cover',
        display: 'block',
      }}
    />
    <Box
      sx={{
        p: 1,
        flexGrow: 1,
        textAlign: 'center',
        background: '#31C5F4',
        height: '177px',
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}>{title}</Typography>
      {/* <Typography sx={{ fontWeight: 400, fontSize: '16px' }}>
        {description.match(/.{1,30}/g)?.map((chunk, idx) => (
          <React.Fragment key={idx}>
            {chunk}
            <br />
          </React.Fragment>
        ))}
      </Typography> */}
    </Box>
  </Box>
);

const UserCategoriesCard: React.FC = () => {
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
      title: 'Acrylic & Crystal Awards',
      description:
        'Choose from our exquisite trophy selection to honor achievements and milestones.',
    },
    {
      image: '/assets/images/home/ourServices/ourService3.png',
      title: 'Hats',
      description:
        'Personalize gifts and awards wtih precision engraving that adds a special touch.',
    },
    {
      image: '/assets/images/home/ourServices/ourService3.png',
      title: 'Leatherette Gifts',
      description:
        'Personalize gifts and awards wtih precision engraving that adds a special touch.',
    },
    {
      image: '/assets/images/home/ourServices/ourService3.png',
      title: 'Personalizable Gifts',
      description:
        'Personalize gifts and awards wtih precision engraving that adds a special touch.',
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
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '44px' },
            fontWeight: 700,
            color: '#313131',
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          Select a Product Category
        </Typography>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, idx) => (
          <Grid
            key={idx}
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
            onClick={() =>
              router.push(`${paths.product.root}?category=${encodeURIComponent(service.title)}`)
            }
          >
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserCategoriesCard;
