import React, { useState, useEffect, useCallback } from 'react';
import CharacterCard from './CharacterCard';
import Loading from './Loading';
import Error from './Error';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/characters?page=${page}&limit=100`);
      const data = await response.json();
      if (data.items.length > 0) {
        setCharacters(prev => [...prev, ...data.items]);
        setHasMore(data.meta.currentPage < data.meta.totalPages);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (err) {
      setError('Error cargando la información de los personajes.');
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div>
      <div style={styles.cardContainer}>
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {hasMore && !loading && (
        <button onClick={loadMore} style={styles.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '10px',
  },
  loadMoreButton: {
    display: 'block',
    width: '100px',
    margin: '20px auto',
    padding: '10px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CharacterList;
