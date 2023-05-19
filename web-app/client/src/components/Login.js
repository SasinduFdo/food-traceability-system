import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

const API_URL = "http://localhost:6500/request/login";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const HandleLogin = async () => {
    setError("");
    setLoad(true);
    if (username && password) {
      var User = {
        username: username,
        password: password,
      };
      await axios
        .post(API_URL, User)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200 && response.data.accessToken) {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("token", response.data.accessToken);
            setLoad(false);
            history.push("/");
            window.location.reload();
          } else if (response.data.message === "invalid") {
            setLoad(false);
            setUsername("");
            setPassword("");
            setError("Invalid Credentials!");
          }
        })
        .catch((err) => {
          setLoad(false);
          setUsername("");
          setPassword("");
          console.log(err.message);
          setError("An Error Occurred!!.\nPlease Try Again.");
        });
    } else {
      setError("Please Fill out ALL Fields!!");
      setLoad(false);
    }
  };

  return (
    <>
      <div style={{ width: "80%", margin: "auto", paddingTop: 20 }}>
        <div className="text-center">
          <h3
            className="dark-grey-text mb-5 "
            style={{ fontFamily: "Tilt Neon, cursive" }}
          >
            <strong>Login</strong>
          </h3>
        </div>
        <div>
          {error ? (
            <Alert variant="danger" style={{ textAlign: "center" }}>
              {" "}
              {error}
            </Alert>
          ) : (
            ""
          )}
        </div>
        <MDBInput
          label="Username"
          group
          type="text"
          success="right"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <MDBInput
          label="Password"
          group
          type="password"
          containerClass="mb-0"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="text-center mb-3">
          <Button
            type="button"
            gradient="blue"
            onClick={HandleLogin}
            disabled={!username || !password || load}
          >
            <div>
              {load ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
