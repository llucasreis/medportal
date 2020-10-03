import React, { useCallback } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { api, apiRoutes } from '../../services/api';

const SignIn = () => {
  const { register, handleSubmit } = useForm();

  const handleSignIn = useCallback(async formData => {
    const { email, password } = formData;

    const response = await api.post(apiRoutes.SESSION, {
      email,
      password,
    });

    console.log(response);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <div>
        <TextField
          name="email"
          type="email"
          inputRef={register({ required: true })}
          autoComplete="off"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          name="password"
          type="password"
          inputRef={register({ required: true })}
          variant="outlined"
        />
      </div>
      <div>
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
};

export default SignIn;
