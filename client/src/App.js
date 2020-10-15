import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Link,
  HashRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./components/Home";
import ContactList from './components/ContactList';
import EditContact from './components/EditContact';
import AddContact from './components/AddContact';
import './App.css'


class App extends Component {

  render(){
    return (
      <div>
          <Router>
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
              <Navbar.Brand as={Link} to="/">
                Contact Management App
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
              <Nav.Item>
                <Nav.Link as={Link} to="/contacts">
                Contacts
                  </Nav.Link>
              </Nav.Item>
              </Nav>
              </Navbar.Collapse>
            </Navbar>
            
            <Container>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/contacts" component={ContactList} />
                <Route
                  exact
                  path="/contacts/add"
                  component={AddContact}
                />
                <Route
                  exact
                  path="/contacts/edit/:id"
                  component={EditContact}
                />
              </Switch>
            </Container>
          </Router>
        </div>
    );
  }
  
}

export default App;
