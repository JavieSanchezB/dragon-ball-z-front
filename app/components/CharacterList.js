import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => (
  <div>
    {characters.map(character => (
      <CharacterCard key={character.id} character={character} />
    ))}
  </div>
);

export default CharacterList;
