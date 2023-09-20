import Header from "./components/Header";
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          <Outlet/>
        </Container>
        <Footer/>
      </main>
    </>
  );
}

export default App;
