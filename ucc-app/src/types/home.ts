/**
 * Type definitions for Home page components
 */

export interface AboutCard {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta?: {
    text: string;
    link: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

export interface CommunityItem {
  id: string;
  title: string;
  description: string;
  image: string;
  stats?: {
    label: string;
    value: string;
  };
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    day: string;
    time: string;
  }[];
}

export interface MapConfig {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  apiKey: string;
}
