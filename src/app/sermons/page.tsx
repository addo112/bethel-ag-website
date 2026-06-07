"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  type: string;
  url: string;
}

export default function Sermons() {
  const [filter, setFilter] = useState("All");
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSermons() {
      try {
        const q = query(collection(db, "sermons"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedSermons = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Sermon[];
        setSermons(fetchedSermons);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSermons();
  }, []);

  const filteredSermons = filter === "All" 
    ? sermons 
    : sermons.filter(s => s.type === filter.toLowerCase());

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container animate-fade-in-up">
        
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Watch & Listen</h1>
          <p className="hero-subtitle">Catch up on recent teachings and messages</p>
        </header>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {["All", "Video", "Audio", "PDF"].map((category) => (
            <button 
              key={category}
              onClick={() => setFilter(category)}
              className={`btn ${filter === category ? 'btn-primary' : ''}`}
              style={{
                background: filter === category ? 'var(--primary-blue)' : 'rgba(255, 255, 255, 0.5)',
                color: filter === category ? 'white' : 'var(--text-dark)',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading sermons...</div>
        ) : sermons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No teachings have been uploaded yet. Check back soon!</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {filteredSermons.map((sermon) => (
              <div key={sermon.id} className="glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {sermon.type === "video" ? (
                  <iframe 
                    width="100%" 
                    height="200" 
                    src={sermon.url} 
                    title={sermon.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : sermon.type === "audio" ? (
                  <div style={{ padding: '2rem 1rem', background: 'var(--primary-blue)', color: 'white', textAlign: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>🎧</span>
                  </div>
                ) : (
                  <div style={{ padding: '2rem 1rem', background: '#dc2626', color: 'white', textAlign: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>📄</span>
                  </div>
                )}
                
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    {sermon.type} • {new Date(sermon.date).toLocaleDateString()}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{sermon.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{sermon.speaker}</p>
                  
                  {sermon.type !== "video" && (
                    <a href={sermon.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 'auto', textAlign: 'center' }}>
                      {sermon.type === "audio" ? "Listen Now" : "Download PDF"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
