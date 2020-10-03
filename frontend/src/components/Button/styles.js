import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.span`
  .button {
    border-radius: 5px;
  }

  .main-button {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 20px;
    padding-left: 20px;
    background-color: #008357;
    color: #f5f5f5;
    font-size: 16px;
    text-transform: uppercase;

    &:hover {
      background-color: ${shade(0.2, '#008357')};
    }
  }
`;
