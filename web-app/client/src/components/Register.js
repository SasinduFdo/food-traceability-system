import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import { Button, Alert, Form } from "react-bootstrap";
import Authentication from "../services/Authentication";

const API_URL = "http://localhost:6500/request/register";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const HandleRegister = async () => {
    setError("");
    setLoad(true);
    if (username && password && role) {
      let formData = new FormData();
      var User = {
        username: username,
        password: password,
        role: role,
      };
      await axios
        .post(API_URL, User, { headers: Authentication() })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            setLoad(false);
            setUsername("");
            setPassword("");
            setRole("");
            setError("Registration Successful!");
          } else if (response.data.message === "error") {
            setLoad(false);
            setUsername("");
            setPassword("");
            setRole("");
            setError("Registration Unsuccessful!");
          } else {
            setLoad(false);
            setUsername("");
            setPassword("");
            setRole("");
            setError("Registration Unsuccessful!");
          }
        })
        .catch((err) => {
          setLoad(false);
          setUsername("");
          setPassword("");
          setRole("");
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
            <strong>User Registration</strong>
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
        <Form.Label
          className="font-middle black-text"
          style={{ paddingTop: "10px" }}
        >
          User Role
        </Form.Label>
        <Form.Control
          name="type"
          as="select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option> </option>
          <option>Farmer</option>
          <option>Storage</option>
          <option>Processor</option>
          <option>Logistics</option>
          <option>Admin</option>
          <option>Certificate</option>
        </Form.Control>
        <div className="text-center mb-3" style={{ paddingTop: "10px" }}>
          <Button
            type="button"
            gradient="blue"
            onClick={HandleRegister}
            disabled={!username || !password || !role || load}
          >
            <div>
              {load ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
