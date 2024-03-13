import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, Register, PageNotFound } from './pages';

const App = () => {
  return (
    <main className="bg-main">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
