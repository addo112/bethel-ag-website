"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Event[];
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container animate-fade-in-up">
        
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Upcoming Events</h1>
          <p className="hero-subtitle">Join us as we fellowship and grow together</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading events...</div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No upcoming events at the moment. Check back soon!</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {events.map((event) => (
              <div key={event.id} className="glass" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'var(--primary-blue)', color: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '80px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{event.date.split(',')[0]}</div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{event.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📍 {event.location}</p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-dark)', lineHeight: 1.6, flex: 1 }}>{event.description}</p>
                <button className="btn btn-primary" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>Mark Calendar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
