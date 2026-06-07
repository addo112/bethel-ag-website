"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container animate-fade-in-up">
        
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Church Blog</h1>
          <p className="hero-subtitle">Articles, testimonies, and updates from the Bethel family</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No articles published yet. Check back soon!</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {posts.map((post) => (
              <article key={post.id} className="glass" style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  {post.date} • By {post.author}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{post.excerpt}</p>
                <a href={`/blog/${post.id}`} className="btn" style={{ background: 'rgba(10,35,66,0.05)', color: 'var(--primary-blue)', alignSelf: 'flex-start', padding: '0.5rem 1rem', textDecoration: 'none' }}>Read Article</a>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
