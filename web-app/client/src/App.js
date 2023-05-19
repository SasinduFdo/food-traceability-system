import React from "react";
import Menu from "./components/UserNavbar";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import Issues from "./components/Issues";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBCol,
  MDBRow
} from "mdbreact";

function App() {
  return (
    <>
      <Router>
        <div
          style={{
            background: "linear-gradient(90deg, #846fed, #94ddf9, #bfffd8)",
            width: "100vw",
            height: "100vh",
            margin: "auto",
          }}
        >
          <MDBContainer
            fluid
            style={{
              margin: "auto",
              width: "100vw",
              height: "100vh",
              overflowX: "hidden",
              paddingTop: 150,
            }}
          >
            <MDBCard style={{ margin: "auto", width: 1000, minHeight: 500 }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    style={{
                      width: "285px",
                      maxWidth: "285px",
                      height: "auto",
                    }}
                  >
                    <Menu />
                  </MDBCol>
                  <MDBCol>
                    <Switch>
                      <Route path="/" component={Home} exact />
                      <Route path="/Login" component={Login} exact />
                      <Route path="/Admin" component={Admin} exact />
                      <Route path="/Issue" component={Issues} exact />
                      <Route path="/Register" component={Register} exact />
                    </Switch>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <div style={{margin:"auto", textAlign:"center",paddingTop:15}}>{localStorage.getItem('role') ? (<div>Current User</div>):null}{localStorage.getItem('role')}</div>
          </MDBContainer>
        </div>
      </Router>
    </>
  );
}

export default App;
