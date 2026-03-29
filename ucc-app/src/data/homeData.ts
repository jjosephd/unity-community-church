/**
 * Mock data for Home page
 * In production, this would be fetched from the Django API
 */

import type {
  AboutCard,
  BlogPost,
  CommunityItem,
  ContactInfo,
} from '../types/home';

export const aboutCards: AboutCard[] = [
  {
    id: '1',
    title: 'Worship Together',
    description:
      'Join us every Sunday for uplifting worship, powerful messages, and genuine fellowship.',
    image: '/images/worship.jpg',
    icon: 'church',
  },
  {
    id: '2',
    title: 'Grow in Faith',
    description:
      'Discover your purpose through Bible studies, small groups, and discipleship programs.',
    image: '/images/faith.jpg',
    icon: 'book',
  },
  {
    id: '3',
    title: 'Serve Others',
    description:
      'Make a difference in our community through outreach, missions, and volunteer opportunities.',
    image: '/images/serve.jpg',
    icon: 'hands',
  },
  {
    id: '4',
    title: 'Connect & Belong',
    description:
      "What we're doing in the community through ministries, events, and meaningful relationships.",
    image: '/images/connect.jpg',
    icon: 'people',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Finding Hope in Difficult Times',
    excerpt:
      "Discover how faith can anchor us through life's storms and provide unwavering hope.",
    author: 'Pastor John Smith',
    date: '2024-12-20',
    image: '/images/blog/blog-1.jpg',
    category: 'Faith',
    slug: 'finding-hope-in-difficult-times',
  },
  {
    id: '2',
    title: 'The Power of Community',
    excerpt:
      'Learn why being part of a church community is essential for spiritual growth and support.',
    author: 'Sarah Johnson',
    date: '2024-12-18',
    image: '/images/blog/blog-2.jpg',
    category: 'Community',
    slug: 'power-of-community',
  },
  {
    id: '3',
    title: 'Serving with Purpose',
    excerpt:
      "Explore how serving others transforms our lives and reflects Christ's love to the world.",
    author: 'Michael Davis',
    date: '2024-12-15',
    image: '/images/blog/blog-3.jpg',
    category: 'Service',
    slug: 'serving-with-purpose',
  },
];

export const communityItems: CommunityItem[] = [
  {
    id: '1',
    title: 'Youth Ministry',
    description:
      'Empowering the next generation through engaging programs, mentorship, and faith-building activities for teens and young adults.',
    image: '/images/youth_img.png',
  },
  {
    id: '2',
    title: 'Community Outreach',
    description:
      "Making a tangible difference in Powhatan through food drives, homeless ministry, and local partnerships that demonstrate Christ's love.",
    image: '/images/outreach.png',
  },
];

export const contactInfo: ContactInfo = {
  address:
    'Powhatan Village Building, 3910 Old Buckingham Road, Powhatan, VA 23139',
  phone: '(804) 256-4411',
  email: 'info@ucc4me.org',
  hours: [
    {
      day: 'Sunday',
      time: '11:00 AM',
      details: 'Adoration Service',
    },
    {
      day: 'Wednesday',
      time: '12:00 PM',
      details: '@ The Table',
      extraInfo: {
        label: 'View Warm-line & Address',
        content:
          'Phone: 605-313-6129 | Access: 328384# | Address: 3910 Old Buckingham Rd, Powhatan, VA',
      },
    },
    {
      day: 'Wednesday',
      time: '6:30 PM',
      details: '60 Minute Warm Up',
      link: '#', // Placeholder for the virtual link mentioned
    },
  ],
};

// Powhatan, VA coordinates
export const mapConfig = {
  center: {
    lat: 37.5407,
    lng: -77.9189,
  },
  zoom: 14,
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
};
