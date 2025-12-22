/**
 * Navigation Item Model - OOP approach for navigation structure
 * Supports hierarchical menu items with dropdowns
 */

export interface INavigationItem {
  getLabel(): string;
  getPath(): string;
  getTestId(): string;
  getAriaLabel(): string;
  hasChildren(): boolean;
  getChildren(): NavigationItem[];
  getIcon(): string | null;
}

export class NavigationItem implements INavigationItem {
  private label: string;
  private path: string;
  private testId: string;
  private ariaLabel: string;
  private children: NavigationItem[];
  private icon: string | null;

  constructor(
    label: string,
    path: string,
    options?: {
      testId?: string;
      ariaLabel?: string;
      children?: NavigationItem[];
      icon?: string;
    }
  ) {
    this.label = label;
    this.path = path;
    this.testId = options?.testId || `nav-${path.replace(/\//g, '-')}`;
    this.ariaLabel = options?.ariaLabel || `Navigate to ${label}`;
    this.children = options?.children || [];
    this.icon = options?.icon || null;
  }

  getLabel(): string {
    return this.label;
  }

  getPath(): string {
    return this.path;
  }

  getTestId(): string {
    return this.testId;
  }

  getAriaLabel(): string {
    return this.ariaLabel;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  getChildren(): NavigationItem[] {
    return this.children;
  }

  getIcon(): string | null {
    return this.icon;
  }

  addChild(child: NavigationItem): void {
    this.children.push(child);
  }
}

/**
 * Navigation Menu Builder - Factory pattern for creating navigation structure
 */
export class NavigationMenuBuilder {
  private items: NavigationItem[] = [];

  addItem(item: NavigationItem): NavigationMenuBuilder {
    this.items.push(item);
    return this;
  }

  build(): NavigationItem[] {
    return this.items;
  }

  static createDefault(): NavigationItem[] {
    return new NavigationMenuBuilder()
      .addItem(
        new NavigationItem('Home', '/', {
          testId: 'nav-home',
          ariaLabel: 'Navigate to Home page',
        })
      )
      .addItem(
        new NavigationItem('About', '/about', {
          testId: 'nav-about',
          ariaLabel: 'Navigate to About page',
          children: [
            new NavigationItem('Our Story', '/about/story', {
              testId: 'nav-about-story',
            }),
            new NavigationItem('Our Mission', '/about/mission', {
              testId: 'nav-about-mission',
            }),
            new NavigationItem('Leadership', '/about/leadership', {
              testId: 'nav-about-leadership',
            }),
            new NavigationItem('Beliefs', '/about/beliefs', {
              testId: 'nav-about-beliefs',
            }),
          ],
        })
      )
      .addItem(
        new NavigationItem('Ministries', '/ministries', {
          testId: 'nav-ministries',
          ariaLabel: 'Navigate to Ministries page',
          children: [
            new NavigationItem('Youth Ministry', '/ministries/youth', {
              testId: 'nav-ministries-youth',
            }),
            new NavigationItem("Children's Ministry", '/ministries/children', {
              testId: 'nav-ministries-children',
            }),
            new NavigationItem('Worship Team', '/ministries/worship', {
              testId: 'nav-ministries-worship',
            }),
            new NavigationItem('Community Outreach', '/ministries/outreach', {
              testId: 'nav-ministries-outreach',
            }),
            new NavigationItem('Small Groups', '/ministries/groups', {
              testId: 'nav-ministries-groups',
            }),
          ],
        })
      )
      .addItem(
        new NavigationItem('Events', '/events', {
          testId: 'nav-events',
          ariaLabel: 'Navigate to Events page',
          children: [
            new NavigationItem('Upcoming Events', '/events/upcoming', {
              testId: 'nav-events-upcoming',
            }),
            new NavigationItem('Weekly Services', '/events/services', {
              testId: 'nav-events-services',
            }),
            new NavigationItem('Special Events', '/events/special', {
              testId: 'nav-events-special',
            }),
            new NavigationItem('Calendar', '/events/calendar', {
              testId: 'nav-events-calendar',
            }),
          ],
        })
      )
      .addItem(
        new NavigationItem('Give', '/give', {
          testId: 'nav-give',
          ariaLabel: 'Navigate to Give page',
          children: [
            new NavigationItem('Online Giving', '/give/online', {
              testId: 'nav-give-online',
            }),
            new NavigationItem('Ways to Give', '/give/ways', {
              testId: 'nav-give-ways',
            }),
            new NavigationItem('Impact Stories', '/give/impact', {
              testId: 'nav-give-impact',
            }),
          ],
        })
      )
      .addItem(
        new NavigationItem('Contact', '/contact', {
          testId: 'nav-contact',
          ariaLabel: 'Navigate to Contact page',
        })
      )
      .build();
  }
}
