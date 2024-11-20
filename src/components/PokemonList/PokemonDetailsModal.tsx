import { Dialog, DialogContent, Box, Skeleton } from '@mui/material';
import React, { useMemo } from 'react';
import { Pokemon } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String!) {
    pokemon(id: $id) {
      id
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        special {
          name
          damage
        }
      }
    }
  }
`;

function PokemonDetailsModal({
  isOpen,
  setIsOpen,
  selectedPokemon,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPokemon: Pokemon;
}) {
  const { data: { pokemon } = {}, loading } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      id: selectedPokemon?.id,
    },
    skip: !selectedPokemon,
  });

  const classes = useStyles();

  const handleClose = () => {
    setIsOpen(false);
  };

  const pokemonDetails = useMemo(
    () => [
      {
        key: 'Min Weight',
        value: pokemon?.weight?.minimum,
      },
      {
        key: 'Max Weight',
        value: pokemon?.weight?.maximum,
      },
      {
        key: 'Min Height',
        value: pokemon?.height?.minimum,
      },
      {
        key: 'Max Height',
        value: pokemon?.height?.minimum,
      },
      {
        key: 'Max HP',
        value: pokemon?.maxHP,
      },
      {
        key: 'Max CP',
        value: pokemon?.maxCP,
      },
      {
        key: 'Classification',
        value: pokemon?.classification,
      },
      {
        key: 'Resistant',
        value: pokemon?.resistant?.join(', '),
      },
      {
        key: 'Attacks',
        value: pokemon?.attacks?.special
          ?.map((at: { name: string }) => at.name)
          .join(', '),
      },
      {
        key: 'Weaknesses',
        value: pokemon?.weaknesses?.join(', '),
      },
      {
        key: 'Flee Rate',
        value: pokemon?.fleeRate,
      },
    ],
    [pokemon]
  );

  if (!selectedPokemon) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogContent className={classes.root}>
        <Box className={classes.imgContainer}>
          <img src={selectedPokemon.image} alt={selectedPokemon.name} />
        </Box>
        {
          <div className={classes.detailsContainer}>
            <div className={classes.heading}>{selectedPokemon.name}</div>
            {pokemonDetails.map((pkmn) => (
              <Box key={pkmn.key} className={classes.listBox}>
                <ModeStandbyIcon className={classes.listIcon} />
                <Box className={classes.detailsBox}>
                  {pkmn.key}:
                  {loading ? (
                    <Skeleton
                      variant="rounded"
                      width={250}
                      height={18}
                      className={classes.skeleton}
                      sx={{ color: 'red', background: '#FFFFF0', opacity: 0.5 }}
                    />
                  ) : (
                    <div className={classes.depthBox}>{pkmn.value}</div>
                  )}
                </Box>
              </Box>
            ))}
          </div>
        }
      </DialogContent>
    </Dialog>
  );
}

export default PokemonDetailsModal;

const useStyles = createUseStyles(
  {
    root: {
      border: '2px solid lightblue',
      background: '#171E2b',
      display: 'flex',
    },
    listIcon: {
      fontSize: '16px !important',
      marginRight: '10px',
      color: '#FCF5E5',
    },
    depthBox: {
      marginLeft: '20px',
      fontFamily: 'Cabin',
      textTransform: 'uppercase',
      letterSpacing: '0.05rem',
      textAlign: 'left',
      color: '#E2DFD2',
      maxWidth: '600px',
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '3px',
    },
    detailsBox: {
      display: 'flex',
      fontFamily: 'Cabin',
      color: '#E2DFD2',
    },
    imgContainer: {
      display: 'flex',
    },
    listBox: {
      marginLeft: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    heading: {
      marginLeft: '20px',
      fontSize: '34px',
      fontFamily: 'Cabin',
      color: '#F3E5AB',
      marginBottom: '10px',
    },
    skeleton: {
      marginLeft: '20px',
      fontFamily: 'Cabin',
      textTransform: 'uppercase',
      letterSpacing: '0.05rem',
      textAlign: 'right',
      color: '#E2DFD2',
      background: 'yellow',
    },
  },
  { name: 'PokemonDetaisModal' }
);
