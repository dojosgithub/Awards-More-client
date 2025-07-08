import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Container,
  IconButton,
  Button,
} from '@mui/material';
import Iconify from 'src/components/iconify';

// Sample FAQs
const faqData = [
  {
    question: 'What is your return policy?',
    answer: 'You can return any item within 30 days of purchase for a full refund.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping usually takes between 3-7 business days depending on your location.',
  },
  {
    question: 'Do you offer technical support?',
    answer: 'Yes, we offer 24/7 technical support via email and chat.',
  },
];

export default function ContactFAQSection() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#DAE9F5',
        // height: '761px',
        // py: 5,
        mt: 5,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={4} p={4}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#313131' }}>FAQs</Typography>
          <Typography
            sx={{
              fontSize: { xs: '20px', sm: '20px', md: '40px' },
              fontWeight: 600,
              color: '#4491CE',
            }}
          >
            Answering your common questions
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {faqData.map((item, index) => {
            const panelId = `panel-${index}`;
            const isOpen = expanded === panelId;

            return (
              <Accordion
                key={panelId}
                expanded={isOpen}
                onChange={handleChange(panelId)}
                sx={{
                  bgcolor: '#fff',
                  boxShadow: 2,
                  borderRadius: 2,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <IconButton edge="end">
                      {isOpen ? (
                        <Iconify icon="ic:twotone-minus" color="#4491CE" width={17} />
                      ) : (
                        <Iconify icon="ic:baseline-plus" color="#4491CE" width={17} />
                      )}
                    </IconButton>
                  }
                  aria-controls={`${panelId}-content`}
                  id={`${panelId}-header`}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: isOpen ? '#4491CE' : '#313131',
                      fontSize: '16px',
                    }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: '#313131', fontSize: '16px', fontWeight: 300 }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4491CE',
              p: 2,
              color: '#fff',
              textTransform: 'none',
              px: 4,
              py: 1.2,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#357bb0',
              },
            }}
          >
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
