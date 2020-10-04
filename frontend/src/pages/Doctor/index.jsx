import React, { useState, useEffect, useCallback } from 'react';
import { MuiLoading, DataTable, Button } from '../../components';
import { api, apiRoutes } from '../../services/api';

import { Info, LoadingInfo } from './styles';

const Doctor = () => {
  const [pagination, setPagination] = useState({
    number: 0,
    size: 10,
    totalElements: 0,
  });
  const [doctors, setDoctors] = useState(null);

  const getDoctorData = useCallback(async () => {
    try {
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
    console.log('chamou');
    getDoctorData();
  }, [getDoctorData]);

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
      <Info>
        <div>
          <h1>Lista de Médicos</h1>
          <Button>Novo Médico</Button>
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
