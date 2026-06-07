"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

interface StudyData {
  title: string;
  date: string;
  memoryVerse: string;
  content: string;
  pdfUrl?: string;
}

export default function Study() {
  const [queryText, setQueryText] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [study, setStudy] = useState<StudyData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchLatestStudy() {
      try {
        const q = query(collection(db, "studies"), orderBy("createdAt", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setStudy(querySnapshot.docs[0].data() as StudyData);
        }
      } catch (error) {
        console.error("Error fetching study:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestStudy();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;

    const userMessage = queryText;
    setQueryText("");
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });
      const data = await res.json();
      
      setChatHistory(prev => [...prev, { role: 'ai', text: data.answer || "Sorry, I couldn't process that right now." }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: "Error connecting to AI assistant." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container animate-fade-in-up">
        
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Daily Bible Study</h1>
          <p className="hero-subtitle">Grow daily through the Word of God and our AI Assistant</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Today's Manual */}
          <div className="glass" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem', display: 'inline-block' }}>Today's Study</h2>
            
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading today's study manual...</p>
            ) : study ? (
              <>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{study.title}</h3>
                <p style={{ color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{study.date}</p>
                
                <div style={{ background: 'rgba(10,35,66,0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary-blue)', marginBottom: '1.5rem' }}>
                  <strong>Memory Verse:</strong> {study.memoryVerse}
                </div>

                <div style={{ lineHeight: 1.6, color: 'var(--text-dark)', marginBottom: '2rem' }}>
                  {study.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                  ))}
                </div>

                {study.pdfUrl && (
                  <a href={study.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    Download Full PDF Manual
                  </a>
                )}
              </>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No study manual has been uploaded for today yet.</p>
            )}
          </div>

          {/* Right Column: AI Assistant */}
          <div className="glass" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--primary-blue)', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Bethel AI Assistant</h2>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.25rem' }}>Ask questions to dive deeper into the Word</p>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {chatHistory.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem', fontSize: '0.9rem' }}>
                  Hello! I am your AI Bible Assistant. How can I help you understand today's study or any part of the Bible?
                </div>
              )}
              
              {chatHistory.map((msg, idx) => (
                <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', background: msg.role === 'user' ? 'var(--primary-blue)' : 'rgba(0,0,0,0.05)', color: msg.role === 'user' ? 'white' : 'var(--text-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', maxWidth: '85%', lineHeight: 1.5, fontSize: '0.95rem' }}>
                  {msg.text}
                </div>
              ))}
              
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Searching the scriptures...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleAskAI} style={{ padding: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.5)' }}>
              <input 
                type="text" 
                className="input-field" 
                style={{ flex: 1, margin: 0 }} 
                placeholder="Ask a biblical question..."
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" className="btn btn-primary" disabled={isTyping || !queryText.trim()}>Send</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
