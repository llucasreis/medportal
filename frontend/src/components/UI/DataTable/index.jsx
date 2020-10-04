/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  // IconButton,
} from '@material-ui/core';
import MuiTableCell from '@material-ui/core/TableCell';
import is from 'is_js';
import uuid from 'react-uuid';

// import { icon_edit, icon_delete } from '../../../assets';
// import { Switch } from '../..';
import { formatDate } from '../../../utils';
import mask from '../../../config/mask';

const TableCell = withStyles(() => ({
  root: {
    borderBottom: '0px',
  },
  head: {
    fontWeight: '500',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    color: '#008357',
    fontSize: 18,
  },
  body: {
    fontWeight: '300',
    color: '#2F2F2F',
    fontSize: 20,
  },
}))(MuiTableCell);

const BodyTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#E6E6E6',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#D9D9D9',
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  pagination: {
    borderBottom: 'none',
  },
  actions: {
    color: '#8083FE',
  },
});

const DataTable = ({
  columns = [],
  rows = [],
  actions = [],
  // onEdit,
  // onDelete,
  // onChangeChecked,
  hasPagination = false,
  pageSize = 10,
  pageNumber = 0,
  totalElements = -1,
  onPagination,
}) => {
  const classes = useStyles();
  const fields = [];
  const masks = [];

  // eslint-disable-next-line consistent-return
  const getField = useCallback((row, field) => {
    const { field: inner_field, relation } = field;

    if (is.object(inner_field)) {
      return getField(row[relation], inner_field);
    }
    if (
      typeof row !== 'undefined' &&
      relation in row &&
      row[relation] !== null
    ) {
      return row[relation][inner_field];
    }
  }, []);

  const getRowField = useCallback(
    (row, field) => {
      if (is.object(field)) {
        return getField(row, field);
      }
      return String(row[field]);
    },
    [getField],
  );

  const customField = useCallback(
    (row, field, index) => {
      const type = masks[index];

      switch (type) {
        case mask.PERCENTAGE: {
          return <span style={{ fontWeight: '500' }}>{`${field}%`}</span>;
        }
        case mask.DATE: {
          return `${formatDate(field)}`;
        }
        default:
          return field;
      }
    },
    [masks],
  );

  const handleChangePage = useCallback(
    (_event, newPage) => {
      onPagination(newPage);
    },
    [onPagination],
  );

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map(column => {
                fields.push(column.field);
                masks.push(column.mask || '');
                return (
                  <TableCell key={uuid()} align="left">
                    {column.label}
                  </TableCell>
                );
              })}
              {/* {actions.length && <TableCell align="left">Ações</TableCell>} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <BodyTableRow key={uuid()}>
                {fields.map((field, indexField) => (
                  <TableCell component="th" key={uuid()} align="left">
                    {customField(row, getRowField(row, field), indexField)}
                  </TableCell>
                ))}
                {/* {actions.map(action =>
                  action === 'edit' ? (
                    <TableCell key={String(action)} align="left">
                      <IconButton onClick={() => onEdit(row)}>
                        <img src={icon_edit} alt="Edit" />
                      </IconButton>
                    </TableCell>
                  ) : action === 'delete' ? (
                    <TableCell key={String(action)} align="left">
                      <IconButton onClick={() => onDelete(row)}>
                        <img src={icon_delete} alt="Delete" />
                      </IconButton>
                    </TableCell>
                  ) : (
                    ''
                  ),
                )} */}
              </BodyTableRow>
            ))}
          </TableBody>
          {hasPagination && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  classes={{
                    root: classes.pagination,
                    actions: classes.actions,
                  }}
                  count={totalElements}
                  rowsPerPageOptions={[]}
                  rowsPerPage={pageSize}
                  page={pageNumber}
                  onChangePage={handleChangePage}
                  backIconButtonText="Página anterior"
                  nextIconButtonText="Próxima página"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count} itens`
                  }
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
