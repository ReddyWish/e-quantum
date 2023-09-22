import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function CheckoutSteps({ step1, step2, step3, step4, orderPlaced }) {
  const step1Completed = localStorage.getItem('userInfo');
  const step2Completed = JSON.parse(localStorage.getItem('cart')).shippingAddress;
  console.log(step2Completed)
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
            <LinkContainer to='/login'>
              {step1Completed ? <Nav.Link>🟢Sign In</Nav.Link> : <Nav.Link>⚪Sign In</Nav.Link>}
            </LinkContainer>
          )
          : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
            <LinkContainer to='/shipping'>
              {step2Completed ? <Nav.Link>🟢Shipping</Nav.Link> : <Nav.Link>⚪️Shipping</Nav.Link>}
            </LinkContainer>)
          : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
            <LinkContainer to='/payment'>
              {step2Completed ? <Nav.Link>🟢Payment</Nav.Link> : <Nav.Link>⚪Payment</Nav.Link>}
            </LinkContainer>)
          : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
            <LinkContainer to='/placeorder'>
              {orderPlaced ? <Nav.Link>🟢Place Order</Nav.Link> : <Nav.Link>⚪Place Order</Nav.Link>}
            </LinkContainer>)
          : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
      </Nav.Item>
    </Nav>
  );
}
// 🟢
export default CheckoutSteps;