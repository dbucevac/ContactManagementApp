import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar'
import ContactList from './components/ContactList'



class App extends Component {

  render(){
    return (
      <div className="App">
        <AppNavbar/>
        <ContactList/>
      </div>
    );
  }
  
}

export default App;
