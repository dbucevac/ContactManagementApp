import React, {Component} from 'react';
import {Container, Table, Button} from 'reactstrap';
import { v4 as uuid } from 'uuid';


class ContactList extends Component {

    state={
        contacts: [
            {id: uuid(), name:'Milka', phone: '065889775', email: 'milka@gmail.com'},
            {id: uuid(), name:'Dragica', phone: '066855996', email: 'dragica998@gmail.com'},
            {id: uuid(), name:'Nikolica', phone: '060235188', email: 'nikolica@gmail.com'}
        ]
    }

    render(){
        const {contacts} = this.state;
        return(
            <Container>
                <Button 
                color="dark"
                style={{marginBottom:'2rem', marginTop: '2rem'}}
                onClick={()=>{

                }}>Add Contact</Button>
                <Table dark>
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
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td>
                            <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={()=>{
                                this.setState(state =>({
                                    contacts: state.contacts.filter(item=>item.id !== contact.id)
                                }));
                            }}>&times;</Button>
                        </td>
                        </tr>
                        );
                    })}
                </tbody>
                </Table>
            </Container>
        );
    }
}

export default ContactList;