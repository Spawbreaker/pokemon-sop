import React, { useState, useEffect, useRef } from 'react';
import { Flex, Grid, H0, H1, H3, GlobalStyles, Button } from '@bigcommerce/big-design';

import { useSmashOrPass } from './useSmashOrPass';
import './App.css';

const App = () => {
  const { result, onSmash, onPass, currentPokemon, data, isLoading } = useSmashOrPass();

  const [smash, setSmash] = useState(0);
  const [pass, setPass] = useState(0);

  useEffect(() => {
    let newSmash = 0;
    let newPass = 0;
    Object.keys(result).forEach((key) => {
      if (result[key].smash === true) newSmash += 1;
      else if (result[key].smash === false) newPass += 1;
    })
    setSmash(newSmash);
    setPass(newPass);
  }, [result]);

  return (
    <Flex className="App" padding="xLarge" justifyContent="center">
      <GlobalStyles />
      <Flex style={{ maxWidth: '600px' }}>
        <H0>Pokemon</H0>
        <H1>{currentPokemon.current}</H1>
        {isLoading && <>Loading...</>}
        {!isLoading && data ? (
          <>
            <H3>{data.species.name}</H3>
            <img src={data.sprites.other['official-artwork'].front_default} alt={data.species.name} />
          </>
        ) : null}
        <Grid gridColumns="1fr 1fr" style={{ alignItems: 'end' }}>
          <Button onClick={onPass} disabled={isLoading}>Pass</Button>
          <Button onClick={onSmash} disabled={isLoading}>Smash</Button>
          <H3>{pass}</H3>
          <H3>{smash}</H3>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default App;
