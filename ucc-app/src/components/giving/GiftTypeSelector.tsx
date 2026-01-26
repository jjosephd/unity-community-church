/**
 * GiftTypeSelector Component
 * Toggle between one-time and recurring gifts
 */

import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { CardGiftcard, Repeat } from '@mui/icons-material';
import { memo } from 'react';
import type { GiftType } from '../../types/giving';
import { giftTypeOptions, givingPageContent } from '../../data/givingData';

interface GiftTypeSelectorProps {
  value: GiftType;
  onChange: (value: GiftType) => void;
}

const iconMap = {
  gift: CardGiftcard,
  repeat: Repeat,
};

export const GiftTypeSelector = memo(
  ({ value, onChange }: GiftTypeSelectorProps) => {
    const handleChange = (
      _event: React.MouseEvent<HTMLElement>,
      newValue: GiftType | null,
    ) => {
      if (newValue !== null) {
        onChange(newValue);
      }
    };

    return (
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: 'text.primary',
          }}
        >
          {givingPageContent.form.giftTypeLabel}
        </Typography>

        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={handleChange}
          aria-label="Gift type selection"
          sx={{
            display: 'flex',
            gap: 2,
            '& .MuiToggleButtonGroup-grouped': {
              border: '2px solid',
              borderColor: 'divider',
              borderRadius: '16px !important',
              flex: 1,
              py: 2.5,
              px: 3,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:not(:first-of-type)': {
                borderLeft: '2px solid',
                borderColor: 'divider',
                ml: 0,
              },
              '&:hover': {
                borderColor: 'primary.light',
                backgroundColor: 'rgba(90, 12, 119, 0.04)',
              },
              '&.Mui-selected': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(90, 12, 119, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(90, 12, 119, 0.12)',
                },
              },
            },
          }}
        >
          {giftTypeOptions.map((option) => {
            const Icon = iconMap[option.icon as keyof typeof iconMap];
            return (
              <ToggleButton
                key={option.value}
                value={option.value}
                aria-label={option.label}
                data-testid={`gift-type-${option.value}`}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 28,
                      color:
                        value === option.value
                          ? 'primary.main'
                          : 'text.secondary',
                      transition: 'color 0.3s',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: value === option.value ? 600 : 500,
                      color:
                        value === option.value
                          ? 'primary.main'
                          : 'text.secondary',
                      transition: 'all 0.3s',
                    }}
                  >
                    {option.label}
                  </Typography>
                </Box>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
    );
  },
);

GiftTypeSelector.displayName = 'GiftTypeSelector';
