import { Box } from '@mui/material';
import { memo } from 'react';
import {
  ConnectHero,
  AlternatingGrid,
  LocationFooter,
  type GridItem,
} from '../components/connect';

/**
 * Connect page content data
 * Follows DRY: defined once, rendered dynamically
 */
const connectGridItems: GridItem[] = [
  {
    title: 'Join Our Community',
    description:
      "Whether you're new to faith or have been walking with Christ for years, there's a place for you here. Our doors are open every Sunday, and we'd love to welcome you into our family.",
    image: '/images/connect.jpg',
  },
  {
    title: 'Get Involved',
    description:
      'From worship teams to community outreach, there are countless ways to serve and grow. Discover your gifts and find meaningful ways to make a difference alongside our congregation.',
    image: '/images/ucc4.jpg',
  },
];

const churchInfo = {
  address: '3660 Old Buckingham Rd, Powhatan, VA 23139',
  phone: '(804) 598-4520',
  email: 'info@unitypow.org',
  mapUrl: 'https://maps.google.com/?q=3660+Old+Buckingham+Rd+Powhatan+VA+23139',
};

/**
 * Connect Page
 * Composes hero, alternating grid, and location footer
 */
export const ConnectPage = memo(() => {
  return (
    <Box component="main" data-testid="connect-page">
      <ConnectHero />
      <AlternatingGrid items={connectGridItems} />
      <LocationFooter
        address={churchInfo.address}
        phone={churchInfo.phone}
        email={churchInfo.email}
        mapUrl={churchInfo.mapUrl}
      />
    </Box>
  );
});

ConnectPage.displayName = 'ConnectPage';
