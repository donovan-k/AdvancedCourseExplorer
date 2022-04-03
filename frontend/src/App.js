import { Fragment } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { UserInputPage } from './pages/UserInputPage';
import { CoursePage } from './pages/CoursePage';
import { SectionPage } from './pages/SectionPage';

function App() {

  const { pathname }  = useLocation();

  const shouldShowNavbar = () => pathname !== '/login';

  return (
    <Fragment>
      {shouldShowNavbar() && <Navbar />}
      <Routes>
        <Route path="search" element={<UserInputPage />} />
        <Route path="courses" element={<CoursePage />} />
        <Route path="sections" element={<SectionPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
