import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Alert from './components/Alerts';
import TextForm from './components/TextForm';
import WriteProposal from './components/WriteProposal';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Navbar title="UpworkUtils" />
        <Alert />
        <div className="container my-3">
          <Routes>
            <Route path="/write-proposal" element={<WriteProposal />} />
            <Route path="/" element={<TextForm heading="Enter the text to analyze" />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
