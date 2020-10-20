import React from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import Axios from '../apis/Axios';
import style from './contact.module.css'

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    let contact = {
      name: "",
      phoneNumber: "",
      email: ""
    };

    this.state = {
      contact: contact,
      errors: [],
      show: false
    };
  }

  valueInputChanged(e) {
    let input = e.target;

    let name = input.name;
    let value = input.value;

    let contact = this.state.contact;
    contact[name] = value;

    this.setState({ contact: contact });
  }

  doAdd() {
    let response = Axios.post("/contacts/add", this.state.contact)
      .then(()=> {
        this.setState({show: true, errors: []})
      })
      .then(() => {
        setTimeout(()=>{
          this.props.history.push("/contacts")
        }, 1500)
        
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data.errors
        })
      });
  }

  cancel(){
    this.props.history.push("/contacts")
  }

  render() {
  const errors = this.state.errors.length !== 0 ? this.state.errors.map((error, index)=>{
    return <Alert key={index} variant="danger">{error.data}</Alert>
  }): null;

  const success = this.state.show ? <Alert variant="success">Contact successfully added!</Alert>: null;
      return (
        <div className={style.divForm}>
          <h1>Add contact</h1>
          <Form>
            <Form.Group as={Row} className="justify-content-center">
              <Col sm={6}>
              <Form.Label>Name</Form.Label>
              
              <Form.Control
                name="name"
                placeholder="Full name"
                className={style.inputForm}
                as="input"
                value={this.state.contact.name}
                onChange={(e) => {
                  this.valueInputChanged(e);
                }}
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="justify-content-center">
            <Col sm={6}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                placeholder="Phone number"
                className={style.inputForm}
                as="input"
                value={this.state.contact.phoneNumber}
                onChange={(e) => this.valueInputChanged(e)}
              />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="justify-content-center">
            <Col sm={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                placeholder="Email address"
                className={style.inputForm}
                as="input"
                value={this.state.contact.email}
                onChange={(e) => this.valueInputChanged(e)}
              />
              </Col> 
            </Form.Group>
            <Button className={style.btnForm} variant="success" onClick={() => this.doAdd()}>Save</Button>
            <Button className={style.btnForm} variant="danger" onClick={() => this.cancel()}>Cancel</Button>
          </Form>
          <div style={{marginTop:"20px"}}>
          {errors}
          {success}
          </div>
        </div>
      );
    }
}

export default AddContact;
