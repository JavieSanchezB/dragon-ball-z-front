"use client";

// app/page.js
import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard'; // Ruta correcta
import Loading from '../components/Loading';
import Error from '../components/Error';
import styles from '../styles/ButtonStyles.module.css';

function Page() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`/api/personaje?page=${currentPage}&limit=100`);
        const data = await response.json();
        setCharacters(prev => [...prev, ...data.character.items]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  if (loading) return <Loading />;
  if (error) return <Error message="Error cargando la información de los personajes." />;

  return (
    <div>
      <h1>Personajes de Dragon Ball Z</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <button
        onClick={() => setCurrentPage(prev => prev + 1)}
        className={styles.button} // Aplica los estilos del botón
      >
        Cargar más
      </button>
    </div>
  );
}

export default Page;
