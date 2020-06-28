
import React from 'react'
import Header from './Components/Header'
import Home from './Components/Home'
import ConfDesp from './Components/ConfDesp'
import SideMenu from './Components/SideMenu'
import Invoice from './Components/Invoice'
import Error from './Components/Error'
import { Route, Switch } from "react-router-dom"
import Login from './Components/Login'
import { PrivateRoute } from './Components/PrivateRoute'
import CustWklyDesps from './Components/CustWklyDesps/CustWklyDesps'

function App() {
  
  return (
    <div className="App222">
      <Header />

      <div id = "middle" >
        <Switch>
          <PrivateRoute path="/" component={Home} exact />
          <PrivateRoute path="/confdesp" component={ConfDesp} />
          <PrivateRoute path="/custwklydesps" component={CustWklyDesps} />
          <PrivateRoute path="/invoice" component={Invoice} />
          <Route path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </div>

    </div>
  );
}

export default App;


//Old code ----------------------------------------------

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
