import Header from "./components/Header";
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          <Outlet/>
        </Container>
        <Footer/>
        <ToastContainer/>
      </main>
    </>
  );
}

export default App;
