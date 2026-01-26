/**
 * FundSelector Component
 * Fund selection with amount input and ability to add multiple funds
 */

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Button,
  Fade,
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { memo } from 'react';
import type { FundSelection } from '../../types/giving';
import { funds, givingPageContent } from '../../data/givingData';

interface FundSelectorProps {
  selections: FundSelection[];
  onChange: (selections: FundSelection[]) => void;
  maxFunds?: number;
}

export const FundSelector = memo(
  ({ selections, onChange, maxFunds = 5 }: FundSelectorProps) => {
    const handleFundChange = (index: number, fundId: string) => {
      const updated = [...selections];
      updated[index] = { ...updated[index], fundId };
      onChange(updated);
    };

    const handleAmountChange = (index: number, amount: string) => {
      const numericAmount = parseFloat(amount) || 0;
      const updated = [...selections];
      updated[index] = { ...updated[index], amount: numericAmount };
      onChange(updated);
    };

    const handleAddFund = () => {
      if (selections.length < maxFunds) {
        // Find the first fund not already selected
        const selectedFundIds = selections.map((s) => s.fundId);
        const availableFund = funds.find(
          (f) => !selectedFundIds.includes(f.id),
        );
        if (availableFund) {
          onChange([...selections, { fundId: availableFund.id, amount: 0 }]);
        }
      }
    };

    const handleRemoveFund = (index: number) => {
      if (selections.length > 1) {
        const updated = selections.filter((_, i) => i !== index);
        onChange(updated);
      }
    };

    // Get available funds for a specific selector (exclude already selected, except current)
    const getAvailableFunds = (currentFundId: string) => {
      const selectedFundIds = selections
        .map((s) => s.fundId)
        .filter((id) => id !== currentFundId);
      return funds.filter(
        (f) => !selectedFundIds.includes(f.id) || f.id === currentFundId,
      );
    };

    const canAddMore =
      selections.length < maxFunds && selections.length < funds.length;

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
          {givingPageContent.form.fundLabel}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {selections.map((selection, index) => (
            <Fade key={index} in timeout={300}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                {/* Fund Dropdown */}
                <TextField
                  select
                  value={selection.fundId}
                  onChange={(e) => handleFundChange(index, e.target.value)}
                  label="Select Fund"
                  data-testid={`fund-select-${index}`}
                  sx={{
                    flex: { xs: '1', sm: '1.5' },
                    width: { xs: '100%', sm: 'auto' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.light',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                >
                  {getAvailableFunds(selection.fundId).map((fund) => (
                    <MenuItem key={fund.id} value={fund.id}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {fund.name}
                        </Typography>
                        {fund.description && (
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                          >
                            {fund.description}
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>

                {/* Amount Input */}
                <TextField
                  type="number"
                  value={selection.amount || ''}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  placeholder={givingPageContent.form.amountPlaceholder}
                  data-testid={`fund-amount-${index}`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography
                          sx={{ color: 'text.secondary', fontWeight: 500 }}
                        >
                          $
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    min: 0,
                    step: 1,
                  }}
                  sx={{
                    flex: 1,
                    width: { xs: '100%', sm: 'auto' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.light',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />

                {/* Remove Button */}
                {selections.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveFund(index)}
                    aria-label="Remove fund"
                    data-testid={`remove-fund-${index}`}
                    sx={{
                      alignSelf: { xs: 'flex-end', sm: 'center' },
                      mt: { xs: -1, sm: 0 },
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                        backgroundColor: 'rgba(211, 47, 47, 0.08)',
                      },
                    }}
                  >
                    <Close />
                  </IconButton>
                )}
              </Box>
            </Fade>
          ))}

          {/* Add Fund Button */}
          {canAddMore && (
            <Button
              variant="text"
              startIcon={<Add />}
              onClick={handleAddFund}
              data-testid="add-fund-button"
              sx={{
                alignSelf: 'flex-start',
                mt: 1,
                color: 'primary.main',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(90, 12, 119, 0.08)',
                },
              }}
            >
              {givingPageContent.form.addFundButton}
            </Button>
          )}
        </Box>
      </Box>
    );
  },
);

FundSelector.displayName = 'FundSelector';
