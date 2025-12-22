import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
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
 * Features:
 * - Clean, simplified design
 * - 3-column responsive grid
 * - Category chips
 * - Smooth hover effects
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
              <Card
                component={Link}
                to={`/blog/${post.slug}`}
                data-testid={`blog-post-${index}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: 3,
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition:
                    'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, box-shadow',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 40px rgba(90, 12, 119, 0.12)',
                    borderColor: 'primary.light',
                    '& .blog-image': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                {/* Post Image */}
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '60%',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(90, 12, 119, 0.05)',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={post.image}
                    alt={post.title}
                    className="blog-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: 3,
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
                      borderTop: '1px solid',
                      borderColor: 'divider',
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

BlogSection.displayName = 'BlogSection';
