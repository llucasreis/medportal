import React, { useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../store/context/auth';

import { Button } from '../../components';
import {
  Container,
  Content,
  Background,
  Info,
  Title,
  TitleHighlight,
  Wrapper,
} from './styles';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async formData => {
      const { email, password } = formData;

      const { data, success } = await signIn({
        email,
        password,
      });

      if (success) {
        toast.success('Login feito com sucesso.');

        history.push('/home');
      } else {
        const { errors } = data;
        errors.forEach(errorData => {
          toast.error(errorData.error);
        });
      }
    },
    [history, signIn],
  );

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Wrapper>
            <Title>
              <TitleHighlight>med</TitleHighlight>Portal
            </Title>
          </Wrapper>
          <Wrapper>
            <Info>Portal de agendamento de consultas médicas</Info>
          </Wrapper>

          <Wrapper>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              inputRef={register({ required: true })}
              autoComplete="off"
              variant="outlined"
            />
          </Wrapper>
          <Wrapper>
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              inputRef={register({ required: true })}
              variant="outlined"
            />
          </Wrapper>
          <div>
            <Button type="submit">Entrar</Button>
          </div>
        </form>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
