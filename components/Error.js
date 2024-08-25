import React from 'react';

const Error = () => (
  <div style={styles.error}>
    <p>Error Cargando la Información del personaje.</p>
  </div>
);

const styles = {
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    color: '#ff0000',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Error;

