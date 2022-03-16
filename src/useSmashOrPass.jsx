import { useState, useEffect, useRef } from 'react';
import { useGetPokemonByIdQuery } from './services/pokemon';

export const useSmashOrPass = () => {
  const [result, setResult] = useState([]);
  const [current, setCurrent] = useState(1);
  const currentPokemon = useRef(1);
  const [hasListener, setHasListener] = useState(false);
  const { data, isLoading } = useGetPokemonByIdQuery(current);

  useEffect(() => {
    if (data?.id)
      setResult((r) => ({ ...r, [data.id]: { ...r[data.id], name: data.species.name } }));
  }, [data]);

  const onPass = () => {
    console.log(`Passing on ${data?.species?.name || currentPokemon.current}`);
    setResult((r) => ({ ...r, [currentPokemon.current]: { ...r[currentPokemon.current], smash: false } }));
    setCurrent((current) => current + 1);
    currentPokemon.current += 1;
  };

  const onSmash = () => {
    console.log(`Smashing on ${data?.species?.name || currentPokemon.current}`);
    setResult((r) => ({ ...r, [currentPokemon.current]: { ...r[currentPokemon.current], smash: true } }));
    setCurrent((current) => current + 1);
    currentPokemon.current += 1;
  }

  useEffect(() => {
    if (!hasListener) {
      console.log('Adding listener');
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') onPass();
        if (event.key === 'ArrowRight') onSmash();
      });
      setHasListener(true);
    }
  }, [hasListener]);

  return { result, onSmash, onPass, currentPokemon, data, isLoading };
};
