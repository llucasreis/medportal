import React from 'react';
import MuiButton from '@material-ui/core/Button';
import cn from 'classnames';

import { Container } from './styles';

const Button = ({ variant = 'main-button', children, ...rest }) => {
  let btnClassName = {};

  if (rest.className) {
    btnClassName = rest.className;
    delete rest.className;
  }

  return (
    <Container>
      <MuiButton className={cn('button', `${variant}`, btnClassName)} {...rest}>
        {children}
      </MuiButton>
    </Container>
  );
};

export default Button;
