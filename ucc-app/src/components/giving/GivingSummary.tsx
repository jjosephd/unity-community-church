/**
 * GivingSummary Component
 * Preview/confirmation of giving details before proceeding to payment
 */

import { Box, Typography, Paper, Divider, Button, Fade } from '@mui/material';
import { Edit, ArrowForward } from '@mui/icons-material';
import { memo, useMemo } from 'react';
import { format } from 'date-fns';
import type { GivingFormData } from '../../types/giving';
import {
  funds,
  frequencyOptions,
  givingPageContent,
} from '../../data/givingData';

interface GivingSummaryProps {
  formData: GivingFormData;
  onEdit: () => void;
  onConfirm: () => void;
  visible: boolean;
}

export const GivingSummary = memo(
  ({ formData, onEdit, onConfirm, visible }: GivingSummaryProps) => {
    // Calculate total amount
    const totalAmount = useMemo(() => {
      return formData.funds.reduce((sum, fund) => sum + fund.amount, 0);
    }, [formData.funds]);

    // Get fund name by ID
    const getFundName = (fundId: string) => {
      return funds.find((f) => f.id === fundId)?.name || fundId;
    };

    // Get frequency label
    const getFrequencyLabel = (frequency: string | undefined) => {
      if (!frequency) return '';
      return (
        frequencyOptions.find((f) => f.value === frequency)?.label || frequency
      );
    };

    if (!visible) return null;

    return (
      <Fade in={visible} timeout={400}>
        <Paper
          elevation={0}
          data-testid="giving-summary"
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: '2px solid',
            borderColor: 'primary.light',
            backgroundColor: 'rgba(90, 12, 119, 0.02)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {givingPageContent.summary.title}
            </Typography>
            <Button
              variant="text"
              startIcon={<Edit />}
              onClick={onEdit}
              data-testid="edit-giving-button"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {givingPageContent.summary.editButton}
            </Button>
          </Box>

          {/* Gift Type */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {givingPageContent.summary.giftTypeLabel}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {formData.giftType === 'one-time'
                ? 'One-time gift'
                : 'Recurring gift'}
            </Typography>
          </Box>

          {/* Frequency (if recurring) */}
          {formData.giftType === 'recurring' && formData.frequency && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {givingPageContent.summary.frequencyLabel}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {getFrequencyLabel(formData.frequency)}
              </Typography>
            </Box>
          )}

          {/* Start Date */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary">
              {givingPageContent.summary.startDateLabel}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {format(formData.startDate, 'MMMM d, yyyy')}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Fund Breakdown */}
          <Box sx={{ mb: 3 }}>
            {formData.funds.map((fund, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                }}
              >
                <Typography variant="body1">
                  {getFundName(fund.fundId)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${fund.amount.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Total */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {givingPageContent.summary.totalLabel}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              ${totalAmount.toFixed(2)}
            </Typography>
          </Box>

          {/* Confirm Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            endIcon={<ArrowForward />}
            onClick={onConfirm}
            data-testid="confirm-giving-button"
            sx={{
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              background:
                'linear-gradient(135deg, rgb(90, 12, 119) 0%, rgb(120, 40, 150) 100%)',
              boxShadow: '0 4px 20px rgba(90, 12, 119, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(90, 12, 119, 0.4)',
              },
            }}
          >
            {givingPageContent.summary.confirmButton}
          </Button>

          {/* Security Note */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 2,
            }}
          >
            🔒 You will be securely redirected to complete your gift
          </Typography>
        </Paper>
      </Fade>
    );
  },
);

GivingSummary.displayName = 'GivingSummary';
