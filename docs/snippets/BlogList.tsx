import { posts } from 'virtual:blog'

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogList() {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.path} className="blog-list__post">
          <a href={post.path} className="blog-list__link">
            <span className="blog-list__date">{formatDate(post.date)}</span>
            <span className="blog-list__title">{post.title}</span>
          </a>
        </div>
      ))}
    </div>
  )
}
