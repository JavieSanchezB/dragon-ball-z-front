"use client";

import React, { useEffect, useState } from 'react';
import CharacterList from '../components/CharacterList';
import Loading from '../components/Loading';
import Error from '../components/Error';

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

  if (loading) return <Loading />;
  if (!characterData) return <Error />;

  const { message, character } = characterData;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{message}</h1>
      <CharacterList characters={[character]} />
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
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
};
