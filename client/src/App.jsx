import Home from './home/Home';
import Service from './service/service';
import About from './about_us/adout';
import Login from './login/login';
import Register from './templates/Register';

import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
