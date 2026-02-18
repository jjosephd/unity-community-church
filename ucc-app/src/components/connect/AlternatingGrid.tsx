import { Box, Typography } from '@mui/material';
import { memo } from 'react';

export interface GridItem {
  title: string;
  description: string;
  image: string;
}

interface AlternatingGridProps {
  items: GridItem[];
}

const IMAGE_HEIGHT = { xs: 200, md: 450 };
const ROW_HEIGHT = { xs: 'auto', md: 300 };

/**
 * Alternating Grid Component
 * True 2x2 grid with edge-to-edge cells, no padding
 * Row 1: Image left, Text right
 * Row 2: Text left, Image right
 * Mobile: Stacks vertically as a column
 */
export const AlternatingGrid = memo(({ items }: AlternatingGridProps) => {
  return (
    <Box component="section" data-testid="alternating-grid" sx={{ mb: 0 }}>
      {items.map((item, index) => {
        const isImageLeft = index % 2 === 0;

        return (
          <Box
            key={item.title}
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: isImageLeft ? 'row' : 'row-reverse',
              },
              minHeight: ROW_HEIGHT,
            }}
          >
            {/* Image Cell */}
            <Box
              sx={{
                flex: { xs: 'none', md: 1 },
                height: IMAGE_HEIGHT,
                width: '100%',
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Text Cell */}
            <Box
              sx={{
                flex: { xs: 'none', md: 1 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 3, md: 0 },
                backgroundColor: 'background.paper',
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                className="font-alfa uppercase"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: 'text.primary',
                  mb: 2,
                  px: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'text.secondary',
                  lineHeight: 1.4,
                  px: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
});

AlternatingGrid.displayName = 'AlternatingGrid';
