import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.css';
import Header from './components/Header';
import ContactsPage from './pages/ContactsPage';
import HomePage from './pages/HomePage';
import CreateContactPage from './pages/CreateContactPage';
import ContactDetailsPage from './pages/ContactDetailsPage';
import EditContactPage from './pages/EditContactPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/contacts/new" element={<CreateContactPage />} />
            <Route path="/contacts/:id" element={<ContactDetailsPage />} />
            <Route path="/contacts/:id/edit" element={<EditContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
