import { React, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home'
import ScrollToTop from './components/ScrollToTop';
import Setting from './components/Setting/Setting'
import AllCategory from './components/AllCategory/AllCategory'
import Calculator from './components/Calculator/Calculator'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  var selectedTheme = localStorage.getItem('selectedTheme');

  useEffect(() => {
    if (selectedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>


          <Route path="/" element={<Home />}></Route>
          <Route path="/setting" element={<Setting />}></Route>



          <Route path="/allCategory" element={<AllCategory />}></Route>
          <Route path="/calculator/percentageCalculator" element={<Calculator />}></Route>
          <Route path="/calculator/bmiCalculator" element={<Calculator />}></Route>


        </Routes>
      </Router>
    </>
  )
}

export default App