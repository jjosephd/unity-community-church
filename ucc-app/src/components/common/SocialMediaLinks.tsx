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

/**
 * A reusable, standalone social media links component containing
 * Facebook, Instagram, and YouTube circular icon buttons.
 */
export const SocialMediaLinks = ({
  color,
  gap = 1,
  size = 'medium',
  show = { facebook: true, instagram: true, youtube: true },
}: SocialMediaLinksProps) => {
  const iconStyle = color
    ? { color, transition: 'color 0.2s ease-in-out' }
    : {};

  return (
    <Box sx={{ display: 'flex', gap, alignItems: 'center' }}>
      {show.facebook !== false && (
        <IconButton
          aria-label="Visit our Facebook page"
          href="https://www.facebook.com/search/top?q=ucc4me" //
          target="_blank"
          rel="noopener noreferrer"
          size={size}
          sx={iconStyle}
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
          sx={iconStyle}
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
          sx={iconStyle}
        >
          <YouTubeIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
};
