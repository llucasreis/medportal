import styled from 'styled-components';
import { shade } from 'polished';
import { banner } from '../../assets';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 500px;

  form {
    /* margin: 80px 0;
    width: 340px; */
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  margin: 20px;
`;

export const Title = styled.h1`
  font-size: 80px;
  font-weight: bold;
`;

export const TitleHighlight = styled.span`
  color: #008357;
`;

export const Info = styled.div`
  font-size: 16px;
`;

export const CreateAccountInfo = styled.div`
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: ${shade(0.9, '#2F2F2F')};
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${banner}) no-repeat center;
  /* background-size: cover; */
`;
