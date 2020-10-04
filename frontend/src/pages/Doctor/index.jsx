import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MuiLoading, DataTable, Button } from '../../components';
import { api, apiRoutes } from '../../services/api';
import { Info, LoadingInfo } from './styles';

import SaveModal from './modal';

const Doctor = () => {
  const [pagination, setPagination] = useState({
    number: 0,
    size: 10,
    totalElements: 0,
  });
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [doctors, setDoctors] = useState(null);

  const getDoctorData = useCallback(async () => {
    try {
      setDoctors(null);
      const { data } = await api.get(apiRoutes.DOCTOR);

      const { content, number, size, totalElements } = data;

      setDoctors(content);
      setPagination({
        number,
        size,
        totalElements,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDoctorData();
  }, [getDoctorData]);

  const handleOpenSaveModal = useCallback(() => {
    setOpenSaveModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenSaveModal(false);
  }, []);

  const handleCreateDoctor = useCallback(
    async formData => {
      try {
        const { data } = await api.post(apiRoutes.DOCTOR, formData);

        toast.success('Médico criado com sucesso');

        getDoctorData();

        return { data, success: true };
      } catch (error) {
        let data = null;
        if (error.response) {
          data = error.response.data;
        }

        return { data, success: false };
      }
    },
    [getDoctorData],
  );

  const columns = [
    {
      field: 'name',
      label: 'Nome',
    },
    {
      field: 'crm',
      label: 'CRM',
    },
    {
      field: 'number',
      label: 'Número',
    },
    {
      field: 'city',
      label: 'Cidade',
    },
    {
      field: 'state',
      label: 'Estado',
    },
    {
      field: 'specialty',
      label: 'Especialidade',
    },
  ];

  const actions = [];

  return (
    <>
      {openSaveModal && (
        <SaveModal
          open={openSaveModal}
          onClose={handleCloseModal}
          onCreate={handleCreateDoctor}
        />
      )}
      <Info>
        <div>
          <h1>Lista de Médicos</h1>
          <Button onClick={() => handleOpenSaveModal()}>Novo Médico</Button>
        </div>
      </Info>
      {!doctors ? (
        <LoadingInfo>
          <h1>Carregando...</h1>
          <MuiLoading />
        </LoadingInfo>
      ) : (
        <DataTable
          columns={columns}
          rows={doctors}
          actions={actions}
          hasPagination
          pageNumber={pagination.number}
          pageSize={pagination.size}
          totalElements={pagination.totalElements}
        />
      )}
    </>
  );
};

export default Doctor;
