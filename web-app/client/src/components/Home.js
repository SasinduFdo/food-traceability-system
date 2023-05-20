import "./CSS/home.css";
import React, { useState } from "react";
import {
  MDBCardBody,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCardText,
} from "mdbreact";
import axios from "axios";
import { Button,  Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const API_URL = "http://localhost:6500/request/viewProduct";

const Home = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [Identifier, setIdentifier] = useState("");
  const [load, setLoad] = useState(false);
  const [data, setData] = useState("");
  const [view, setView] = useState(false);

  const dataView = [
    {
      label: "Farm Information",
    },
    {
      label: "Processing Information",
    },
    {
      label: "Storage Information",
    },
    {
      label: "Logistics Information",
    },
  ];

  const HandleProductInfo = async () => {
    setError("");
    setLoad(true);
    if (Identifier) {
      await axios
        .post(API_URL, { identifier: Identifier })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200 && response.data.message === "success") {
            setLoad(false);
            console.log(response.data.result)
            setData(response.data.result);
            setView(true);
          } else if (response.data.message === "invalid") {
            setLoad(false);
            setError("Invalid Product Identification Number");
            setIdentifier("");
          }
        })
        .catch((err) => {
          setLoad(false);
          setIdentifier("");
          console.log(err.message);
          setError("An Error Occurred!!.\nPlease Try Again.");
        });
    } else {
      setError("Please Fill out ALL Fields!!");
      setLoad(false);
    }
  };

  //Display Data
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Modal
        size="lg"
        show={view}
        onHide={() => setView(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Product History of {Identifier}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBRow>
            <MDBCol>
              {" "}
              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {dataView.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography variant="caption">
                             
                            </Typography>
                          ) : null
                        }
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Typography>
                          {data ? (
                            <>
                              {step.label === "Farm Information" ? (
                                <>
                                Farm Name : {data.farm_info.farming_company}{" "}
                                  <br />
                                  Farm Location : {data.farm_info.location}{" "}
                                  <br />
                                  Rice Type : {data.farm_info.crop}
                                  <br />
                                  Harvested Date : {data.farm_info.harvest_date}
                                </>
                              ) : null}
                              {step.label === "Processing Information" ? (
                                <>
                                  Processing Company :{" "}
                                  {data.processing_info.milling_company} <br />
                                  Processing Date :{" "}
                                  {data.processing_info.milling_date} <br />
                                  Processing Method :{" "}
                                  {data.processing_info.milling_method} <br />
                                </>
                              ) : null}
                              {step.label === "Storage Information" ? (
                                <>
                                  Storage Company :{" "}
                                  {data.storage_info.storage_company} <br />
                                  Stored Temperature :{" "}
                                  {data.storage_info.storage_temperature} <br />
                                  Stored Duration :{" "}
                                  {data.storage_info.storage_duration} <br />
                                </>
                              ) : null}
                              {step.label === "Logistics Information" ? (
                                <>
                                  Logistics Company :{" "}
                                  {data.logistics_info.transportation_company}{" "}
                                  <br />
                                  Transportation Method :{" "}
                                  {
                                    data.logistics_info.transportation_method
                                  }{" "}
                                  <br />
                                  Date :{" "}
                                  {data.logistics_info.transportation_date}{" "}
                                  <br />
                                  Destination :{" "}
                                  {data.logistics_info.destination} <br />
                                  Temperature (During Transportation) :{" "}
                                  {
                                    data.logistics_info
                                      .transportation_temperature
                                  }{" "}
                                  <br />
                                  Duration :{" "}
                                  {
                                    data.logistics_info.transportation_duration
                                  }{" "}
                                  <br />
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === dataView.length - 1
                                ? "Done"
                                : "View Next"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === dataView.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>End of Product Information History</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      View Agin
                    </Button>
                  </Paper>
                )}
              </Box>
            </MDBCol>
            <MDBCol>
              {data ? (
                <>
                  <div style={{textAlign:"center"}}>Safety Messages</div><br/>
                  {data.safety_message.message === "" ? (
                    <>
                      <Alert severity="info">
                        NO reported issues.
                      </Alert>
                    </>
                  ) : null}
                  {data.safety_message.message !== "" ? (
                    <>
                      <Alert severity="error">
                        {data.safety_message.message}
                      </Alert>
                    </>
                  ) : null}
                  <br/>
                  <div style={{textAlign:"center"}}>Product Certifications and Inspection Information</div><br/>
                  {data.certification_and_inspection_info.organic_certification ? (
                    <>
                      <Alert variant="filled" severity="success">
                        Organic Certificate 
                      </Alert>
                    </>
                  ) : (<>
                    <Alert variant="filled" severity="warning">
                      Organic Certificate (Not Certified as Organic)
                    </Alert>
                  </>)}
                    <br/>
                  {data.certification_and_inspection_info.fair_trade_certification ? (
                    <>
                      <Alert variant="filled" severity="success">
                      Fair Trade Certificate 
                      </Alert>
                    </>
                  ) : (<>
                    <Alert variant="filled" severity="warning">
                    Fair Trade Certificate (Not Certified as Fair Trade)
                    </Alert>
                  </>)}
                  <br/>
                  {data.certification_and_inspection_info.third_party_inspection.type !== "" ? (
                    <>
                      <Alert variant="filled" severity="info">
                      Inspection : {data.certification_and_inspection_info.third_party_inspection.type} : {data.certification_and_inspection_info.third_party_inspection.result}
                      </Alert>
                    </>
                  ) : (<>
                    <Alert variant="filled" severity="warning">
                    Inspection Data Unavailable 
                    </Alert>
                  </>)}

                </>
              ) : null}
            </MDBCol>
          </MDBRow>
        </Modal.Body>
      </Modal>

      <MDBCardBody>
        <h3
          className="dark-grey-text mb-5 "
          style={{
            fontFamily: "Tilt Neon, cursive",
            textAlign: "center",
          }}
        >
          <strong>Track you Product History</strong>
        </h3>
        <div style={{ width: "80%", textAlign: "center", margin: "auto" }}>
          <MDBCardText>
            You can find the Product Identification Number on the packaging.
            (123XXXXXXXXXXX)
          </MDBCardText>
          <MDBInput
            label="Identification Number"
            type="text"
            onChange={(e) => setIdentifier(e.target.value)}
            value={Identifier}
          />
          <div>{error ? 
          <Alert severity="warning">{error}</Alert>: ""}</div>
          <div>{message ? 
          <Alert severity="info">{message}</Alert>: ""}</div>
          <Button
            type="button"
            gradient="blue"
            onClick={HandleProductInfo}
            disabled={!Identifier || load}
          >
            <div>
              {load ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Search"
              )}
            </div>
          </Button>
        </div>
      </MDBCardBody>
    </>
  );
};

export default Home;
