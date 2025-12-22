import { Box } from '@mui/material';
import { memo } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { VideoSection } from '../components/home/VideoSection';
import { AboutSection } from '../components/home/AboutSection';
import { CarouselSection } from '../components/home/CarouselSection';
import { BlogSection } from '../components/home/BlogSection';
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

/**
 * Home Page Component
 *
 * Sections:
 * 1. Hero - Full viewport with tagline
 * 2. Video - YouTube embed
 * 3. About - 4-column grid of cards
 * 4. Carousel - Unity Community Church showcase
 * 5. Blog - Latest posts
 * 6. Community - 2-column impact grid
 * 7. Contact - Contact form and info
 * 8. Map - Google Maps integration
 *
 * All sections are mobile-friendly and follow the technical architecture
 */
export const HomePage = memo(() => {
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
        youtubeId="5_iob6lOUOI"
        title="Watch Our Latest Message"
        description="Experience powerful worship and life-changing messages from our recent services."
      />

      {/* About Section */}
      <AboutSection cards={aboutCards} />

      {/* Carousel Section */}
      <CarouselSection slides={carouselSlides} autoPlayInterval={5000} />

      {/* Blog Section */}
      <BlogSection posts={blogPosts} />

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
