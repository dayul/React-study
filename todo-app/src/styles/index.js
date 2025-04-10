import styled from 'styled-components'
// styled component
const AppContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

// 여러 Todo 리스트를 가로로 나란히 배치하기 위한 Flex 컨테이너
const ListsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

// 개별 Todo 리스트를 감싸는 카드 스타일의 컨테이너
const TodoListContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  background-color: #f9f9f9;
`;

// 새로운 리스트 제목을 입력하는 필드
// &는 this와 비슷한 역할
const ListTitleInput = styled.input`
  width: 100%;
  height: 30px;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 25px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
  }
`;

// 리스트 추가 버튼
const AddListButton = styled.button`
  width: 100%;
  height: 50px;
  color: white;
  background: gray;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

export { AppContainer, ListsContainer, TodoListContainer, ListTitleInput, AddListButton }

