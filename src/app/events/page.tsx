export default function Events() {
  const events = [
    {
      id: 1,
      title: "Sunday Morning Service",
      date: "Every Sunday at 8:30 AM",
      location: "Main Auditorium, Ayigya",
      description: "Join us for a time of powerful worship and the undiluted Word of God."
    },
    {
      id: 2,
      title: "Midweek Bible Study",
      date: "Every Wednesday at 6:30 PM",
      location: "Church Hall",
      description: "An interactive session where we dig deep into the scriptures."
    },
    {
      id: 3,
      title: "Youth All-Night Prayer",
      date: "Last Friday of the Month, 10:00 PM",
      location: "Main Auditorium",
      description: "A night of intense prayer, worship, and spiritual warfare for the youth."
    }
  ];

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1>Events & Calendar</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Stay updated with what is happening at Bethel Assembly of God.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {events.map(event => (
            <div key={event.id} className="glass animate-fade-in-up" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(10,35,66,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '120px' }}>
                <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>{event.id}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Upcoming</span>
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{event.title}</h2>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <span>📅 {event.date}</span>
                  <span>📍 {event.location}</span>
                </div>
                <p style={{ color: 'var(--text-dark)' }}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
