import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  max-height: 40px;

  input {
    flex: 1;
    border: ${props =>
      props.error ? '4px solid #bc5028' : '1px solid #ebf1ed'};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    color: ${props => (props.error ? '#bc5028' : '#181818')};
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #bc5028;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  color: #ebf1ed;

  li {
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    & + li {
      border-top: 1px solid #ebf1ed;
    }

    div {
      display: flex;
      align-items: center;

      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #ebf1ed;
        margin-right: 15px;

        &:hover {
          opacity: 0.6;
        }
      }
    }

    a {
      color: #ebf1ed;
      text-decoration: none;

      &:hover {
        color: #bc5828;
      }
    }

    svg:hover {
      fill: #bc5828;
      cursor: pointer;
    }
  }
`;
