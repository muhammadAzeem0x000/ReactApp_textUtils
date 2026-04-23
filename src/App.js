import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Alert from './components/Alerts';
import TextForm from './components/TextForm';
import About from './components/About';
import WriteProposal from './components/WriteProposal';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Navbar title="UpworkUtils" aboutText="About" />
        <Alert />
        <div className="container my-3">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/write-proposal" element={<WriteProposal />} />
            <Route path="/" element={<TextForm heading="Enter the text to analyze" />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
