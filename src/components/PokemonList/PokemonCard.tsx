import { createUseStyles } from 'react-jss';
import { getAbsNumber } from '../../utils';

type PokemonCardProps = {
  name: string;
  types: string[];
  number: string;
  image: string;
  onCardClick: () => void;
};

function PokemonCard({
  name,
  types,
  number,
  image,
  onCardClick,
}: PokemonCardProps) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onCardClick}>
      <div>
        <div className={classes.heading}>
          <div className={classes.meta}>
            <span className={classes.numberSpan}>{getAbsNumber(number)}</span>
          </div>
          <div className={classes.name}>
            <p>{name}</p>
          </div>
        </div>

        <div className={classes.imageDiv}>
          <img src={image} alt={name} className={classes.img} />
        </div>
      </div>
      <div className={types.length > 1 ? classes.types : classes.typesSingle}>
        {types?.map((type) => (
          <span className={classes.pokeType} key={type}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;

const useStyles = createUseStyles(
  {
    root: {
      width: '20%',
      border: '2px solid lightblue',
      boxShadow: '0 0.125rem 0.25rem lightblue',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      borderRadius: '3px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.5s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)',
      },
    },
    name: {
      background: '#36454f',
      textAlign: 'center',
      padding: '4px',
      color: 'black',
      borderBottom: '1px solid lightblue',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      letterSpacing: '4px',
      textShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.4)',
    },
    heading: {
      position: 'relative',
    },
    meta: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      background: '#FEBE10',
      padding: '4px',
      borderRadius: '50%',
      textAlign: 'center',
      marginTop: '6px',
      marginLeft: '4px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
    },
    imageDiv: {
      padding: '20px',
      minHeight: '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    types: {
      display: 'flex',
      paddingInline: '10px',
      justifyContent: 'space-between',
    },
    pokeType: {
      width: '30%',
      background: '#f16820',
      borderRadius: '3px',
      padding: '7px',
      fontWeight: 700,
      fontSize: '12px',
      wordWrap: 'break-word',
      textAlign: 'center',
      marginBottom: '10px',
    },
    img: {
      width: '100%',
      height: 'auto',
    },
    typesSingle: {
      display: 'flex',
      paddingInline: '10px',
      justifyContent: 'center',
    },
    numberSpan: {
      color: '#36454F',
    },
  },
  { name: 'PokemonCard' }
);
