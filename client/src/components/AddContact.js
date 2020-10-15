import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Axios from '../apis/Axios';

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    let contact = {
      name: "",
      phoneNumber: "",
      email: ""
    };

    this.state = {
      contact: contact
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
    Axios.post("/contacts/add", this.state.contact)
      .then(() => {
        this.props.history.push("/contacts");
      })
      .catch(() => {
        alert('Something went wrong')
      });
  }

  render() {
      return (
        <div>
          <h1>Add contact</h1>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                as="input"
                value={this.state.contact.name}
                onChange={(e) => {
                  this.valueInputChanged(e);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                as="input"
                value={this.state.contact.phoneNumber}
                onChange={(e) => this.valueInputChanged(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                as="input"
                value={this.state.contact.email}
                onChange={(e) => this.valueInputChanged(e)}
              />
            </Form.Group>
            <Button onClick={() => this.doAdd()}>Add</Button>
          </Form>
        </div>
      );
    }
}

export default AddContact;
