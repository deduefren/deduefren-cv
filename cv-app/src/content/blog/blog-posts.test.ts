import { describe, expect, it } from 'vitest';
import { blogPosts, filterBlogPosts } from './blog-posts';

describe('blog-posts', () => {
  it('returns all posts when query is empty', () => {
    expect(filterBlogPosts(blogPosts, '   ')).toHaveLength(3);
  });

  it('filters posts by title', () => {
    const filtered = filterBlogPosts(blogPosts, 'impact');

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.slug).toBe('machine-learning-impact');
  });
});