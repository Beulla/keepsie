
import { BrowserRouter as Router,Route,Routes,Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotesPage from './pages/NotesPage';
import ListNotesPage from './pages/ListNotesPage';
import ForgotPage from './pages/ForgotPage';
import ResetPage from './pages/ResetPage';
import LandingPage from './pages/LandingPage';
function App() {
  return (
    
    <Router>
      <switch>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
          <Route exact path="/notes" element={<NotesPage></NotesPage>}></Route>
          <Route exact path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route exact path="/createAccount" element={<SignUpPage></SignUpPage>}></Route>
          <Route exact path="/all/notes" element={<ListNotesPage></ListNotesPage>}></Route>
          <Route exact path="/forgot" element={<ForgotPage></ForgotPage>}></Route>
          <Route path="/reset" element={<ResetPage></ResetPage>}></Route>
        </Routes>
      </switch>
    </Router>
  );
}

export default App;
