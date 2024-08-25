// components/CharacterCard.js
import React from 'react';
import styles from '../styles/CharacterCard.module.css'; // Importa los estilos

const CharacterCard = ({ character }) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <img src={character.image} alt={character.name} className={styles.image} />
          <div className={styles.content}>
            <h2 className={styles.name}>{character.name}</h2>
            <p><strong>Ki:</strong> {character.ki}</p>
            <p><strong>Max Ki:</strong> {character.maxKi}</p>
            <p><strong>Race:</strong> {character.race}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Description:</strong> {character.description}</p>
            <p><strong>Affiliation:</strong> {character.affiliation}</p>
          </div>
        </div>
        <div className={styles.back}>
          {/* Contenido para el reverso de la tarjeta si lo deseas */
          <img src={character.image} alt={character.name} className={styles.image} />
          
          }
            <p>Ki: {character.ki}</p>
      
        </div>
    
      </div>
    </div>
  );
};

export default CharacterCard;
