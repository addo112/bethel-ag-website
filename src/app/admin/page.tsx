"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("sermons");
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', background: 'var(--bg-alt)' }}>
        {/* Admin Header */}
        <header style={{ background: 'var(--primary-blue)', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.25rem', color: 'white' }}>Bethel Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>Sign Out</button>
        </header>

        <div className="container" style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
          
          {/* Sidebar */}
          <aside style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => setActiveTab("sermons")} className={`btn ${activeTab === 'sermons' ? 'btn-primary' : ''}`} style={{ justifyContent: 'flex-start', background: activeTab === 'sermons' ? '' : 'transparent', color: activeTab === 'sermons' ? '' : 'var(--text-dark)', boxShadow: 'none' }}>
              🎥 Manage Sermons
            </button>
            <button onClick={() => setActiveTab("events")} className={`btn ${activeTab === 'events' ? 'btn-primary' : ''}`} style={{ justifyContent: 'flex-start', background: activeTab === 'events' ? '' : 'transparent', color: activeTab === 'events' ? '' : 'var(--text-dark)', boxShadow: 'none' }}>
              📅 Manage Events
            </button>
            <button onClick={() => setActiveTab("blog")} className={`btn ${activeTab === 'blog' ? 'btn-primary' : ''}`} style={{ justifyContent: 'flex-start', background: activeTab === 'blog' ? '' : 'transparent', color: activeTab === 'blog' ? '' : 'var(--text-dark)', boxShadow: 'none' }}>
              ✍️ Manage Blog
            </button>
            <button onClick={() => setActiveTab("study")} className={`btn ${activeTab === 'study' ? 'btn-primary' : ''}`} style={{ justifyContent: 'flex-start', background: activeTab === 'study' ? '' : 'transparent', color: activeTab === 'study' ? '' : 'var(--text-dark)', boxShadow: 'none' }}>
              📖 Sunday School
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="glass" style={{ flex: 1, padding: '2rem', minHeight: '600px' }}>
            {activeTab === "sermons" && <SermonsForm />}
            {activeTab === "events" && <EventsForm />}
            {activeTab === "blog" && <BlogForm />}
            {activeTab === "study" && <StudyForm />}
          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}

// ---- Subcomponents for Forms ----

function SermonsForm() {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("video");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "sermons"), {
        title, speaker, date, type, url, createdAt: new Date()
      });
      alert("Sermon uploaded successfully!");
      setTitle(""); setSpeaker(""); setDate(""); setUrl("");
    } catch (error) {
      console.error(error);
      alert("Error uploading sermon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h2 style={{ marginBottom: '1.5rem' }}>Upload New Sermon / Teaching</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
        <input className="input-field" placeholder="Sermon Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="input-field" placeholder="Speaker Name (e.g., Rev. John Doe)" value={speaker} onChange={e=>setSpeaker(e.target.value)} required />
        <input className="input-field" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
        
        <select className="input-field" value={type} onChange={e=>setType(e.target.value)}>
          <option value="video">Video (YouTube/Facebook Link)</option>
          <option value="audio">Audio (Google Drive Link)</option>
          <option value="pdf">PDF Notes (Google Drive Link)</option>
        </select>

        {type === "video" ? (
          <input className="input-field" placeholder="Embed URL (e.g., https://youtube.com/embed/...)" value={url} onChange={e=>setUrl(e.target.value)} required />
        ) : (
          <input className="input-field" type="url" placeholder="Paste Google Drive Link here" value={url} onChange={e=>setUrl(e.target.value)} required />
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Uploading..." : "Save Sermon"}</button>
      </form>
    </div>
  );
}

function EventsForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "events"), {
        title, date, location, description, createdAt: new Date()
      });
      alert("Event added successfully!");
      setTitle(""); setDate(""); setLocation(""); setDescription("");
    } catch (error) {
      alert("Error adding event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h2 style={{ marginBottom: '1.5rem' }}>Add New Event</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
        <input className="input-field" placeholder="Event Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="input-field" placeholder="Date & Time (e.g., Friday, 6:00 PM)" value={date} onChange={e=>setDate(e.target.value)} required />
        <input className="input-field" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} required />
        <textarea className="input-field" placeholder="Event Description" value={description} onChange={e=>setDescription(e.target.value)} rows={4} required />
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save Event"}</button>
      </form>
    </div>
  );
}

function BlogForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "blog_posts"), {
        title, author, excerpt, content, date: new Date().toLocaleDateString(), createdAt: new Date()
      });
      alert("Blog post published!");
      setTitle(""); setAuthor(""); setExcerpt(""); setContent("");
    } catch (error) {
      alert("Error adding blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h2 style={{ marginBottom: '1.5rem' }}>Write Blog Post</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '800px' }}>
        <input className="input-field" placeholder="Post Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="input-field" placeholder="Author Name" value={author} onChange={e=>setAuthor(e.target.value)} required />
        <textarea className="input-field" placeholder="Short Excerpt" value={excerpt} onChange={e=>setExcerpt(e.target.value)} rows={2} required />
        <textarea className="input-field" placeholder="Full Blog Content" value={content} onChange={e=>setContent(e.target.value)} rows={8} required />
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Publishing..." : "Publish Post"}</button>
      </form>
    </div>
  );
}

function StudyForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [memoryVerse, setMemoryVerse] = useState("");
  const [content, setContent] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "studies"), {
        title, date, memoryVerse, content, pdfUrl: pdfUrl || null, createdAt: new Date()
      });
      alert("Sunday School Manual uploaded!");
      setTitle(""); setDate(""); setMemoryVerse(""); setContent(""); setPdfUrl("");
    } catch (error) {
      alert("Error uploading study");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h2 style={{ marginBottom: '1.5rem' }}>Upload Sunday School Manual</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '800px' }}>
        <input className="input-field" placeholder="Lesson Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="input-field" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
        <input className="input-field" placeholder="Memory Verse" value={memoryVerse} onChange={e=>setMemoryVerse(e.target.value)} required />
        <textarea className="input-field" placeholder="Lesson Content Summary" value={content} onChange={e=>setContent(e.target.value)} rows={4} required />
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Link to PDF Manual (Google Drive Link - Optional)</label>
          <input className="input-field" type="url" placeholder="Paste Google Drive Link here" value={pdfUrl} onChange={e=>setPdfUrl(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Uploading..." : "Save Manual"}</button>
      </form>
    </div>
  );
}
