import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from './constants/Routes';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Todo from './pages/TodoList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path={ROUTES.SIGNUP} element={<SignUp />}></Route>
        <Route path={ROUTES.SIGNIN} element={<SignIn />}></Route>
        <Route path={ROUTES.TODOLIST} element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
