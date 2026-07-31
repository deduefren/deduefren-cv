import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Language } from '../i18n';
import { blogPosts, filterBlogPosts, readBlogMarkdown } from '../content/blog/blog-posts';

type Translate = (key: string) => string;

function BlogPostCard({ post, language }: { post: (typeof blogPosts)[number]; language: Language }) {
  const [collapsed, setCollapsed] = useState(true);
  const content = useMemo(() => readBlogMarkdown(post.slug), [post.slug]);

  const formattedDate = new Intl.DateTimeFormat(language, {
    dateStyle: 'short',
  }).format(new Date(post.date));

  return (
    <article
      className={`post-container collapsible ${collapsed ? 'collapsed' : 'expanded'}`}
      role="button"
      tabIndex={0}
      onClick={() => setCollapsed((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setCollapsed((value) => !value);
        }
      }}
    >
      <div className="post-card-header">
        <div>
          <span className="post-badge">Article</span>
          <h2 className="post-title">{post.title}</h2>
        </div>
        <span className="post-date">{formattedDate}</span>
      </div>
      <p className="post-content">{collapsed ? post.hint : content || post.hint}</p>
      <div className="post-footer">
        <span className="post-toggle">{collapsed ? 'Read more →' : 'Show less'}</span>
      </div>
      {!collapsed && (
        <div className="post-markdown">
          <ReactMarkdown>{content || post.hint}</ReactMarkdown>
        </div>
      )}
    </article>
  );
}

export default function BlogSection({ language, t }: { language: Language; t: Translate }) {
  const [query, setQuery] = useState('');

  const displayedPosts = useMemo(() => {
    return filterBlogPosts(blogPosts, query);
  }, [query]);

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="section-heading text-uppercase" style={{ overflowWrap: 'break-word' }}>
          {t('blog.title')}
        </h2>
        <h3 className="section-subheading text-muted">{t('blog.subtitle')}</h3>
      </div>
      <div className="search-bar-container">
        <div className="search-input-shell">
          <input
            type="text"
            className="form-control search-input"
            placeholder={t('blog.search')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="blog-post-list">
        {displayedPosts.length === 0 ? (
          <div className="blog-empty-state">No articles match your search yet.</div>
        ) : (
          displayedPosts.map((post) => <BlogPostCard key={post.title} post={post} language={language} />)
        )}
      </div>
    </div>
  );
}
