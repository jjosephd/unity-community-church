/**
 * PlatformCard Component
 * Beautiful, interactive card for each giving platform option
 */

import { Box, Typography, Paper } from '@mui/material';
import { memo, type ReactNode } from 'react';

interface PlatformCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  accentColor: string;
  onClick: () => void;
  testId: string;
}

export const PlatformCard = memo(
  ({
    title,
    description,
    icon,
    color,
    accentColor,
    onClick,
    testId,
  }: PlatformCardProps) => {
    return (
      <Paper
        component="button"
        onClick={onClick}
        data-testid={testId}
        elevation={0}
        sx={{
          width: '100%',
          p: 0,
          border: 'none',
          cursor: 'pointer',
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: `linear-gradient(135deg, ${color} 0%, ${accentColor} 100%)`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.4s',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: `0 20px 40px ${color}40`,
            '&::before': {
              opacity: 1,
            },
          },
          '&:active': {
            transform: 'translateY(-4px) scale(1.01)',
          },
          '&:focus-visible': {
            outline: '3px solid',
            outlineColor: accentColor,
            outlineOffset: 4,
          },
        }}
      >
        <Box
          sx={{
            p: { xs: 4, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >
          {/* Icon Container */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              backdropFilter: 'blur(10px)',
            }}
          >
            {icon}
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'white',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '0.95rem', sm: '1rem' },
              maxWidth: '280px',
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>

          {/* CTA Hint */}
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            Click to give →
          </Typography>
        </Box>
      </Paper>
    );
  },
);

PlatformCard.displayName = 'PlatformCard';
