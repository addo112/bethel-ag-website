"use client";

import { useState } from "react";

export default function Sermons() {
  const [filter, setFilter] = useState("all");

  const sermons = [
    {
      id: 1,
      title: "The Power of the Holy Spirit",
      date: "May 28, 2026",
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      speaker: "Rev. John Doe",
    },
    {
      id: 2,
      title: "Walking in Faith",
      date: "May 21, 2026",
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      speaker: "Pastor Jane Doe",
    },
    {
      id: 3,
      title: "Understanding Grace - PDF Notes",
      date: "May 14, 2026",
      type: "pdf",
      url: "#",
      speaker: "Rev. John Doe",
    }
  ];

  const filteredSermons = filter === "all" ? sermons : sermons.filter(s => s.type === filter);

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1>Sermons & Teachings</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Listen to recent messages from Bethel Assembly of God, Ayigya.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button onClick={() => setFilter("all")} className={`btn ${filter === "all" ? "btn-primary" : "glass"}`} style={{ color: filter === "all" ? 'white' : 'var(--text-dark)' }}>All Messages</button>
          <button onClick={() => setFilter("video")} className={`btn ${filter === "video" ? "btn-primary" : "glass"}`} style={{ color: filter === "video" ? 'white' : 'var(--text-dark)' }}>Videos</button>
          <button onClick={() => setFilter("audio")} className={`btn ${filter === "audio" ? "btn-primary" : "glass"}`} style={{ color: filter === "audio" ? 'white' : 'var(--text-dark)' }}>Audio</button>
          <button onClick={() => setFilter("pdf")} className={`btn ${filter === "pdf" ? "btn-primary" : "glass"}`} style={{ color: filter === "pdf" ? 'white' : 'var(--text-dark)' }}>PDF Notes</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredSermons.map(sermon => (
            <div key={sermon.id} className="glass animate-fade-in-up" style={{ overflow: 'hidden' }}>
              {sermon.type === 'video' ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe 
                    src={sermon.url} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              ) : (
                <div style={{ height: '200px', background: 'rgba(10,35,66,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {sermon.type === 'pdf' ? '📄' : '🎧'}
                </div>
              )}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{sermon.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span>{sermon.speaker}</span>
                  <span>{sermon.date}</span>
                </div>
                {sermon.type === 'pdf' && (
                  <a href={sermon.url} className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: '1rem', textAlign: 'center' }}>Download PDF</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
