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
  ExpandMore,
} from '@mui/icons-material';
import { memo, useState, type FormEvent } from 'react';
import type { ContactInfo } from '../../types/home';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

const HourRow = ({ hour }: { hour: ContactInfo['hours'][0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        mb: 2,
        '&:last-child': { mb: 0 },
        transition: 'transform 0.2s ease-in-out',
        '&:hover .details-text': {
          fontSize: { md: '0.8rem' },
          color: { md: 'text.primary' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          mb: 0.25,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {hour.day}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          {hour.time}
        </Typography>
      </Box>
      {hour.details && (
        <Typography
          variant="caption"
          className="details-text"
          color="text.secondary"
          display="block"
          sx={{
            lineHeight: 1.4,
            fontStyle: 'italic',
            mt: 0.5,
            transition: 'font-size 0.2s ease-in-out, color 0.2s ease-in-out',
          }}
        >
          {hour.details}
        </Typography>
      )}
      {hour.link && (
        <Typography
          component="a"
          href={hour.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="caption"
          sx={{
            color: 'primary.main',
            textDecoration: 'underline',
            display: 'inline-block',
            mt: 0.5,
            fontWeight: 600,
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          Join Virtually →
        </Typography>
      )}
      {hour.extraInfo && (
        <Box sx={{ mt: 1 }}>
          <Button
            size="small"
            onClick={() => setIsOpen(!isOpen)}
            endIcon={
              <ExpandMore
                sx={{
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  fontSize: '1rem !important',
                }}
              />
            }
            sx={{
              p: 0,
              minWidth: 0,
              fontSize: '0.75rem',
              textTransform: 'none',
              color: 'primary.main',
              fontWeight: 600,
              '&:hover': { background: 'none', textDecoration: 'underline' },
            }}
          >
            {hour.extraInfo.label}
          </Button>
          {isOpen && (
            <Paper
              elevation={0}
              sx={{
                mt: 1,
                p: 1.5,
                bgcolor: 'rgba(90, 12, 119, 0.04)',
                borderRadius: 2,
                borderLeft: '3px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 500 }}
              >
                {hour.extraInfo.content}
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

/**
 * Contact Section Component
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
                  transition:
                    'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  transition:
                    'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  transition:
                    'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  transition:
                    'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                      <HourRow key={index} hour={hour} />
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
