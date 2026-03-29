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
    },
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
        }),
      )

      .addItem(
        new NavigationItem('About', '/about', {
          testId: 'nav-about',
          ariaLabel: 'Navigate to About page',
          children: [
            new NavigationItem('Our Story', '/about/story', {
              testId: 'nav-about-story',
            }),
            new NavigationItem('Leadership', '/about/leadership', {
              testId: 'nav-about-leadership',
            }),
          ],
        }),
      )
      .addItem(
        new NavigationItem('Ministries', '/ministries', {
          testId: 'nav-ministries',
          ariaLabel: 'Navigate to Ministries page',
          children: [
            new NavigationItem('Kingdom Komers', '/ministries/kingdom-komers', {
              testId: 'nav-ministries-kingdom-komers',
            }),
            new NavigationItem('Project 133', '/ministries/project-133', {
              testId: 'nav-ministries-project-133',
            }),
            new NavigationItem(
              'Daughters of The King',
              '/ministries/daughters-of-the-king',
              {
                testId: 'nav-ministries-daughters-of-the-king',
              },
            ),
            new NavigationItem('Men That Bend', '/ministries/men-that-bend', {
              testId: 'nav-ministries-men-that-bend',
            }),
            new NavigationItem('Community Outreach', '/ministries/outreach', {
              testId: 'nav-ministries-outreach',
            }),
          ],
        }),
      )
      .addItem(
        new NavigationItem('Events', '/events', {
          testId: 'nav-events',
          ariaLabel: 'Navigate to Events page',
        }),
      )
      .addItem(
        new NavigationItem('Give', '/give', {
          testId: 'nav-give',
          ariaLabel: 'Navigate to Give page',
          children: [
            new NavigationItem('Online Giving', '/give/online', {
              testId: 'nav-give-online',
            }),
            new NavigationItem('Impact Stories', '/give/impact', {
              testId: 'nav-give-impact',
            }),
          ],
        }),
      )
      .addItem(
        new NavigationItem('Media', '/media', {
          testId: 'nav-media',
          ariaLabel: 'Navigate to Media page',
          children: [
            new NavigationItem('Sermons', '/sermons', {
              testId: 'nav-media-sermons',
            }),
            new NavigationItem('Photo Gallery', '/media/gallery', {
              testId: 'nav-media-gallery',
            }),
          ],
        }),
      )
      .addItem(
        new NavigationItem('Connect', '/connect', {
          testId: 'nav-connect',
          ariaLabel: 'Navigate to Connect page',
        }),
      )
      .build();
  }
}
