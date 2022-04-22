import { Fragment } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { UserInputPage } from './pages/UserInputPage';
import { SectionPage } from './pages/SectionPage';
import { CoolQueriesPage } from "./pages/CoolQueries";
import { ResultsPage } from "./pages/ResultsPage";
import { LoginInPage } from "./pages/LoginInPage";
import {useState, useEffect} from "react";
import axios from "axios";

import './pages/CoursePage.css';

function App() {

  const { pathname }  = useLocation();
  const navigate = useNavigate();

  const shouldShowNavbar = () => pathname !== '/login';

  const [inputs, setInputs] = useState([]);

  useEffect( () => {
      const fetchData = async () => {
          let updated_inputs = []
          await axios.get('/api/userinputs/')
            .then(async res => {
                console.log(res.data);
                setInputs(res.data);
            }).catch(err => {
            });
      }
      fetchData();
  }, []);


  return (
      <div>
          <Fragment>
            {shouldShowNavbar() && <Navbar />}
            <Routes>
                <Route path="search" element={<UserInputPage />} />
                <Route path="sections" element={<SectionPage />} />
                <Route path="coolqueries" element={<CoolQueriesPage />} />
                <Route path="results"  element={<ResultsPage />} />
                <Route path="login" element={<LoginInPage />} />
            </Routes>
          </Fragment>
          <h2 style={{ margin: 'auto', textAlign: 'center'}}>History Of User Inputs</h2>
          <table style={{ margin: 'auto'}} className="course-page">
                 <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Interests</th>
                    <th>Avg GPA</th>
                    <th>Favorite Professor</th>
                    <th>Course Requirement</th>
                 </tr>
                    {inputs.map(user_input => (
                        // make sure naming of these keys is the same as backend
                        // will say undefined otherwise
                        <tr onClick={() => navigate('/search', { state: { user_input }})} key={user_input.id}>
                            <td>{user_input.id}</td>
                            <td>{user_input.username}</td>
                            <td>{user_input.interests}</td>
                            <td>{user_input.avg_gpa}</td>
                            <td>{user_input.fav_professor}</td>
                            <td>{user_input.course_req}</td>
                        </tr>
                    ))}
            </table>
      </div>
  );
}

export default App;
