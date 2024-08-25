import React from 'react';

const CharacterCard = ({ character }) => (
  <div style={styles.card}>
    <img src={character.image} alt={character.name} style={styles.characterImage} />
    <div style={styles.cardContent}>
      <h2 style={styles.characterName}>{character.name}</h2>
      <p style={styles.characterInfo}><strong>Ki:</strong> {character.ki}</p>
      <p style={styles.characterInfo}><strong>Max Ki:</strong> {character.maxKi}</p>
      <p style={styles.characterInfo}><strong>Race:</strong> {character.race}</p>
      <p style={styles.characterInfo}><strong>Gender:</strong> {character.gender}</p>
      <p style={styles.characterDescription}>{character.description}</p>
      <div style={styles.cardFooter}>
        <span><strong>Affiliation:</strong> {character.affiliation}</span>
        <span><strong>Origin Planet:</strong> {character.originPlanet.name}</span>
      </div>
    </div>
  </div>
);

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    },
    display: 'flex',
    alignItems: 'center',
  },
  characterImage: {
    maxWidth: '150px',
    borderRadius: '10px',
    marginRight: '20px',
  },
  cardContent: {
    flex: 1,
  },
  characterName: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  characterInfo: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px',
  },
  characterDescription: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '10px',
  },
  cardFooter: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#444',
  },
};

export default CharacterCard;
