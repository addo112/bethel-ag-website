import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bethel Assembly of God, Ayigya",
  description: "Welcome to Bethel Assembly of God Church. Join us to learn more about Jesus Christ through our daily bible studies, sermons, and events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '1rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <img src="/logo.png" alt="Assemblies of God Logo" style={{ width: '55px', height: 'auto', dropShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
                <h1 style={{ fontSize: '0.95rem', margin: 0, fontWeight: 800, color: 'var(--primary-blue)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Bethel Assembly of God
                </h1>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Ayigya
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 500 }}>
              <a href="/">Home</a>
              <a href="/sermons">Sermons</a>
              <a href="/study">Daily Study</a>
              <a href="/events">Events</a>
              <a href="/blog">Blog</a>
            </div>
            <div>
              <a href="/study" className="btn btn-primary">AI Assistant</a>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
        <footer style={{ background: 'var(--bg-dark)', color: 'var(--text-light)', padding: '4rem 0', marginTop: 'auto' }}>
          <div className="container text-center">
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Bethel Assembly of God</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ayigya, Kumasi</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Bethel Assembly of God. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
