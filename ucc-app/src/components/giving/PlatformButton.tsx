/**
 * PlatformButton Component
 * Sleek, Linktree-style button with glass effect
 */

import { Box, Typography, ButtonBase } from '@mui/material';
import { memo, type ReactNode } from 'react';

interface PlatformButtonProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  iconColor: string;
  onClick: () => void;
  testId: string;
}

export const PlatformButton = memo(
  ({
    title,
    subtitle,
    icon,
    iconColor,
    onClick,
    testId,
  }: PlatformButtonProps) => {
    return (
      <ButtonBase
        onClick={onClick}
        data-testid={testId}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2.5,
          p: 2.5,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 24px rgba(90, 12, 119, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          textAlign: 'left',
          '&:hover': {
            transform: 'translateY(-3px)',
            background: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0 8px 32px rgba(90, 12, 119, 0.12)',
            border: '1px solid rgba(90, 12, 119, 0.15)',
          },
          '&:active': {
            transform: 'translateY(-1px)',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 3,
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            background: `linear-gradient(135deg, ${iconColor} 0%, ${iconColor}CC 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 4px 12px ${iconColor}40`,
          }}
        >
          {icon}
        </Box>

        {/* Text Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: '1.1rem',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.85rem',
                display: 'block',
                mt: 0.3,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Arrow */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'rgba(90, 12, 119, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s',
            '.MuiButtonBase-root:hover &': {
              backgroundColor: 'rgba(90, 12, 119, 0.12)',
              transform: 'translateX(2px)',
            },
          }}
        >
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            →
          </Typography>
        </Box>
      </ButtonBase>
    );
  },
);

PlatformButton.displayName = 'PlatformButton';
