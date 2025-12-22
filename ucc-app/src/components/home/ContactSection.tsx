import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
} from '@mui/icons-material';
import { memo, useState, type FormEvent } from 'react';
import type { ContactInfo } from '../../types/home';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

/**
 * Contact Section Component
 * Features:
 * - Grid layout for contact info and form
 * - Contact form with validation
 * - Icon-based contact details
 * - Responsive design
 */
export const ContactSection = memo(({ contactInfo }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission to Django API
    console.log('Form submitted:', formData);
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Box
      component="section"
      data-testid="contact-section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              letterSpacing: '-0.01em',
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            We'd love to hear from you. Reach out with any questions or to learn
            more about our church.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {/* Address */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 4px 20px rgba(90, 12, 119, 0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'rgba(90, 12, 119, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <LocationOn sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contactInfo.address}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Phone */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 4px 20px rgba(90, 12, 119, 0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'rgba(90, 12, 119, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Phone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contactInfo.phone}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Email */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 4px 20px rgba(90, 12, 119, 0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'rgba(90, 12, 119, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Email sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contactInfo.email}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Hours */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 4px 20px rgba(90, 12, 119, 0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'rgba(90, 12, 119, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <AccessTime sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Hours
                    </Typography>
                    {contactInfo.hours.map((hour, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {hour.day}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {hour.time}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'rgba(253, 248, 243, 0.5)',
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}
              >
                Send Us a Message
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={formData.name}
                      onChange={handleChange('name')}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleChange('message')}
                  required
                  variant="outlined"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    alignSelf: 'flex-start',
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});

ContactSection.displayName = 'ContactSection';
