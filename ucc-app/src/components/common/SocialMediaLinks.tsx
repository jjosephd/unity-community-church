import { Box, IconButton } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

interface SocialMediaLinksProps {
  /** Optional custom color for the icons */
  color?: string;
  /** Optional spacing between icons (MUI spacing value, e.g., 1 for 8px) */
  gap?: number;
  /** Optional size for the icons */
  size?: 'small' | 'medium' | 'large';
  /** Optional flag to show only specific icons, or all if undefined */
  show?: {
    facebook?: boolean;
    instagram?: boolean;
    youtube?: boolean;
  };
}
const DEFAULT_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=100064909292003',
};
/**
 * A reusable, standalone social media links component containing
 * Facebook, Instagram, and YouTube circular icon buttons.
 */
export const SocialMediaLinks = ({
  color,
  gap = 1,
  size = 'small',
  show = { facebook: true, instagram: true, youtube: true },
}: SocialMediaLinksProps) => {
  const baseIconStyle = {
    color: color || 'inherit',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    '&:hover': {
      backgroundColor: 'rgba(205, 182, 214, 0.15)', // #cdb6d6 with 15% opacity
      color: '#cdb6d6',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <Box sx={{ display: 'flex', gap, alignItems: 'center' }}>
      {show.facebook !== false && (
        <IconButton
          aria-label="Visit our Facebook page"
          href={DEFAULT_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          size={size}
          sx={baseIconStyle}
        >
          <FacebookIcon fontSize="inherit" />
        </IconButton>
      )}

      {show.instagram !== false && (
        <IconButton
          aria-label="Visit our Instagram page"
          href="https://instagram.com" // Replace with actual URL
          target="_blank"
          rel="noopener noreferrer"
          size={size}
          sx={baseIconStyle}
        >
          <InstagramIcon fontSize="inherit" />
        </IconButton>
      )}

      {show.youtube !== false && (
        <IconButton
          aria-label="Visit our YouTube channel"
          href="https://youtube.com" // Replace with actual URL
          target="_blank"
          rel="noopener noreferrer"
          size={size}
          sx={baseIconStyle}
        >
          <YouTubeIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
};
