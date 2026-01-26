/**
 * GivingPlatformSelector Component
 * Sleek Linktree-style platform selection
 */

import { Box, Container, Typography, Paper } from '@mui/material';
import { CurrencyExchange } from '@mui/icons-material';
import { memo, useCallback } from 'react';
import { PlatformButton } from './PlatformButton';
import { givingPlatforms, givingPageContent } from '../../data/givingData';

// Givelify icon
const GivelifyIcon = () => (
  <Box
    component="span"
    sx={{
      fontSize: 24,
      fontWeight: 800,
      color: 'white',
      fontFamily: '"Inter", sans-serif',
    }}
  >
    G
  </Box>
);

// Cash App icon
const CashAppIcon = () => (
  <CurrencyExchange sx={{ fontSize: 26, color: 'white' }} />
);

const iconMap = {
  givelify: GivelifyIcon,
  cashapp: CashAppIcon,
};

export const GivingPlatformSelector = memo(() => {
  const handlePlatformClick = useCallback((platformId: string) => {
    const platform = givingPlatforms.find((p) => p.id === platformId);
    if (platform?.url) {
      console.log(`Opening ${platform.name}:`, platform.url);
      window.open(platform.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(
        `${platform?.name || 'Platform'} integration coming soon! Please contact the church office for giving options.`,
      );
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
      <Paper
        elevation={0}
        data-testid="giving-platform-selector"
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 40px rgba(90, 12, 119, 0.08)',
        }}
      >
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 0.5,
            }}
          >
            {givingPageContent.selector.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {givingPageContent.selector.subtitle}
          </Typography>
        </Box>

        {/* Platform Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {givingPlatforms.map((platform) => {
            const IconComponent = iconMap[platform.id as keyof typeof iconMap];
            return (
              <PlatformButton
                key={platform.id}
                title={platform.name}
                subtitle={platform.description}
                icon={IconComponent ? <IconComponent /> : null}
                iconColor={platform.color}
                onClick={() => handlePlatformClick(platform.id)}
                testId={`platform-${platform.id}`}
              />
            );
          })}
        </Box>

        {/* Security Note */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 3,
            opacity: 0.8,
          }}
        >
          🔒 Secure & encrypted transactions
        </Typography>
      </Paper>
    </Container>
  );
});

GivingPlatformSelector.displayName = 'GivingPlatformSelector';
