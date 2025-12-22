import { useState, memo, type MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import {
  NavigationMenuBuilder,
  NavigationItem,
} from '../../models/NavigationItem';

/**
 * Main navigation component with glassmorphism effects and dropdown menus
 * Features:
 * - Responsive design (desktop/mobile)
 * - Smooth scroll-based resize transitions
 * - Purple to glassmorphism effect on scroll
 * - Interactive dropdown menus
 * - OOP-based navigation data model
 * - Accessibility compliant
 */
export const Navigation = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEls, setAnchorEls] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [mobileExpandedItems, setMobileExpandedItems] = useState<Set<string>>(
    new Set()
  );
  const isScrolled = useScrollPosition(50);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Get navigation items from OOP model
  const navItems = NavigationMenuBuilder.createDefault();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleMobileNavClick = () => {
    setMobileOpen(false);
    setMobileExpandedItems(new Set());
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, itemPath: string) => {
    setAnchorEls((prev) => ({ ...prev, [itemPath]: event.currentTarget }));
  };

  const handleMenuClose = (itemPath: string) => {
    setAnchorEls((prev) => ({ ...prev, [itemPath]: null }));
  };

  const handleMobileExpand = (itemPath: string) => {
    setMobileExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
      } else {
        newSet.add(itemPath);
      }
      return newSet;
    });
  };

  const isActiveRoute = (path: string): boolean => {
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    );
  };

  const isMenuOpen = (itemPath: string): boolean => {
    return Boolean(anchorEls[itemPath]);
  };

  const isMobileExpanded = (itemPath: string): boolean => {
    return mobileExpandedItems.has(itemPath);
  };

  // Render desktop navigation item with dropdown
  const renderDesktopNavItem = (item: NavigationItem) => {
    const hasDropdown = item.hasChildren();
    const menuOpen = isMenuOpen(item.getPath());

    return (
      <Box key={item.getPath()} sx={{ position: 'relative' }}>
        <Button
          component={hasDropdown ? 'button' : Link}
          to={hasDropdown ? undefined : item.getPath()}
          onClick={
            hasDropdown ? (e) => handleMenuOpen(e, item.getPath()) : undefined
          }
          data-testid={item.getTestId()}
          aria-label={item.getAriaLabel()}
          aria-haspopup={hasDropdown ? 'true' : undefined}
          aria-expanded={hasDropdown ? menuOpen : undefined}
          endIcon={
            hasDropdown ? (
              <ArrowDownIcon
                sx={{
                  transition: 'transform 0.3s ease',
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            ) : null
          }
          sx={{
            color: isActiveRoute(item.getPath())
              ? 'primary.light'
              : 'rgba(255, 255, 255, 0.95)',
            fontWeight: isActiveRoute(item.getPath()) ? 600 : 500,
            position: 'relative',
            px: 2,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: isActiveRoute(item.getPath()) ? '80%' : '0%',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transition: 'width 0.3s ease',
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&::after': {
                width: '80%',
              },
            },
            transition: 'all 0.2s ease',
          }}
        >
          {item.getLabel()}
        </Button>

        {hasDropdown && (
          <Menu
            anchorEl={anchorEls[item.getPath()]}
            open={menuOpen}
            onClose={() => handleMenuClose(item.getPath())}
            data-testid={`${item.getTestId()}-menu`}
            MenuListProps={{
              'aria-labelledby': item.getTestId(),
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 200,
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(90, 12, 119, 0.15)',
                  border: '1px solid rgba(90, 12, 119, 0.1)',
                },
              },
            }}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          >
            {item.getChildren().map((child) => (
              <MenuItem
                key={child.getPath()}
                component={Link}
                to={child.getPath()}
                onClick={() => handleMenuClose(item.getPath())}
                data-testid={child.getTestId()}
                sx={{
                  py: 1.5,
                  px: 2.5,
                  color: 'text.primary',
                  fontWeight: isActiveRoute(child.getPath()) ? 600 : 400,
                  backgroundColor: isActiveRoute(child.getPath())
                    ? 'rgba(90, 12, 119, 0.08)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(90, 12, 119, 0.12)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {child.getLabel()}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Box>
    );
  };

  // Render mobile navigation item with collapsible children
  const renderMobileNavItem = (item: NavigationItem) => {
    const hasDropdown = item.hasChildren();
    const isExpanded = isMobileExpanded(item.getPath());

    return (
      <Box key={item.getPath()}>
        <ListItem disablePadding>
          <ListItemButton
            component={hasDropdown ? 'button' : Link}
            to={hasDropdown ? undefined : item.getPath()}
            onClick={
              hasDropdown
                ? () => handleMobileExpand(item.getPath())
                : handleMobileNavClick
            }
            data-testid={`${item.getTestId()}-mobile`}
            aria-label={item.getAriaLabel()}
            selected={isActiveRoute(item.getPath())}
            sx={{
              py: 2,
              '&.Mui-selected': {
                backgroundColor: 'rgba(90, 12, 119, 0.08)',
                borderLeft: '4px solid',
                borderColor: 'primary.main',
              },
            }}
          >
            <ListItemText
              primary={item.getLabel()}
              slotProps={{
                primary: {
                  fontWeight: isActiveRoute(item.getPath()) ? 600 : 500,
                  color: isActiveRoute(item.getPath())
                    ? 'primary.main'
                    : 'text.primary',
                },
              }}
            />
            {hasDropdown &&
              (isExpanded ? (
                <ArrowUpIcon sx={{ color: 'primary.main' }} />
              ) : (
                <ArrowDownIcon sx={{ color: 'text.secondary' }} />
              ))}
          </ListItemButton>
        </ListItem>

        {hasDropdown && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.getChildren().map((child) => (
                <ListItem key={child.getPath()} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={child.getPath()}
                    onClick={handleMobileNavClick}
                    data-testid={child.getTestId()}
                    selected={isActiveRoute(child.getPath())}
                    sx={{
                      pl: 4,
                      py: 1.5,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(90, 12, 119, 0.12)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={child.getLabel()}
                      slotProps={{
                        primary: {
                          fontSize: '0.9rem',
                          fontWeight: isActiveRoute(child.getPath())
                            ? 600
                            : 400,
                          color: isActiveRoute(child.getPath())
                            ? 'primary.main'
                            : 'text.secondary',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  // Desktop navigation
  const desktopNav = (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: 0.5,
        alignItems: 'center',
      }}
    >
      {navItems.map(renderDesktopNavItem)}
    </Box>
  );

  // Mobile drawer
  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      data-testid="mobile-nav-drawer"
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: 'rgba(253, 248, 243, 0.98)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          onClick={handleDrawerToggle}
          data-testid="mobile-nav-close"
          aria-label="Close navigation menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>{navItems.map(renderMobileNavItem)}</List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        data-testid="main-navigation"
        sx={{
          backgroundColor: isScrolled
            ? 'rgba(255, 255, 255, 0.85)'
            : 'rgba(90, 12, 119, 0.95)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
          borderBottom: isScrolled
            ? '1px solid rgba(90, 12, 119, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isScrolled
            ? '0 4px 30px rgba(0, 0, 0, 0.08)'
            : '0 4px 20px rgba(90, 12, 119, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: isScrolled ? { xs: 56, md: 64 } : { xs: 64, md: 80 },
              transition: 'min-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              data-testid="nav-logo"
              aria-label="Unity Community Church - Home"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                color: isScrolled
                  ? 'primary.main'
                  : 'rgba(255, 255, 255, 0.98)',
                textDecoration: 'none',
                fontSize: isScrolled
                  ? { xs: '1rem', md: '1.15rem' }
                  : { xs: '1.1rem', md: '1.35rem' },
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '-0.02em',
              }}
            >
              Unity Community Church
            </Typography>

            {/* Desktop Navigation */}
            {desktopNav}

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="Open navigation menu"
              edge="end"
              onClick={handleDrawerToggle}
              data-testid="mobile-nav-toggle"
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: isScrolled
                  ? 'text.primary'
                  : 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && mobileDrawer}

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <Toolbar
        sx={{
          minHeight: isScrolled ? { xs: 56, md: 64 } : { xs: 64, md: 80 },
          transition: 'min-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </>
  );
});

Navigation.displayName = 'Navigation';
