import React, { useCallback, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';
import { getAbsNumber } from '../../utils';

type SearchPokemonProps = {
  pokemons: Pokemon[];
  onFilter: (filtered: Pokemon[]) => void;
};

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const DEBOUNCE_TIME = 300;

function SearchPokemon({ pokemons, onFilter }: SearchPokemonProps) {
  const [searchVal, setSearchVal] = useState<string>('');
  const classes = useStyles();

  const filterPokemons = (query: string) => {
    const filtered = pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
        getAbsNumber(pokemon.number) === getAbsNumber(query)
    );
    onFilter(filtered);
  };

  const debouncedFilter = useMemo(
    () => debounce(filterPokemons, DEBOUNCE_TIME),
    [pokemons]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchVal(query);
    debouncedFilter(query);
  };

  return (
    <div className={classes.root}>
      <label className={classes.label}>Search Pokemon:</label>
      <input
        className={classes.inputEl}
        value={searchVal}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchPokemon;

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      paddingBlock: '32px',
    },
    inputEl: {
      minWidth: '450px',
      padding: '8px',
      fontSize: '16px',
      border: '1px solid lightblue',
      borderRadius: '3px',
      background: '#36454f',
    },
    label: {
      fontStyle: 'italic',
      fontSize: '20px',
    },
  },
  { name: 'SearchPokemon' }
);
