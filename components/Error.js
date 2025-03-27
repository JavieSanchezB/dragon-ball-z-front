"use client";

export default function Error({ message, onRetry }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      color: '#FF5555'
    }}>
      <h2>¡Error!</h2>
      <p>{message}</p>
      <button 
        onClick={onRetry}
        style={{
          padding: '0.5rem 1rem',
          background: '#FFD700',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        Reintentar
      </button>
    </div>
  );
}

