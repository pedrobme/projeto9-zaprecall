import react from "react";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
import Buttons from "./Buttons";
import TasksList from "./TasksList";
import logo from "../assets/img/logo.png";

function App() {
  const deckReact = [
    {
      question: "O que é JSX?",
      answer: "Uma extensão de linguagem do JavaScript",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "O React é __",
      answer: "uma biblioteca JavaScript para construção de interfaces",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "Componentes devem iniciar com __",
      answer: "letra maiúscula",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "Podemos colocar __ dentro do JSX",
      answer: "expressões",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "O ReactDOM nos ajuda __",
      answer: "interagindo com a DOM para colocar componentes React na mesma",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "Usamos o npm para __",
      answer: "gerenciar os pacotes necessários e suas dependências",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "Usamos props para __",
      answer: "passar diferentes informações para componentes",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "Usamos estado (state) para __",
      answer:
        "dizer para o React quais informações quando atualizadas devem renderizar a tela novamente",
      condition: "closed",
      finishedStatus: "",
    },
  ];

  const deckLol = [
    {
      question: "Quem é o irmão do Nasus?",
      answer: "Renekton",
      condition: "closed",
      finishedStatus: "",
    },
    {
      question: "Quem matou a mulher do Lucian?",
      answer: "Thresh",
      condition: "closed",
      finishedStatus: "",
    },
  ];

  const [taskObjectsList, setTaskObjectsList] = react.useState(deckReact);
  const [selectedTaskIndex, setSelectedTaskIndex] = react.useState(null);
  const [numberFinishedTasks, setNumberFinishedTasks] = react.useState(0);
  const [decksList, setDecksList] = react.useState({
    deckReact: deckReact,
    deckLol: deckLol,
  });

  const [shownScreen, setShownScreen] = react.useState("initialScreen");

  function refreshFinishedTasks(finishedStatusName) {
    if (selectedTaskIndex === null) {
      alert("Selecione uma pergunta");
      return;
    }

    if (
      taskObjectsList[selectedTaskIndex].finishedStatus === finishedStatusName
    ) {
      const newTaskObjectsList = [...taskObjectsList];
      newTaskObjectsList[selectedTaskIndex].finishedStatus = "";
      setTaskObjectsList(newTaskObjectsList);
      refreshNumberFinishedTasks();
      selectTask(null);
      return;
    }

    const newTaskObjectsList = [...taskObjectsList];
    newTaskObjectsList[selectedTaskIndex].finishedStatus = finishedStatusName;
    newTaskObjectsList[selectedTaskIndex].condition = "finished";
    setTaskObjectsList(newTaskObjectsList);
    refreshNumberFinishedTasks();
    selectTask(null);
  }

  function refreshNumberFinishedTasks() {
    const finishedTasks = taskObjectsList.filter(
      (item) => item.finishedStatus !== ""
    );
    setNumberFinishedTasks(finishedTasks.length);
  }

  function selectTask(taskId) {
    setSelectedTaskIndex(taskId);
  }

  function showQuestion(taskId) {
    if (selectedTaskIndex === null) {
      selectTask(taskId);
      const newTaskObjectsList = [...taskObjectsList];
      newTaskObjectsList[taskId].condition = "opened";
      setTaskObjectsList(newTaskObjectsList);
    } else {
      alert("Finalize a pergunta aberta atualmente.");
    }
  }

  function showAnswer(taskId) {
    const newTaskObjectsList = [...taskObjectsList];
    newTaskObjectsList[taskId].condition = "answered";
    setTaskObjectsList(newTaskObjectsList);
  }

  function screenHandler() {
    switch (shownScreen) {
      
      case "initialScreen":
        return (
          <SelectDeckScreen>
            <GlobalStyle />
            <img src={logo} alt="Logo ZapRecall" />
            <h1>ZapRecall</h1>
            <select
              onChange={(event) =>
                setTaskObjectsList(
                  decksList[Object.keys(decksList)[event.target.value]]
                )
              }
            >
              {Object.keys(decksList).map((deckName, index) => (
                <option key={index} value={index}>
                  {deckName}
                </option>
              ))}
            </select>
            <button onClick={() => setShownScreen("mainScreen")}>
              Iniciar Recall!
            </button>
          </SelectDeckScreen>
        );

      case "mainScreen":
        return (
          <AppContainer>
            <GlobalStyle />
            <Title>
              <img src={logo} alt="Logo ZapRecall" />
              <h1>ZapRecall</h1>
            </Title>
            <TasksList
              showQuestion={showQuestion}
              taskObjectsList={taskObjectsList}
              showAnswer={showAnswer}
            />
            <Footer>
              <Buttons refreshFinishedTasks={refreshFinishedTasks} />
              <p data-identifier="flashcard-counter">
                {numberFinishedTasks}/{taskObjectsList.length} CONCLUÍDOS
              </p>
            </Footer>
          </AppContainer>
        );

      default:
        return;
    }
  }

  return screenHandler();
}

export default App;

const SelectDeckScreen = styled.div`
  background-color: #fb6b6b;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  select {
    width: 230px;
    height: 40px;

    margin-bottom: 30px;
  }

  h1 {
    color: #ffffff;

    font-size: 36px;

    margin-block: 30px;

    font-family: 'Righteous', cursive;
  }

  button {
    cursor: pointer;

    width: 250px;
    height: 50px;

    border: 1px solid red;

    font-weight: bold;

    color: red;
  }

  button:hover {
    background-color: gray;
  }
`;

const AppContainer = styled.div`
  background-color: #fb6b6b;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 200px;

  img {
    height: 60px;
    margin-right: 15px;
  }

  h1 {
    color: #ffffff;

    font-size: 36px;

    font-family: 'Righteous', cursive;
  }
`;

const Footer = styled.div`
  height: 130px;
  width: 100vw;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  position: fixed;
  bottom: 0;

  p {
    font-size: 18px;
  }
`;
