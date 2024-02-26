import { React, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home'
import Setting from './components/Setting/Setting'
import AllCategory from './components/AllCategory/AllCategory'
import Calculator from './components/Calculator/Calculator'
import DateAndTime from './components/DateAndTime/DateAndTime'

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
        <Routes>


          <Route path="/" element={<Home />}></Route>

          {/***************  setting section ***************/}
          <Route path="/setting" element={<Setting />}></Route>


          {/***************  category section ***************/}
          <Route path="/allCategory" element={<AllCategory />}></Route>

          {/* general */}
          <Route path="/calculator/percentageCalculator" element={<Calculator />}></Route>
          <Route path="/calculator/bmiCalculator" element={<Calculator />}></Route>
          <Route path="/calculator/numberToWordConverter" element={<Calculator />}></Route>
          {/* date and time */}
          <Route path="/dateAndTime/durationBetweenTwoDates" element={<DateAndTime />}></Route>
          <Route path="/dateAndTime/ageCaculator" element={<DateAndTime />}></Route>
          <Route path="/dateAndTime/weekDayCalculator" element={<DateAndTime />}></Route>
          <Route path="/dateAndTime/dateAddSubtract" element={<DateAndTime />}></Route>


        </Routes>
      </Router>
    </>
  )
}

export default App