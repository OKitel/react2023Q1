import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { NotFound } from './components/NotFound/NotFound';
import { Home } from './components/Home/Home';
import { About } from './components/About/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
