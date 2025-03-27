import React, { useState, useEffect, useCallback } from 'react';
import CharacterCard from './CharacterCard';
import Loading from './Loading';
import Error from './Error';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ 
    currentPage: 1, 
    totalPages: 1 
  });
  const [links, setLinks] = useState({
    first: '',
    previous: '',
    next: '',
    last: ''
  });

  const fetchCharacters = useCallback(async (url = '/api/characters?limit=10') => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en la respuesta');
      
      const data = await response.json();
      
      setCharacters(data.items);
      setMeta({
        currentPage: data.meta.currentPage,
        totalPages: data.meta.totalPages
      });
      setLinks(data.links);
      setError(null);
    } catch (err) {
      setError('Error cargando los personajes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(links.first || '/api/characters?limit=10');
  }, []);

  const handleNextPage = () => links.next && fetchCharacters(links.next);
  const handlePrevPage = () => links.previous && fetchCharacters(links.previous);

  return (
    <div>
      <div style={styles.cardContainer}>
        {characters.map(character => (
          <CharacterCard 
            key={character.id} 
            character={character} 
          />
        ))}
      </div>

      {loading && <Loading />}
      {error && <Error message={error} />}

      {!loading && !error && (
        <div style={styles.pagination}>
          <button
            onClick={handlePrevPage}
            style={styles.button}
            disabled={!links.previous}
          >
            Anterior
          </button>
          
          <span style={styles.pageInfo}>
            Página {meta.currentPage} de {meta.totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            style={styles.button}
            disabled={!links.next}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    background: '#f5f5f5'
  },
  button: {
    padding: '10px 25px',
    backgroundColor: '#FFD700',
    color: '#2C2C2C',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    ':disabled': {
      backgroundColor: '#e0e0e0',
      cursor: 'not-allowed'
    }
  },
  pageInfo: {
    fontSize: '1.1rem',
    color: '#2C2C2C',
    fontWeight: '500'
  }
};

export default CharacterList;