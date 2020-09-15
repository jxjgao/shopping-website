import React from 'react';
import Nav from 'react-bootstrap/Nav';

const toolbar = (props) => (
    <Nav className="justify-content-end" 
            style={{
                backgroundColor: '#4DC8E9'
            }} 
            activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/home">Main Page</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">Cart</Nav.Link>
    </Nav.Item>
  </Nav>

)

export default toolbar