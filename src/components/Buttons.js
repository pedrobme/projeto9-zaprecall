import styled from "styled-components";

function Buttons(props) {
  const { refreshFinishedTasks } = props;

  return (
    <ButtonsDiv>
      <button
        data-identifier="forgot-btn"
        onClick={() => refreshFinishedTasks("forgot")}
      >
        Nao lembrei
      </button>
      <button
        data-identifier="almost-forgot-btn"
        onClick={() => refreshFinishedTasks("almost-forgot")}
      >
        Quase nao lembrei
      </button>
      <button
        data-identifier="zap-btn"
        onClick={() => refreshFinishedTasks("zap")}
      >
        Zap!
      </button>
    </ButtonsDiv>
  );
}

export default Buttons;

const ButtonsDiv = styled.div`
  width: 270px;

  padding-block: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    border-radius: 5px;

    width: 85px;
    height: 37px;

    color: #ffffff;
  }

  button:nth-child(1) {
    background-color: #ff3030;
  }

  button:nth-child(2) {
    background-color: #ff922e;
  }

  button:nth-child(3) {
    background-color: #2fbe34;
  }
`;
