import React from 'react';
import style from './home.module.css';

class Home extends React.Component {
  render() {
    return (
    <div className={style.content}>
      <h1>Welcome to Contact Management App!</h1>
    </div>
    )
  }
}


export default Home;