import "./App.css";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import About from './About';
import Notfound from './NotFound';

function App() {
  const [searchString, setSearchString] = useState("");
  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
 
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Borough"
              className="mr-sm-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col md={12}>
            <Switch>
            <Route exact path="/" render={()=>(<Redirect to="/restaurants"/>)} />
            <Route exact path="/about" render={()=>(<About/>)} /> 
            <Route exact path="/restaurants" render={(props)=>(<Restaurants query={props.location.search}/>)} />
              <Route path="/restaurant/:id" render={(props)=>(<Restaurant id={props.match.params.id}/>)} />
              <Route render={()=>(<Notfound />)} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
