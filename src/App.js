import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Alert from './components/Alerts';
import TextForm from './components/TextForm';
import About from './components/About';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Navbar title="TextUtils" aboutText="About" />
        <Alert />
        <div className="container my-3">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<TextForm heading="Enter the text to analyze" />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
