import { Box, Container, Typography, Stack } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import { memo } from 'react';

interface LocationFooterProps {
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

/**
 * Location Footer Component
 * Displays church address and contact info
 */
export const LocationFooter = memo(
  ({ address, phone, email, mapUrl }: LocationFooterProps) => {
    return (
      <Box
        component="footer"
        data-testid="location-footer"
        sx={{
          py: { xs: 4, md: 2 },
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={0} alignItems="center" textAlign="center">
            <Box
              component="img"
              src={'/images/logo/logo_purple.png'}
              alt="Unity Community Church"
              sx={{
                height: { xs: 50, md: 100 },
                width: 'auto',
                transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />

            {/* Address */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <LocationOn sx={{ fontSize: 28 }} />
              <Typography
                component={mapUrl ? 'a' : 'span'}
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: 'inherit',
                  textDecoration: mapUrl ? 'underline' : 'none',
                  '&:hover': mapUrl ? { opacity: 0.85 } : {},
                }}
              >
                {address}
              </Typography>
            </Stack>

            {/* Contact Row */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 4 }}
              alignItems="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone sx={{ fontSize: 22 }} />
                <Typography
                  component="a"
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {phone}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Email sx={{ fontSize: 22 }} />
                <Typography
                  component="a"
                  href={`mailto:${email}`}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {email}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    );
  },
);

LocationFooter.displayName = 'LocationFooter';
