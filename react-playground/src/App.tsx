import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { NotFound } from './components/pages/NotFound/NotFound';
import { Home } from './components/pages/Home/Home';
import { About } from './components/pages/About/About';
import './App.css';

export class App extends React.Component {
  render() {
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
}

export default App;
