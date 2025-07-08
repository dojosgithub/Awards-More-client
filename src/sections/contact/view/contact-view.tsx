// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// _mock
import { _mapContact } from 'src/_mock';
//
import Banner from 'src/components/banner/banner';
import ContactMap from '../contact-map';
import ContactHero from '../contact-hero';
import ContactForm from '../contact-form';
import ContactFAQSection from '../contact-faq';

// ----------------------------------------------------------------------

export default function ContactView() {
  return (
    <>
      <Banner
        heading="Ready to Elevate Your Awards?"
        subtext="Contact us today to start creating custom trophies and apparel for your next event."
      />

      {/* <Container sx={{ py: 10 }}> */}
      <Box
        gap={10}
        // display="grid"
        // gridTemplateColumns={{
        //   xs: 'repeat(1, 1fr)',
        //   md: 'repeat(2, 1fr)',
        // }}
      >
        <Box sx={{ p: 4 }}>
          <ContactForm />
        </Box>
        <ContactFAQSection />
        {/* <ContactMap contacts={_mapContact} /> */}
      </Box>
      {/* </Container> */}
    </>
  );
}
