/**
 * FrequencySelector Component
 * Radio button group for recurring gift frequency selection
 */

import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fade,
} from '@mui/material';
import { memo } from 'react';
import type { Frequency } from '../../types/giving';
import { frequencyOptions, givingPageContent } from '../../data/givingData';

interface FrequencySelectorProps {
  value: Frequency | undefined;
  onChange: (value: Frequency) => void;
  visible: boolean;
}

export const FrequencySelector = memo(
  ({ value, onChange, visible }: FrequencySelectorProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value as Frequency);
    };

    if (!visible) return null;

    return (
      <Fade in={visible} timeout={400}>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
            }}
          >
            {givingPageContent.form.frequencyLabel}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={value || ''}
              onChange={handleChange}
              aria-label="Gift frequency selection"
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 1.5,
              }}
            >
              {frequencyOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  data-testid={`frequency-${option.value}`}
                  control={
                    <Radio
                      sx={{
                        color: 'divider',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: value === option.value ? 600 : 500,
                          color:
                            value === option.value
                              ? 'primary.main'
                              : 'text.primary',
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    m: 0,
                    p: 2,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor:
                      value === option.value ? 'primary.main' : 'divider',
                    backgroundColor:
                      value === option.value
                        ? 'rgba(90, 12, 119, 0.04)'
                        : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'rgba(90, 12, 119, 0.02)',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Fade>
    );
  },
);

FrequencySelector.displayName = 'FrequencySelector';
