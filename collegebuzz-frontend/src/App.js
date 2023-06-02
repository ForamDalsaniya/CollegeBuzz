import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Article from './Student/Article/Article';
import PostArticle2 from './Student/Article/PostArticle2';
import News from './News/News';
import PostNews from './News/PostNews';
import Student from './Admin/Student/Student';
import StudentList from './Faculty/Student.js/StudentList';
import Faculty from './Admin/Faculty/FacultyList';
import AdminArticle from './Admin/Article/ArticleHome';
import Event from './Faculty/Event/Event';
import Login from './Login/Login';
import StudentNews from './Student/News/News';
import AdminNews from './Admin/News/News';
import FacultyNews from './Faculty/News/News';
import HomePage from './Home';
import {ForgetPass} from './ForPass/ForgetPass';
import ResetPass from './ForPass/ResetPass';
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Login />} />
            {/* <Route index element={<HomePage />} /> */}
            <Route exact path='/student/article' element={<Article />} />
            <Route exact path='/postarticle' element={<PostArticle2 />} />
            <Route exact path='/studentnews' element={<StudentNews />} />
            <Route exact path='/postnews' element={<PostNews />} />
            <Route exact path='/students' element={<Student />} />
            <Route exact path='/faculty' element={<Faculty />} />
            <Route exact path='/articlehome' element={<AdminArticle />} />
            <Route exact path='/event' element={<Event />} />
            <Route exact path='/studentlist' element={<StudentList />} />
            <Route exact path='/adminnews' element={<AdminNews />} />
            <Route exact path='/facultynews' element={<FacultyNews />} />
            <Route exact path='/forgetpass' element={<ForgetPass />} />
            <Route exact path='/resetpass' element={<ResetPass />} />


          </Route>
        </Routes>
      </Router>
  );
}

export default App;
