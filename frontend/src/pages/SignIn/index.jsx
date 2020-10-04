/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState } from 'react';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../store/context/auth';
import { getLink } from '../../routes/menus';

import SignUp from './SignUp';

import { Button } from '../../components';
import {
  Container,
  Content,
  Background,
  Info,
  Title,
  TitleHighlight,
  Wrapper,
  CreateAccountInfo,
} from './styles';

const SignIn = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { signIn } = useAuth();

  const changeOpenSignUp = useCallback(newStatus => {
    setOpenSignUp(newStatus);
  }, []);

  const handleSignIn = useCallback(
    async formData => {
      const { email, password } = formData;

      const { data, success } = await signIn({
        email,
        password,
      });

      if (success) {
        toast.success('Login feito com sucesso.');

        history.push(`${getLink('Home')}`);
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
      {openSignUp && (
        <SignUp
          open={openSignUp}
          onClose={() => changeOpenSignUp(!openSignUp)}
        />
      )}
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
          <Wrapper>
            <Button type="submit">Entrar</Button>
          </Wrapper>
          <CreateAccountInfo onClick={() => changeOpenSignUp(!openSignUp)}>
            Não possui uma conta? Crie aqui.
          </CreateAccountInfo>
        </form>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
