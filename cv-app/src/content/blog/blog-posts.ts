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
  return markdownModules[`./${slug}.md`] ?? '';
}

export function filterBlogPosts(posts: BlogPost[], query: string): BlogPost[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return posts;
  }

  return posts.filter((post) => post.title.toLowerCase().includes(normalizedQuery));
}