import React from "react";
import { Link } from 'react-router-dom'

import { Navbar, Nav} from 'react-bootstrap';


function NavAfterLogin() {

  return (


  <Navbar  className="nav-color" expand="lg">
    <Link to = "/dashboard" className="col"><img height="60px" width="120px" src="medbuddylogo.png" alt="logo"/></Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto" id="nav-loging"> 
          <Link to = "/dashboard" className="text-light col">Dashboard</Link>   
          <Link to ="/mymedications" className="text-light col-md-auto">My Medications</Link>  
          <Link to = "/addmedications"className="text-light col-md-auto" >Add Medications</Link>               
    </Nav>
      <Nav.Link href = "/" className="text-light logout mr-3 col-md-auto" id="logout">Logout</Nav.Link> 
  </Navbar.Collapse> 
     
</Navbar>
    
  )

}

export default NavAfterLogin;