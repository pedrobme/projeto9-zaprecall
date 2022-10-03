import styled from "styled-components";
import setaPlay from "../assets/img/seta_play.png";
import setaVirar from "../assets/img/seta_virar.png";
import acerto from "../assets/img/icone_certo.png";
import erro from "../assets/img/icone_erro.png";
import quase from "../assets/img/icone_quase.png";

function Task(props) {
  const { taskObject, index, showQuestion, showAnswer } = props;
  const { question, answer, condition, finishedStatus } = taskObject;

  let taskJsx;

  function getFinishedTaskIcon() {
    switch (finishedStatus) {
      case "forgot":
        return erro;

      case "almost-forgot":
        return quase;

      case "zap":
        return acerto;

      default:
        return;
    }
  }

  function getFinishedTaskColor() {
    switch (finishedStatus) {
      case "forgot":
        return `#FF3030`;

      case "almost-forgot":
        return `#FF922E`;

      case "zap":
        return `#2FBE34`;

      default:
        return;
    }
  }

  switch (condition) {
    case "closed":
      taskJsx = (
        <ClosedTaskLi data-identifier="flashcard" id={index}>
          <span data-identifier="flashcard-index-item">
            Pergunta {index + 1}
          </span>
          <img
            data-identifier="flashcard-show-btn"
            onClick={() => {
              showQuestion(index);
            }}
            src={setaPlay}
            alt="Botao para virar pergunta"
          />
        </ClosedTaskLi>
      );
      break;

    case "opened":
      taskJsx = (
        <OpenedTaskLi data-identifier="flashcard" id={index}>
          <span data-identifier="flashcard-question">{question}</span>
          <img
            data-identifier="flashcard-turn-btn"
            onClick={() => {
              showAnswer(index);
            }}
            src={setaVirar}
            alt="Botao para virar resposta"
          />
        </OpenedTaskLi>
      );
      break;

    case "answered":
      taskJsx = (
        <AnsweredTaskLi data-identifier="flashcard" id={index}>
          <span data-identifier="flashcard-answer">{answer}</span>
        </AnsweredTaskLi>
      );
      break;

    case "finished":
      taskJsx = (
        <FinishedTaskLi
          data-identifier="flashcard"
          id={index}
          getFinishedTaskColor={getFinishedTaskColor}
        >
          Pergunta {index + 1}
          <img
            data-identifier="flashcard-status"
            src={getFinishedTaskIcon()}
            alt="Botao para virar pergunta"
          />
        </FinishedTaskLi>
      );
      break;

    default:
      break;
  }

  return taskJsx;
}

export default Task;

const ClosedTaskLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px;

  width: 300px;
  height: 65px;

  background-color: #ffffff;

  font-size: 16px;
  font-weight: bold;

  margin-bottom: 25px;

  img {
    cursor: pointer;
  }
`;

const OpenedTaskLi = styled.li`
  display: flex;
  align-items: start;
  justify-content: space-between;

  width: 300px;
  height: 130px;

  padding: 15px;

  font-size: 16px;
  font-weight: bold;

  margin-bottom: 25px;

  background-color: #ffffd4;

  img {
    cursor: pointer;
    margin-top: 80px;
  }
`;

const AnsweredTaskLi = styled.li`
  width: 300px;
  height: 130px;

  padding: 15px;

  font-size: 16px;
  font-weight: bold;

  margin-bottom: 25px;

  background-color: #ffffd4;
`;

const FinishedTaskLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px;

  width: 300px;
  height: 65px;

  background-color: #ffffff;

  font-size: 16px;
  font-weight: bold;

  text-decoration: line-through;

  color: ${(props) => props.getFinishedTaskColor()};

  margin-bottom: 25px;
`;
