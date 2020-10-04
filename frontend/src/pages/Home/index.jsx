import React from 'react';

import { home_banner } from '../../assets';
import { Container, Welcome } from './styles';

import { useAuth } from '../../store/context/auth';

const Home = () => {
  const { user } = useAuth();
  return (
    <Container>
      <img
        src={home_banner}
        alt="Home"
        style={{ width: '60%', height: '60%' }}
      />
      <Welcome>
        <h2>Bem-vindo {user.name}</h2>
      </Welcome>
    </Container>
  );
};

export default Home;
