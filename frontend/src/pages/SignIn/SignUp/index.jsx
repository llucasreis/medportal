import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import {
  DialogContent,
  IconButton,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { Dialog, DialogTitle, Button, MuiLoading } from '../../../components';

import { api, apiRoutes } from '../../../services/api';

const SignUp = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleSignUp = useCallback(
    async formData => {
      const { name, email, password } = formData;
      setLoading(true);

      try {
        await api.post(apiRoutes.USER, {
          name,
          email,
          password,
        });

        toast.success('Cadastro criado com sucesso');
        toast.info('Você já pode realizar seu login');

        onClose();
      } catch (error) {
        let responseData = null;

        if ('response' in error) {
          responseData = error.response.data;
        }

        if (responseData) {
          const { errors } = responseData;
          errors.forEach(errorData => {
            toast.error(errorData.error);
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [onClose],
  );
  return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle title="Criar Conta">
        <IconButton style={{ padding: '0px' }} onClick={() => onClose()}>
          <MdClose />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleSignUp)}>
        <DialogContent>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              inputRef={register({ required: true })}
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              inputRef={register({ required: true })}
              autoComplete="off"
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              inputRef={register({ required: true })}
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Button type="submit" style={{ minWidth: '200px' }}>
              {loading ? <MuiLoading /> : 'Salvar'}
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SignUp;
