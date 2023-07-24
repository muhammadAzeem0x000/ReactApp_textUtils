import { useState } from 'react';
import './App.css';
import Alerts from './components/Alerts';
import About from './components/About';
import Navbar from './components/navbar'
import TextForm from './components/TextForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [mode, setMode] = useState('light');

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#618282';
      showAlert("Dark mode is enabled", "Success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode is enabled", "Success");
    }
  }

  return (
    <>
    <Router>
      <Navbar mode={mode} toggleMode={toggleMode} title="TextUtils" aboutText="About"/>
        <div className="container my-3">
        <Alerts alert={alert}/>
      <Routes>
            <Route exect path="/about" element={<About mode={mode}/>}></Route>
            <Route exect path="/" element={<TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert}/>}></Route>
      </Routes>
        </div>
    </Router>
    </>
  );
}

export default App;
