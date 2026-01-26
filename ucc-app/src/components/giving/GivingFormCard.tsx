/**
 * GivingFormCard Component
 * Main form container with glassmorphism styling
 */

import { Box, Container, Paper, Button, Fade } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { memo, useState, useCallback, useMemo } from 'react';
import type {
  GiftType,
  Frequency,
  FundSelection,
  GivingFormData,
} from '../../types/giving';
import {
  defaultGivingFormValues,
  givingPageContent,
} from '../../data/givingData';
import { GiftTypeSelector } from './GiftTypeSelector';
import { FrequencySelector } from './FrequencySelector';
import { StartDatePicker } from './StartDatePicker';
import { FundSelector } from './FundSelector';
import { GivingSummary } from './GivingSummary';

interface GivingFormCardProps {
  onSubmit?: (data: GivingFormData) => void;
}

export const GivingFormCard = memo(({ onSubmit }: GivingFormCardProps) => {
  // Form state
  const [giftType, setGiftType] = useState<GiftType>(
    defaultGivingFormValues.giftType,
  );
  const [frequency, setFrequency] = useState<Frequency | undefined>(
    defaultGivingFormValues.frequency,
  );
  const [startDate, setStartDate] = useState<Date>(
    defaultGivingFormValues.startDate,
  );
  const [funds, setFunds] = useState<FundSelection[]>(
    defaultGivingFormValues.funds,
  );

  // UI state
  const [showSummary, setShowSummary] = useState(false);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return funds.reduce((sum, fund) => sum + fund.amount, 0);
  }, [funds]);

  // Form data for summary
  const formData: GivingFormData = useMemo(
    () => ({
      giftType,
      frequency: giftType === 'recurring' ? frequency : undefined,
      startDate,
      funds,
      totalAmount,
    }),
    [giftType, frequency, startDate, funds, totalAmount],
  );

  // Validation
  const isFormValid = useMemo(() => {
    // Check if at least one fund has an amount
    const hasValidFund = funds.some((f) => f.amount > 0);
    // If recurring, check frequency is selected
    const hasValidFrequency =
      giftType === 'one-time' || frequency !== undefined;
    return hasValidFund && hasValidFrequency;
  }, [funds, giftType, frequency]);

  // Handlers
  const handleGiftTypeChange = useCallback((value: GiftType) => {
    setGiftType(value);
    // Reset frequency when switching to one-time
    if (value === 'one-time') {
      setFrequency(undefined);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (isFormValid) {
      setShowSummary(true);
    }
  }, [isFormValid]);

  const handleBack = useCallback(() => {
    setShowSummary(false);
  }, []);

  const handleConfirm = useCallback(() => {
    // For now, just log the data - will be replaced with actual payment redirect
    console.log('Gift confirmed:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    // TODO: Implement secure backend redirect to payment provider
    alert(
      'Thank you! In production, you would be securely redirected to complete your gift.',
    );
  }, [formData, onSubmit]);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        elevation={0}
        data-testid="giving-form-card"
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 40px rgba(90, 12, 119, 0.1)',
        }}
      >
        {/* Form Content */}
        <Fade in={!showSummary} timeout={300} unmountOnExit>
          <Box
            sx={{
              display: showSummary ? 'none' : 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {/* Gift Type Selector */}
            <GiftTypeSelector
              value={giftType}
              onChange={handleGiftTypeChange}
            />

            {/* Frequency Selector (shown only for recurring) */}
            <FrequencySelector
              value={frequency}
              onChange={setFrequency}
              visible={giftType === 'recurring'}
            />

            {/* Date Picker */}
            <StartDatePicker value={startDate} onChange={setStartDate} />

            {/* Fund Selector */}
            <FundSelector selections={funds} onChange={setFunds} />

            {/* Next Button */}
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleNext}
              disabled={!isFormValid}
              data-testid="next-button"
              sx={{
                mt: 2,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                background: isFormValid
                  ? 'linear-gradient(135deg, rgb(90, 12, 119) 0%, rgb(120, 40, 150) 100%)'
                  : undefined,
                boxShadow: isFormValid
                  ? '0 4px 20px rgba(90, 12, 119, 0.3)'
                  : undefined,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover:not(:disabled)': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(90, 12, 119, 0.4)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              {givingPageContent.form.nextButton}
            </Button>
          </Box>
        </Fade>

        {/* Summary View */}
        {showSummary && (
          <Box>
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={handleBack}
              data-testid="back-button"
              sx={{
                mb: 3,
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {givingPageContent.form.backButton}
            </Button>

            <GivingSummary
              formData={formData}
              onEdit={handleBack}
              onConfirm={handleConfirm}
              visible={showSummary}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
});

GivingFormCard.displayName = 'GivingFormCard';
