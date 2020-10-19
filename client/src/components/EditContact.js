import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Axios from '../apis/Axios';

class EditContact extends React.Component {
  constructor(props) {
    super(props);

    let contact = {
      name: "",
      phoneNumber: "",
      email: ""
    };

    this.state = {
      contactId: this.props.match.params.id,
      contact: contact,
      errors: [],
      show: false
    };
  }

  componentDidMount() {
      this.getContact();
  }



  getContact() {
    Axios.get("/contacts/" + this.state.contactId)
      .then((res) => {
        this.setState({ contact: res.data });
      })
      .catch((res) => {
        alert("Error occured please try again!");
      });
  }

  valueInputChanged(e) {
    let input = e.target;

    let name = input.name;
    let value = input.value;

    let contact = this.state.contact;
    contact[name] = value;

    this.setState({ contact: contact });
  }

  doEdit() {
    Axios.post("/contacts/edit/" + this.state.contactId, this.state.contact)
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
  
    const success = this.state.show ? <Alert variant="success">Contact successfully edited!</Alert>: null;

      return (
        <div>
          <h1>Edit contact</h1>
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
            <Button variant="success" onClick={() => this.doEdit()}>Save</Button>
            <Button variant="danger" onClick={() => this.cancel()}>Cancel</Button>
          </Form>
          <div style={{marginTop:"20px"}}>
          {errors}
          {success}
          </div>
        </div>
      );
    }
}

export default EditContact;
