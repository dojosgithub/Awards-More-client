import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { Modal, Box, IconButton } from '@mui/material';

import ScrollProgress from 'src/components/scroll-progress';
import Iconify from 'src/components/iconify';
import HomeHero from '../home-hero';
import HomeOurServices from '../home-our-services';
import HomeFeaturedProducts from '../home-featured-product';
import HomeAboutUsSection from '../home-about-us';
import HomeWhyChooseUs from '../home-why-choose';
import HomeContactUs from '../home-contact-us';
import HomeElevate from '../home-elevate';
import HomeSubscribeBanner from '../home-subscribe-banner';

export default function HomeView() {
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Automatically open modal after 1 second (for demo)
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />
      <HomeOurServices />
      <HomeFeaturedProducts />
      <HomeAboutUsSection />
      <HomeWhyChooseUs />
      <HomeContactUs />
      <HomeElevate />

      {/* Centered Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          {/* Optional Close Button */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10,
              color: '#fff',
            }}
          >
            <Iconify icon="bitcoin-icons:cross-filled" width={16} sx={{ mr: 0.5 }} />
          </IconButton>

          <HomeSubscribeBanner />
        </Box>
      </Modal>
    </>
  );
}
