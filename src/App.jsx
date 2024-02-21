import {React , useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home'
import Setting from './components/Setting/Setting'
import AllCategory from './components/AllCategory/AllCategory'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>


          <Route path="/" element={<Home />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/allCategory" element={<AllCategory />}></Route>

        </Routes>
      </Router>
    </>
  )
}

export default App