"use client";

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/personaje')
      .then(response => response.json())
      .then(data => {
        setCharacterData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!characterData) {
    return <div style={styles.error}>Error loading character data.</div>;
  }

  const { message, character } = characterData;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{message}</h1>
      <div style={styles.card}>
        <h2 style={styles.characterName}>{character.name}</h2>
        <img src={character.image} alt={character.name} style={styles.characterImage} />
        <p style={styles.characterInfo}><strong>Ki:</strong> {character.ki}</p>
        <p style={styles.characterInfo}><strong>Max Ki:</strong> {character.maxKi}</p>
        <p style={styles.characterInfo}><strong>Race:</strong> {character.race}</p>
        <p style={styles.characterInfo}><strong>Gender:</strong> {character.gender}</p>
        <p style={styles.characterDescription}>{character.description}</p>
      </div>
      <div style={styles.affiliationContainer}>
        <h3 style={styles.subTitle}>Affiliation: {character.affiliation}</h3>
        <h3 style={styles.subTitle}>Origin Planet: {character.originPlanet.name}</h3>
        <img src={character.originPlanet.image} alt={character.originPlanet.name} style={styles.planetImage} />
        <p style={styles.planetDescription}>{character.originPlanet.description}</p>
      </div>
      <div style={styles.transformationsContainer}>
        <h3 style={styles.subTitle}>Transformations</h3>
        <ul style={styles.transformationList}>
          {character.transformations.map(transformation => (
            <li key={transformation.id} style={styles.transformationItem}>
              <h4 style={styles.transformationName}>{transformation.name}</h4>
              <img src={transformation.image} alt={transformation.name} style={styles.transformationImage} />
              <p style={styles.transformationInfo}><strong>Ki:</strong> {transformation.ki}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 1s ease-in-out',
  },
  loading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '24px',
    color: 'red',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    animation: 'fadeInUp 0.5s ease-in-out',
  },
  characterName: {
    textAlign: 'center',
    color: '#444',
    marginBottom: '10px',
  },
  characterImage: {
    display: 'block',
    maxWidth: '300px',
    margin: '0 auto 20px',
    borderRadius: '10px',
  },
  characterInfo: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px',
  },
  characterDescription: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'justify',
  },
  affiliationContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    animation: 'fadeInUp 0.6s ease-in-out',
  },
  subTitle: {
    color: '#444',
    marginBottom: '10px',
  },
  planetImage: {
    display: 'block',
    maxWidth: '200px',
    margin: '10px auto',
    borderRadius: '10px',
  },
  planetDescription: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'justify',
  },
  transformationsContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    animation: 'fadeInUp 0.7s ease-in-out',
  },
  transformationList: {
    listStyleType: 'none',
    padding: 0,
  },
  transformationItem: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  transformationName: {
    color: '#444',
    marginBottom: '10px',
  },
  transformationImage: {
    display: 'block',
    maxWidth: '200px',
    margin: '0 auto 10px',
    borderRadius: '10px',
  },
  transformationInfo: {
    fontSize: '16px',
    color: '#555',
  },
};

// Animaciones CSS (añádelo a tu CSS global si es necesario)
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = globalStyles;
  document.head.append(style);
}
