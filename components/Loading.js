import React from 'react';

const Loading = () => (
  <div style={styles.loadingContainer}>
    <div style={styles.dragonBall}></div>
    <p style={styles.text}>Cargando personajes...</p>
  </div>
);

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px', // Más adecuado para cargas parciales
    gap: '20px'
  },
  dragonBall: {
    width: '50px',
    height: '50px',
    backgroundColor: '#FFD700',
    borderRadius: '50%',
    border: '3px solid #FF0000',
    boxShadow: '0 0 10px #FFD700',
    animation: 'pulse 1.5s infinite alternate'
  },
  text: {
    fontSize: '20px',
    color: '#FFD700',
    fontFamily: '"Dragon Ball", sans-serif',
    textShadow: '1px 1px 2px #000'
  },
  '@keyframes pulse': {
    from: { transform: 'scale(1)', boxShadow: '0 0 5px #FFD700' },
    to: { transform: 'scale(1.1)', boxShadow: '0 0 20px #FFD700' }
  }
};

export default Loading;