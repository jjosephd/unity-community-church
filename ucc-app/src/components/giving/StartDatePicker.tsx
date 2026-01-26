/**
 * StartDatePicker Component
 * Date picker for selecting the starting date of gifts
 */

import { Box, Typography, TextField } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { memo } from 'react';
import { format } from 'date-fns';
import { givingPageContent } from '../../data/givingData';

interface StartDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
}

export const StartDatePicker = memo(
  ({ value, onChange, minDate = new Date() }: StartDatePickerProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = new Date(event.target.value);
      if (!isNaN(newDate.getTime())) {
        onChange(newDate);
      }
    };

    // Format date for the input (YYYY-MM-DD)
    const inputValue = format(value, 'yyyy-MM-dd');
    const minDateValue = format(minDate, 'yyyy-MM-dd');

    // Format date for display
    const displayDate = format(value, 'MMM d, yyyy');
    const isToday =
      format(value, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

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
          {givingPageContent.form.startDateLabel}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 2,
              borderRadius: 3,
              border: '2px solid',
              borderColor: 'divider',
              flex: 1,
              backgroundColor: 'background.paper',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: 'primary.light',
              },
              '&:focus-within': {
                borderColor: 'primary.main',
                boxShadow: '0 0 0 3px rgba(90, 12, 119, 0.1)',
              },
            }}
          >
            <CalendarToday
              sx={{
                color: 'primary.main',
                fontSize: 22,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                {displayDate}
                {isToday && (
                  <Typography
                    component="span"
                    sx={{
                      ml: 1,
                      fontSize: '0.85rem',
                      color: 'text.secondary',
                    }}
                  >
                    (Today)
                  </Typography>
                )}
              </Typography>
            </Box>
            <TextField
              type="date"
              value={inputValue}
              onChange={handleChange}
              inputProps={{
                min: minDateValue,
                'data-testid': 'start-date-input',
                'aria-label': 'Select starting date',
              }}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                '& input': {
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  },
);

StartDatePicker.displayName = 'StartDatePicker';
