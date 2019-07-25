import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #181818;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #eee;

    svg {
      width: 64px;
      height: 64px;
      margin-bottom: 10px;
    }
  }
`;

export default Container;
