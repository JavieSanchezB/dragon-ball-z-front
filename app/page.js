"use client";
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reemplaza con la URL de tu API de Node.js
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
    return <div>Loading...</div>;
  }

  if (!characterData) {
    return <div>Error loading character data.</div>;
  }

  const { message, character } = characterData;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{message}</h1>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} style={{ maxWidth: '300px' }} />
      <p><strong>Ki:</strong> {character.ki}</p>
      <p><strong>Max Ki:</strong> {character.maxKi}</p>
      <p><strong>Race:</strong> {character.race}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Description:</strong> {character.description}</p>
      <h3>Affiliation: {character.affiliation}</h3>
      <h3>Origin Planet: {character.originPlanet.name}</h3>
      <img src={character.originPlanet.image} alt={character.originPlanet.name} style={{ maxWidth: '200px' }} />
      <p>{character.originPlanet.description}</p>

      <h3>Transformations</h3>
      <ul>
        {character.transformations.map(transformation => (
          <li key={transformation.id}>
            <h4>{transformation.name}</h4>
            <img src={transformation.image} alt={transformation.name} style={{ maxWidth: '200px' }} />
            <p><strong>Ki:</strong> {transformation.ki}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
