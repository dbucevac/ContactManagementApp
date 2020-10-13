import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,
Label, Input } from 'reactstrap';
import Axios from '../apis/Axios';

class EditContactModal extends Component{

    constructor(props) {
        super(props);

        let contact = {
            name: "",
            phoneNumber: "",
            email: ""
          };
      
          this.state = {
            contactId: this.props.contactId,
            contact: contact,
          };

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
        Axios.put("contacts/" + this.state.contactId, this.state.contact)
          .then(() => {
            console.log('Darko bravo legendo')
          })
          .catch(() => alert("Something went wrong!"));
      }

    toggle = () => {
        this.props.toggle()
    }

    render(){
        return(
            <Modal isOpen={this.props.modal} toggle={this.toggle} className="edit-modal">
                <ModalHeader toggle={this.toggle}>Edit Contact</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Contact Name</Label>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                value={this.state.contact.name}
                                onChange={(e) => {
                  this.valueInputChanged(e);
                }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phoneNumber">Phone Number</Label>
                                <Input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={this.state.contact.phoneNumber}
                                onChange={(e) => {
                  this.valueInputChanged(e);
                }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                type="text"
                                name="email"
                                id="email"
                                value={this.state.contact.email}
                                onChange={(e) => {
                  this.valueInputChanged(e);
                }}
                                />
                            </FormGroup>
                            <Button color="primary" block onClick={() => this.doEdit()}>Edit</Button>
                        </Form>
                    </ModalBody>
            </Modal>
        )
    }
        

}

export default EditContactModal;