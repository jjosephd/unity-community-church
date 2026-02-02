/**
 * Navigation link configuration
 */
export interface NavLink {
  label: string;
  path: string;
  testId: string;
  ariaLabel: string;
}

/**
 * Navigation configuration
 */
export const NAV_LINKS: readonly NavLink[] = [
  {
    label: 'Home',
    path: '/',
    testId: 'nav-link-home',
    ariaLabel: 'Navigate to home page',
  },
  {
    label: 'About',
    path: '/about',
    testId: 'nav-link-about',
    ariaLabel: 'Navigate to about us page',
  },
  {
    label: 'Ministries',
    path: '/ministries',
    testId: 'nav-link-ministries',
    ariaLabel: 'Navigate to ministries page',
  },
  {
    label: 'Media',
    path: '/media',
    testId: 'nav-link-media',
    ariaLabel: 'Navigate to media library',
  },
  {
    label: 'Events',
    path: '/events',
    testId: 'nav-link-events',
    ariaLabel: 'Navigate to events calendar',
  },
  {
    label: 'Giving',
    path: '/giving',
    testId: 'nav-link-giving',
    ariaLabel: 'Navigate to giving page',
  },
  {
    label: 'Connect',
    path: '/connect',
    testId: 'nav-link-connect',
    ariaLabel: 'Navigate to connect page',
  },
] as const;
