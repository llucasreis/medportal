import React, { useState, useEffect, useCallback } from 'react';
import { MuiLoading, DataTable, Button } from '../../components';
import { api, apiRoutes } from '../../services/api';

import { Info, LoadingInfo } from './styles';

const Appointment = () => {
  const [pagination, setPagination] = useState({
    number: 0,
    size: 10,
    totalElements: 0,
  });
  const [appointments, setAppointments] = useState(null);

  const getAppointmentsData = useCallback(async () => {
    try {
      const { data } = await api.get(apiRoutes.APPOINTMENT);

      const { content, number, size, totalElements } = data;

      setAppointments(content);
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
    getAppointmentsData();
  }, [getAppointmentsData]);

  const columns = [
    {
      field: {
        relation: 'user',
        field: 'name',
      },
      label: 'Cliente',
    },
    {
      field: {
        relation: 'doctor',
        field: 'name',
      },
      label: 'Médico',
    },
    {
      field: 'date',
      label: 'Data',
    },
  ];

  const actions = [];

  return (
    <>
      <Info>
        <div>
          <h1>Lista de Agendamentos</h1>
          <Button>Novo Agendamento</Button>
        </div>
      </Info>
      {!appointments ? (
        <LoadingInfo>
          <h1>Carregando...</h1>
          <MuiLoading />
        </LoadingInfo>
      ) : (
        <DataTable
          columns={columns}
          rows={appointments}
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

export default Appointment;
