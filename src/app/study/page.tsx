"use client";

import { useState } from "react";

export default function Study() {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<{role: 'user'|'ai', content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  // Mocked daily study from Sunday School Manual
  const dailyStudy = {
    title: "Lesson 1: The Character of God",
    date: new Date().toLocaleDateString(),
    memoryVerse: "God is spirit, and those who worship him must worship in spirit and truth. - John 4:24",
    content: "Today's lesson focuses on understanding the divine nature of God as revealed in the scriptures. He is holy, loving, and just. As believers in Jesus Christ, we are called to emulate His character in our daily walk."
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setChat(prev => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    try {
      const response = await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      
      setChat(prev => [...prev, { role: 'ai', content: data.answer }]);
    } catch (error) {
      setChat(prev => [...prev, { role: 'ai', content: "Sorry, I am currently unable to process your request. Please try again later." }]);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1>Daily Bible Study & AI Assistant</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Dig deeper into the Word of God to know Jesus Christ more.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Daily Study Section */}
          <div className="glass animate-fade-in-up" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Daily Sunday School</h2>
              <span style={{ color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.9rem' }}>{dailyStudy.date}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{dailyStudy.title}</h3>
            <div style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderLeft: '4px solid var(--accent-gold)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {dailyStudy.memoryVerse}
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              {dailyStudy.content}
            </p>
          </div>

          {/* AI Assistant Section */}
          <div id="ai" className="glass animate-fade-in-up" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              Bible Study Assistant 🤖
            </h2>
            
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {chat.length === 0 ? (
                <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <p>Ask me anything about the Bible, Jesus Christ, or Christian living.</p>
                </div>
              ) : (
                chat.map((msg, index) => (
                  <div key={index} style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? 'var(--primary-blue)' : 'rgba(0,0,0,0.05)',
                    color: msg.role === 'user' ? 'white' : 'inherit',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    maxWidth: '80%'
                  }}>
                    {msg.content}
                  </div>
                ))
              )}
              {loading && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  Thinking...
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="E.g., What does the Bible say about patience?" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>Ask</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
