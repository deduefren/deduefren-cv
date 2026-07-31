export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  hint: string;
};

const markdownModules = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function trimMarkdownToSummary(markdown: string): string {
  const normalized = markdown
    .replace(/^#\s+/gm, '')
    .replace(/\n{2,}/g, '\n\n')
    .trim();

  const paragraphs = normalized
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return '';
  }

  const summaryParagraph = paragraphs[0] ?? '';
  const summaryText = summaryParagraph
    .replace(/^[-*]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (summaryText.length <= 220) {
    return summaryParagraph;
  }

  return `${summaryText.slice(0, 217).trimEnd()}...`;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'chat-gpt-toolkit',
    title: 'Chat GPT Toolkit',
    date: '2021-01-01T00:00:00.000Z',
    hint: 'This is the content of post 1 which is based on a new toolkit for Chat GPT. The toolkit includes various features that enhance the capabilities of Chat GPT.',
  },
  {
    slug: 'ai-advancements',
    title: 'AI Advancements',
    date: '2021-02-01T00:00:00.000Z',
    hint: 'This is the content of post 2 which explores a new wave of AI advancements and the impact they are having on software delivery.',
  },
  {
    slug: 'machine-learning-impact',
    title: 'Machine Learning Impact',
    date: '2021-03-01T00:00:00.000Z',
    hint: 'This is the content of post 3 which focuses on how machine learning is affecting modern engineering teams and products.',
  },
];

export function readBlogMarkdown(slug: string): string {
  const markdown = markdownModules[`./${slug}.md`] ?? '';
  return markdown.replace(/^#\s+.+$/m, '').trim();
}

export function readBlogSummary(slug: string): string {
  const explicitSummary = markdownModules[`./${slug}.summary.md`] ?? '';
  if (explicitSummary.trim()) {
    return explicitSummary.trim();
  }

  return trimMarkdownToSummary(readBlogMarkdown(slug));
}

export function filterBlogPosts(posts: BlogPost[], query: string): BlogPost[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return posts;
  }

  return posts.filter((post) => post.title.toLowerCase().includes(normalizedQuery));
}