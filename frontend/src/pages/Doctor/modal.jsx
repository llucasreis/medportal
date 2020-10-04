import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
} from '@material-ui/core';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Dialog, DialogTitle, Button, MuiLoading } from '../../components';

const SaveModal = ({ open, onClose, onCreate }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleSave = useCallback(
    async formData => {
      setLoading(true);

      const { data, success } = await onCreate(formData);

      if (success) {
        onClose();
      } else {
        const { errors } = data;
        errors.forEach(errorData => {
          toast.error(errorData.error);
        });
      }

      setLoading(false);
    },
    [onClose, onCreate],
  );

  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle title="Criar Médico">
        <IconButton style={{ padding: '0px' }} onClick={() => onClose()}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(handleSave)}>
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
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ width: '45%' }}>
              <TextField
                fullWidth
                label="CRM"
                name="crm"
                inputRef={register({ required: true })}
                variant="outlined"
              />
            </div>
            <div style={{ width: '45%', marginLeft: 'auto' }}>
              <TextField
                fullWidth
                label="Número"
                name="number"
                inputRef={register({ required: true })}
                variant="outlined"
              />
            </div>
          </div>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ width: '45%' }}>
              <TextField
                fullWidth
                label="Cidade"
                name="city"
                inputRef={register({ required: true })}
                variant="outlined"
              />
            </div>
            <div style={{ width: '45%', marginLeft: 'auto' }}>
              <TextField
                fullWidth
                label="Estado"
                name="state"
                inputRef={register({ required: true })}
                variant="outlined"
              />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              label="Especialidade"
              name="specialty"
              inputRef={register({ required: true })}
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            style={{ minWidth: '200px', marginRight: '15px' }}
          >
            {loading ? <MuiLoading /> : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SaveModal;
