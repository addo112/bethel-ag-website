export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "How to Build a Habit of Prayer",
      date: "June 1, 2026",
      author: "Pastor Jane Doe",
      excerpt: "Prayer is our direct line of communication with God. In this post, we explore practical ways to maintain a consistent prayer life.",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Understanding the Assemblies of God Core Beliefs",
      date: "May 15, 2026",
      author: "Rev. John Doe",
      excerpt: "A deep dive into the fundamental truths that guide our denomination and how they apply to modern Christian living.",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Community Outreach: Reaching Ayigya with Love",
      date: "April 28, 2026",
      author: "Missions Team",
      excerpt: "Last week, our church family stepped out into the Ayigya community to share the love of Christ. Here is what happened.",
      readTime: "4 min read"
    }
  ];

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1>Church Blog</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>News, devotionals, and updates from Bethel Assembly of God.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.map(post => (
            <div key={post.id} className="glass animate-fade-in-up" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-blue)' }}>{post.title}</h2>
              <p style={{ color: 'var(--text-dark)', marginBottom: '1.5rem', flex: 1 }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>By {post.author}</span>
                <a href={`/blog/${post.id}`} style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Read More &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
