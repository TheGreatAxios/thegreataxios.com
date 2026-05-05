export default function BackLink() {
  return (
    <div style={{
      marginBottom: '1.5rem',
      fontSize: '0.85rem'
    }}>
      <a
        href="/"
        style={{
          color: '#888 !important',
          textDecoration: 'none !important',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}
        onMouseOver={(e) => { e.currentTarget.style.color = '#555' }}
        onMouseOut={(e) => { e.currentTarget.style.color = '#888' }}
      >
        ← back to writing
      </a>
    </div>
  )
}
