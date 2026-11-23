import { describe, expect, it } from 'vitest';
import { blogPosts, filterBlogPosts, readBlogMarkdown, readBlogSummary } from './blog-posts';

describe('blog-posts', () => {
  it('returns all posts when query is empty', () => {
    expect(filterBlogPosts(blogPosts, '   ')).toHaveLength(3);
  });

  it('filters posts by title', () => {
    const filtered = filterBlogPosts(blogPosts, 'impact');

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.slug).toBe('machine-learning-impact');
  });

  it('uses a dedicated summary file when available', () => {
    const summary = readBlogSummary('chat-gpt-toolkit');

    expect(summary).toContain('Practical summary');
    expect(summary).not.toContain('##');
  });

  it('removes the repeated title from full markdown content', () => {
    const content = readBlogMarkdown('chat-gpt-toolkit');

    expect(content).not.toContain('# Chat GPT Toolkit');
    expect(content).toContain('## Practical Features');
  });
});