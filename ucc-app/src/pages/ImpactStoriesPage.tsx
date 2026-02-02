import { memo } from 'react';
import { UnderConstruction } from '../components/common';

/**
 * Impact Stories Page
 * Placeholder page for community impact stories
 */
export const ImpactStoriesPage = memo(() => {
  return (
    <UnderConstruction
      pageTitle="Impact Stories"
      message="Inspiring stories of how your generosity is making a difference in our community are coming soon."
    />
  );
});

ImpactStoriesPage.displayName = 'ImpactStoriesPage';
