// components/CharacterCard.js
import React from 'react';
import styles from '../styles/CharacterCard.module.css'; // Importa los estilos

const CharacterCard = ({ character }) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <img src={character.image} alt={character.name} className={styles.image} />
         
        </div>
        <div className={styles.back}>
          {/* Contenido para el reverso de la tarjeta si lo deseas */
            <div className={styles.content}>
            <h2 className={styles.name}>{character.name}</h2>
            <p className={styles.name}><strong>Ki:</strong> {character.ki}</p>
            <p className={styles.name}><strong>Max Ki:</strong> {character.maxKi}</p>
            <p className={styles.name}><strong>Race:</strong> {character.race}</p>
            <p className={styles.name}><strong>Gender:</strong> {character.gender}</p>
            <p className={styles.name}><strong>Affiliation:</strong> {character.affiliation}</p>
          </div>
          }
       
        </div>
        
      </div>
      
    </div>
    
  );
};

export default CharacterCard;
