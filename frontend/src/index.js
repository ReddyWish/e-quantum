import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomePage/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        {/*<Route path='/placeorder' element={<PlaceOrderPage/>}/>*/}
        {/*<Route path='/order/:id' element={<OrderPage/>}/>*/}
        {/*<Route path='/profile' element={<ProfilePage/>}/>*/}
      </Route>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
