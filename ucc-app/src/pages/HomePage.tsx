import { Box } from '@mui/material';
import { memo } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { VideoSection } from '../components/home/VideoSection';
import { AboutSection } from '../components/home/AboutSection';

import { AnnouncementsSection } from '../components/home/AnnouncementsSection';
import { CommunitySection } from '../components/home/CommunitySection';
import { ContactSection } from '../components/home/ContactSection';
import { MapSection } from '../components/home/MapSection';
import {
  aboutCards,
  communityItems,
  contactInfo,
} from '../data/homeData';
import { useSanityData } from '../hooks/useSanityData';
import { HOMEPAGE_SLIDESHOW_QUERY } from '../lib/sanityQueries';

const getYoutubeId = (url?: string) => {
  if (!url) return undefined;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
};

/**
 * Home Page Component
 *
 * Sections:
 * 1. Hero - Full viewport with tagline + Sanity CMS image carousel
 * 2. Video - YouTube embed
 * 3. About - 4-column grid of cards
 * 4. Announcements - Sanity announcements
 * 5. Community - 2-column impact grid
 * 6. Contact - Contact form and info
 * 7. Map - Google Maps integration
 *
 * All sections are mobile-friendly and follow the technical architecture
 */
interface HomepageSlideshowData {
  praiseTeamVideoUrl?: string;
}

export const HomePage = memo(() => {
  const { data: slideshowData } = useSanityData<HomepageSlideshowData>(
    'homepageSlideshow',
    HOMEPAGE_SLIDESHOW_QUERY,
  );

  const videoId = getYoutubeId(slideshowData?.praiseTeamVideoUrl) || '5_iob6lOUOI';
  return (
    <Box
      component="main"
      data-testid="home-page"
      sx={{
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Video Section */}
      <VideoSection
        youtubeId={videoId}
        title="Watch Our Latest Message"
        description="Experience powerful worship and life-changing messages from our recent services."
      />

      {/* About Section */}
      <AboutSection cards={aboutCards} />

      {/* Announcements */}
      <AnnouncementsSection />

      {/* Community Section */}
      <CommunitySection items={communityItems} />

      {/* Contact Section */}
      <ContactSection contactInfo={contactInfo} />

      {/* Map Section */}
      <MapSection />
    </Box>
  );
});

HomePage.displayName = 'HomePage';

