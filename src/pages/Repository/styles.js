import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #ebf1ed;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #ebf1ed;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: #bc5828;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
    border: 2px solid #ebf1ed;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #ebf1ed;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #ebf1ed;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border: 1px solid #ebf1ed;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #ebf1ed;
  }

  div {
    flex: 1;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #ebf1ed;

        &:hover {
          color: #bc5828;
        }
      }

      br {
        line-height: 1.5;
      }

      span {
        background: #ebf1ed;
        color: #181818;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 600;
        max-height: 16px;
        padding: 3px 4px;
        border: 1px solid #ebf1ed;

        & + span {
          margin-left: 10px;
        }
      }
    }

    & > a {
      margin-top: 10px;
      font-size: 12px;
      color: #888d96;
      text-decoration: none;

      &:hover {
        color: #bc5828;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    font-size: 15px;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  svg {
    margin: 5px;
  }
`;
