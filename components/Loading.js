import React from 'react';

const Loading = () => (
  <div style={styles.loading}>
    <p>Cargando Personaje...</p>
  </div>
);

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    color: '#666',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Loading;
