"use client";

import React, { useState, useEffect, useCallback } from 'react';
import CharacterCard from '../components/CharacterCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import styles from '../styles/CharacterList.module.css';

function Page() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchCharacters = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data?.items || !data?.meta) {
        throw new Error('Estructura de datos inválida');
      }

      setCharacters(data.items);
      setPagination({
        currentPage: data.meta.currentPage,
        totalPages: data.meta.totalPages,
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar personajes');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== pagination.currentPage) {
      fetchCharacters(newPage);
    }
  };

  const resetList = () => {
    fetchCharacters(1);
  };

  if (error) return <Error message={error} onRetry={resetList} />;

  // Generar rango de páginas para mostrar
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(pagination.totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personajes de Dragon Ball Z</h1>
      
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={styles.gridContainer}>
            {characters.map(character => (
              <CharacterCard 
                key={`${character.id}-${character.name}`} 
                character={character} 
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={styles.paginationButton}
              >
                Anterior
              </button>
              
              {getPageRange().map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`${styles.pageButton} ${pagination.currentPage === page ? styles.activePage : ''}`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={styles.paginationButton}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Page;