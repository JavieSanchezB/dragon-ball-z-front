"use client";

import React, { useState, useEffect, useMemo } from 'react';
import CharacterCard from '../components/CharacterCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import styles from '../styles/CharacterList.module.css';

function Page() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    affiliation: '',
    minKi: '',
    maxKi: ''
  });
  const [uniqueAffiliations, setUniqueAffiliations] = useState([]);

  const pageSize = 10;

  // Obtener todos los personajes
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        setLoading(true);
        let allChars = [];
        let nextPage = 1;
        let totalPages = 1;
        
        while (nextPage <= totalPages) {
          const response = await fetch(
            `https://dragonball-api.com/api/characters?page=${nextPage}&limit=100`
          );
          
          if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
          
          const data = await response.json();
          
          if (!data?.items || !data?.meta) {
            throw new Error('Estructura de datos inválida');
          }
          
          allChars = [...allChars, ...data.items];
          totalPages = data.meta.totalPages;
          nextPage++;
        }
        
        setAllCharacters(allChars);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar personajes');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  // Actualizar afiliaciones únicas cuando cambien los personajes
  useEffect(() => {
    if (allCharacters.length > 0) {
      const affiliations = [...new Set(allCharacters
        .map(char => char.affiliation)
        .filter(aff => aff) // Filtra valores nulos/undefined
        .sort() // Ordena alfabéticamente
      )];
      setUniqueAffiliations(affiliations);
    }
  }, [allCharacters]);

  // Función para convertir valores de Ki a números
  const parseKiValue = (kiString) => {
    if (!kiString) return 0;
    
    if (typeof kiString === 'number') return kiString;
    
    // Convertir "1.000.000" a 1000000
    const numericString = kiString.toString().replace(/\./g, '');
    
    // Manejar valores como "90 Septillion"
    if (kiString.includes('Septillion')) {
      const num = parseFloat(kiString);
      return num * 1e24;
    }
    
    return parseFloat(numericString) || 0;
  };

  // Filtrar personajes
  const filteredCharacters = useMemo(() => {
    return allCharacters.filter(char => {
      // Filtro por afiliación
      if (filters.affiliation && 
          !char.affiliation?.toLowerCase().includes(filters.affiliation.toLowerCase())) {
        return false;
      }
      
      const charKi = parseKiValue(char.ki);
      
      // Filtro por KI mínimo
      if (filters.minKi && charKi < parseKiValue(filters.minKi)) {
        return false;
      }
      
      // Filtro por KI máximo
      if (filters.maxKi && charKi > parseKiValue(filters.maxKi)) {
        return false;
      }
      
      return true;
    });
  }, [allCharacters, filters]);

  // Paginar resultados filtrados
  const paginatedCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCharacters.slice(startIndex, startIndex + pageSize);
  }, [filteredCharacters, currentPage]);

  const totalFilteredPages = Math.ceil(filteredCharacters.length / pageSize);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    // Resetear a la primera página al cambiar filtros
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      affiliation: '',
      minKi: '',
      maxKi: ''
    });
    setCurrentPage(1);
  };

  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PERSONAJES DE DRAGON BALL Z</h1>
      
      {/* Filtros */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label>Facción:</label>
          <select 
            name="affiliation" 
            value={filters.affiliation}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">Todas</option>
            {uniqueAffiliations.map(aff => (
              <option key={aff} value={aff}>{aff || 'Desconocida'}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label>KI Mínimo:</label>
          <input
            type="text"
            name="minKi"
            value={filters.minKi}
            onChange={handleFilterChange}
            placeholder="Ej: 1.000.000"
            className={styles.filterInput}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <label>KI Máximo:</label>
          <input
            type="text"
            name="maxKi"
            value={filters.maxKi}
            onChange={handleFilterChange}
            placeholder="Ej: 90 Septillion"
            className={styles.filterInput}
          />
        </div>
        
        <button 
          onClick={resetFilters}
          className={styles.resetButton}
        >
          Reiniciar Filtros
        </button>
      </div>
      
      {/* Resultados */}
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={styles.resultsInfo}>
            <p>Mostrando {paginatedCharacters.length} de {filteredCharacters.length} personajes</p>
          </div>
          
          <div className={styles.gridContainer}>
            {paginatedCharacters.map(character => (
              <CharacterCard 
                key={`${character.id}-${character.name}`} 
                character={character} 
              />
            ))}
          </div>

          {filteredCharacters.length === 0 && !loading && (
            <div className={styles.noResults}>
              <p>No se encontraron personajes con estos filtros</p>
            </div>
          )}

          {/* Paginación */}
          {totalFilteredPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                Anterior
              </button>
              
              {Array.from({ length: Math.min(5, totalFilteredPages) }, (_, i) => {
                let pageNum;
                if (totalFilteredPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalFilteredPages - 2) {
                  pageNum = totalFilteredPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`${styles.pageButton} ${
                      currentPage === pageNum ? styles.activePage : ''
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalFilteredPages))}
                disabled={currentPage === totalFilteredPages}
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