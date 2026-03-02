import { Box } from '@mui/material';
import { memo } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { VideoSection } from '../components/home/VideoSection';
import { AboutSection } from '../components/home/AboutSection';
import { CarouselSection } from '../components/home/CarouselSection';
import { BlogSection } from '../components/home/BlogSection';
import { AnnouncementsSection } from '../components/home/AnnouncementsSection';
import { CommunitySection } from '../components/home/CommunitySection';
import { ContactSection } from '../components/home/ContactSection';
import { MapSection } from '../components/home/MapSection';
import {
  aboutCards,
  carouselSlides,
  blogPosts,
  communityItems,
  contactInfo,
} from '../data/homeData';
import { useSanityData } from '../hooks/useSanityData';
import { HOME_PAGE_QUERY } from '../lib/sanityQueries';

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
 * 1. Hero - Full viewport with tagline
 * 2. Video - YouTube embed
 * 3. About - 4-column grid of cards
 * 4. Carousel - Unity Community Church showcase
 * 5. Announcements/Blog - Sanity announcements (falls back to hardcoded blog posts)
 * 6. Community - 2-column impact grid
 * 7. Contact - Contact form and info
 * 8. Map - Google Maps integration
 *
 * All sections are mobile-friendly and follow the technical architecture
 */
interface HomePageData {
  carouselItems: typeof carouselSlides;
  praiseTeamVideoUrl?: string;
}

export const HomePage = memo(() => {
  const { data: homeData } = useSanityData<HomePageData>(
    'homePage',
    HOME_PAGE_QUERY,
  );

  const slides =
    homeData?.carouselItems && homeData.carouselItems.length > 0
      ? homeData.carouselItems
      : carouselSlides;
  const videoId = getYoutubeId(homeData?.praiseTeamVideoUrl) || '5_iob6lOUOI';
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

      {/* Carousel Section */}
      <CarouselSection slides={slides} autoPlayInterval={5000} />

      {/* Announcements — falls back to hardcoded blog posts on error/empty */}
      <AnnouncementsSection fallback={<BlogSection posts={blogPosts} />} />

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
