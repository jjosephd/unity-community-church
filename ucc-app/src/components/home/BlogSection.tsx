import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Grid,
} from '@mui/material';
import { ArrowForward, CalendarToday, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import type { BlogPost } from '../../types/home';

interface BlogSectionProps {
  posts: BlogPost[];
}

/**
 * Blog Section Component
 * Edge-to-edge / bleed layout:
 * - Full-bleed imagery
 * - Category chips on images
 * - Whitespace-defined content boundaries
 */
export const BlogSection = memo(({ posts }: BlogSectionProps) => {
  return (
    <Box
      component="section"
      data-testid="blog-section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 6,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: 'primary.main',
                mb: 1,
                letterSpacing: '-0.01em',
              }}
            >
              Latest from Our Blog
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem' }}
            >
              Insights, stories, and inspiration from our community
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/blog"
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            View All Posts
          </Button>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={post.id}>
              <Box
                component={Link}
                to={`/blog/${post.slug}`}
                data-testid={`blog-post-${index}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  color: 'inherit',
                }}
              >
                {/* Full-bleed Post Image */}
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '60%',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={post.image}
                    alt={post.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition:
                        'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                    }}
                  />
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>

                {/* Post Content */}
                <Box
                  sx={{
                    flexGrow: 1,
                    pt: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 1.5,
                      fontSize: '1.25rem',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.7,
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  {/* Post Meta */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      pt: 2,
                      mt: 'auto',
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Person fontSize="small" />
                      <Typography variant="caption">{post.author}</Typography>
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <CalendarToday fontSize="small" />
                      <Typography variant="caption">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

BlogSection.displayName = 'BlogSection';
