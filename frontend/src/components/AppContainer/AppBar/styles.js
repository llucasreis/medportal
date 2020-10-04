import styled from 'styled-components';

export const AppBarInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-grow: initial;

  .info-wrapper {
    display: flex;
  }

  .icon-wrapper {
    padding-right: 18px;
  }

  .user-wrapper {
    display: flex;
    flex-direction: column;

    p {
      font-weight: 500;
      font-size: 14px;
      color: #fff;
      opacity: 55%;
    }

    span {
      font-weight: 300;
      font-size: 14px;
      color: #fff;
      opacity: 38%;
    }
  }
`;
