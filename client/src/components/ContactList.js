import React, {Component} from 'react';
import {Table, Button, Alert} from "react-bootstrap";
import Axios from '../apis/Axios';


class ContactList extends Component {

    constructor(props){
        super(props);

        this.state={
            contacts: [],
            showAlert: false
        }

    }
    

    componentDidMount(){
        this.getContacts();
    }

    handleAlert() {
        this.setState({showAlert: !this.state.showAlert})
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
          this.handleAlert();
        }
        catch(error){
          alert("Couldn't delete the contact");
        }
    }

    goToAdd() {
        this.props.history.push("/contacts/add");
    }
    

    goToEdit(contactId) {
        this.props.history.push("/contacts/edit/" + contactId);
    }

    render(){
        return(
            <div>
                <Button 
                className="add-btn"
                variant="success"
                onClick={()=>{
                    this.goToAdd();
                }}>Add Contact</Button>
                <Table variant="dark" hover striped responsive>
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
                            variant="danger"
                            size="sm"
                            onClick={()=>{
                                this.doDelete(contact._id)
                            }}><ion-icon name="trash-sharp"></ion-icon></Button>
                            {' '}<Button
                            className="edit-btn"
                            variant="warning"
                            size="sm"
                            onClick={()=>{
                                this.goToEdit(contact._id)
                            }}><ion-icon name="pencil-sharp"></ion-icon></Button>
                        </td>
                        </tr>
                        );
                    })}
                </tbody>
                </Table>
                <Alert show={this.state.showAlert} key="1" variant="success" 
                onClose={()=> this.handleAlert()} dismissible>
    Contact deleted successfully!
  </Alert>
            </div>
        );
    }
}

export default ContactList;