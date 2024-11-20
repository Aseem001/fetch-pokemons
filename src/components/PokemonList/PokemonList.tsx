import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import PokemonCard from './PokemonCard';
import SearchPokemon from './SearchPokemon';
import PokemonDetailsModal from './PokemonDetailsModal';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [loading]);

  const handleFilteredPokemons = (filtered: typeof pokemons) => {
    setFilteredPokemons(filtered);
  };

  return (
    <>
      <SearchPokemon pokemons={pokemons} onFilter={handleFilteredPokemons} />
      <div className={classes.root}>
        {loading && <div>Loading...</div>}
        {!loading &&
          filteredPokemons.map((pkmn, index) => (
            <PokemonCard
              key={pkmn.id}
              name={pkmn.name}
              types={pkmn.types}
              number={pkmn.number}
              image={pkmn.image}
              onCardClick={() => {
                setIsModalOpen(true);
                setSelectedPokemon(pkmn);
              }}
            />
          ))}
        {!loading && filteredPokemons.length === 0 && (
          <div>No Pokemon found.</div>
        )}
      </div>
      <PokemonDetailsModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedPokemon={selectedPokemon!}
      />
    </>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      paddingBlock: '18px',
    },
  },

  { name: 'PokemonList' }
);
