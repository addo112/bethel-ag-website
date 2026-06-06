"use client";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(rgba(10, 35, 66, 0.7), rgba(10, 35, 66, 0.8)), url("https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '0 2rem'
      }}>
        <div className="animate-fade-in-up" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '4rem', color: 'white', marginBottom: '1.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
            Welcome to Bethel Assembly
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.9)' }}>
            Join us in Ayigya as we grow in faith, learn about Jesus Christ, and serve our community with love.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/study" className="btn btn-accent">Daily Bible Study</a>
            <a href="/sermons" className="btn btn-primary" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', color: 'var(--primary-blue)' }}>Watch Latest Sermon</a>
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="section-padding" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2>Grow Spiritually With Us</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Explore our resources designed to help you become more like Jesus Christ.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Feature Card 1 */}
            <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(10, 35, 66, 0.1)', color: 'var(--primary-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>
                📖
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Daily Study</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Daily automated bible studies based on the Sunday School manual.</p>
              <a href="/study" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Start Studying &rarr;</a>
            </div>

            {/* Feature Card 2 */}
            <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(212, 175, 55, 0.2)', color: 'var(--accent-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>
                🤖
              </div>
              <h3 style={{ marginBottom: '1rem' }}>AI Assistant</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Search and ask questions to dig deeper into the Word of God.</p>
              <a href="/study#ai" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Ask a Question &rarr;</a>
            </div>

            {/* Feature Card 3 */}
            <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(10, 35, 66, 0.1)', color: 'var(--primary-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>
                🎥
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Latest Sermons</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Watch, listen, or read our latest teachings and preachings.</p>
              <a href="/sermons" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>View Library &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
