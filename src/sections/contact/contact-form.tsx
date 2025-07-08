import { m } from 'framer-motion';
// @mui
import {
  Stack,
  Button,
  TextField,
  Typography,
  Box,
  Card,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
// components
import { MotionViewport } from 'src/components/animate';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack component={MotionViewport} spacing={5}>
      <Typography
        sx={{
          fontSize: '2.75rem',
          fontWeight: 700,
          color: '#313131',
          textAlign: 'center',
        }}
      >
        Contact Us
      </Typography>

      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          boxShadow: 3,
          borderRadius: 2,
          width: '100%',
          mx: 'auto',
        }}
      >
        <Grid container spacing={0} direction={isMdUp ? 'row' : 'column'} alignItems="stretch">
          {/* Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                px: { xs: 1, sm: 3 },
                py: 2,
                height: '100%',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  color: '#4491CE',
                  mb: 1,
                }}
              >
                Get in Touch
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', md: '14px' },
                  fontWeight: 400,
                  color: '#313131',
                  mb: 3,
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField name="firstName" label="First Name" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="lastName" label="Last Name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="email" label="Email" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="message" label="Message" multiline rows={4} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#4491CE',
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
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Divider */}
          {isMdUp && <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />}

          {/* Info */}
          <Grid item xs={12} md={5.5}>
            <Box
              sx={{
                px: { xs: 1, sm: 3 },
                py: 2,
                height: '100%',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  color: '#4491CE',
                  mb: 1,
                }}
              >
                Contact Info
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', md: '14px' },
                  fontWeight: 400,
                  color: '#313131',
                  mb: 3,
                }}
              >
                Reach out to us via phone or email for inquiries, quotes, or any assistance you may
                require.
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="mingcute:linkedin-fill" color="#4491CE" width={17} />
                  <Typography variant="body1">info@example.com</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify color="#4491CE" icon="ic:twotone-phone" width={17} />
                  <Typography variant="body1">+1 (123) 456-7890</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify color="#4491CE" icon="famicons:location" width={17} />
                  <Typography variant="body1">1234 Award St, Trophy City, TX</Typography>
                </Stack>
                <Divider />

                <Typography sx={{ fontWeight: 500, color: '#313131' }}>Follow</Typography>

                <Stack direction="row" spacing={3} alignItems="center">
                  <Iconify color="#4491CE" icon="ic:twotone-facebook" width={25} />
                  <Iconify color="#4491CE" icon="ri:instagram-line" width={25} />
                  <Iconify color="#4491CE" icon="mingcute:youtube-fill" width={25} />
                  <Iconify color="#4491CE" icon="basil:linkedin-solid" width={25} />
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
