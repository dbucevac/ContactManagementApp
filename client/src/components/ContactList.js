import React, {Component} from 'react';
import {Container, Table, Button} from 'reactstrap';
import { v4 as uuid } from 'uuid';
import Axios from '../apis/Axios';
import EditContactModal from './EditContactModal';


class ContactList extends Component {

    constructor(props){
        super(props);

        this.state={
            selectedContact: '',
            showModal: false,
            contacts: []
        }

    }
    

    componentDidMount(){
        this.getContacts();
    }

    getContacts() {
        Axios.get('/contacts')
            .then(res => {
                this.setState({contacts: res.data});
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error occured please try again!');
             });
    }

    async doDelete(contactId){
        try{
          await Axios.delete("/contacts/" + contactId);
          this.getContacts();
        }
        catch(error){
          alert("Couldn't delete the contact");
        }
    }

    toggle = (contactId) =>{
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    render(){
        return(
            <Container>
                <Button 
                className="add-btn"
                color="success"
                onClick={()=>{

                }}>Add Contact</Button>
                <Table dark hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Contact Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.contacts.map((contact,index)=>{
                        return(
                        <tr key={contact._id}>
                        <th scope="row">{index+1}</th>
                        <td>{contact.name}</td>
                        <td>{contact.phoneNumber}</td>
                        <td>{contact.email}</td>
                        <td>
                            <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={()=>{
                                this.doDelete(contact._id)
                            }}><ion-icon name="trash-sharp"></ion-icon></Button>
                            {' '}<Button
                            className="edit-btn"
                            color="warning"
                            size="sm"
                            onClick={()=>{
                                this.toggle(contact._id)
                            }}><ion-icon name="pencil-sharp"></ion-icon></Button>
                        </td>
                        </tr>
                        );
                    })}
                </tbody>
                </Table>
                <EditContactModal
                    modal={this.state.showModal}
                    toggle = {this.toggle}
                    contactId={this.state.selectedContact}
                />

            </Container>
        );
    }
}

export default ContactList;