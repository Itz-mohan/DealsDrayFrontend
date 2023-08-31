import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Routes
import indexRoutes from './routes';
import Header from './components/Header';

//Setting Routes
const Routing = indexRoutes.map((route, i) => {
  return <Route key={i} path={route.path} element={<route.component />} />;
});

function App() {
  return (
    <Router>
      <Header />
      <Routes>{Routing}</Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
