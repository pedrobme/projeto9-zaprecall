import styled from "styled-components";
import Task from "./Task";

function TasksList(props) {
  const { taskObjectsList, showQuestion, showAnswer } = props;

  return (
    <StyledTaskListUl>
      {taskObjectsList.map((item, index) => (
        <Task
          key={index}
          taskObject={item}
          index={index}
          showQuestion={showQuestion}
          showAnswer={showAnswer}
        />
      ))}
    </StyledTaskListUl>
  );
}

export default TasksList;

const StyledTaskListUl = styled.ul`
  margin-bottom: 145px;

  height: 100%;

  overflow-y: scroll;
`;
