import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { notification } from "antd";
import Appbar from "./AppBar";

export default function UpdatePlasmAvailability() {
  const [emailId, setEmailId] = useState("");

  const [availability, setAvailability] = useState();

  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [state, setState] = useState(false);

  function sendData(){
    axios.post('http://52.192.229.82/api/plasma/getemail?email='+emailId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function verifyValues() {
    setLoading(true);
    if (emailId === "") {
      openNotificationWithIconforBlankValues("error");
      setLoading(false);
      return false;
    }
    var emailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailCheck.test(emailId) === false) {
      openNotificationWithIconforEmail("error");
      setLoading(false);
      return false;
    }
    axios
      .post('http://52.192.229.82/api/plasma/getemail?email='+emailId)
      .then((resp) => {
        setLoading(false);
        setAvailability(resp.data.availability);
        setState(true);
      })
      .catch((err) => {
        setLoading(false);
        openNotificationWithIconforEmail("error");
      });
  }
  
  const openNotificationWithIconforEmail = (type) => {
    notification[type]({
      message: "Invalid Email",
      description:
        "Email Address you have entered seems to be invalid. Please check your email address and try again.",
    });
  };
  const openNotificationWithIconforSuccessAvailability = (type) => {
    notification[type]({
      message: "Successfully updated Availability",
      description:
        "We have successfully updated the availability for your email address",
    });
  };
  const openNotificationWithIconforError = (type) => {
    notification[type]({
      message: "Update Failed",
      description:
        "Error occured when updating the availability. Please try again later",
    });
  };
  function updateValues() {
    axios
      .post("http://52.192.229.82/api/plasma/updateavailibility?email=ameychilka@gmail.com&availibility=1")
      .then((resp) => {
        setLoading(false);
        setShowIcon(true)
        openNotificationWithIconforSuccessAvailability("success");
      })
      .catch((err) => {
        setLoading(false);
        openNotificationWithIconforError("error");
      });
  }

  const openNotificationWithIconforBlankValues = (type) => {
    notification[type]({
      message: "Empty Fields",
      description:
        "Empty Fields are not accepted. Please try again with Valid Information.",
    });
  };

  return (
    <div>
      <Appbar />
      <br />
      {!showIcon ? 
      <>
      <div className="App">
        {!state ? (
          <>
            <div>
              <center>
                <h2>Enter registered Email Address</h2>
                </center>
              <TextField
                style={{ width: "18rem", margin: "1rem" }}
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                onChange={(e) => setEmailId(e.target.value)}
              />
              <br />
              {!loading ? (
                <>
                  <Button
                    style={{ margin: "1rem" }}
                    variant="contained"
                    color="primary"
                    onClick={verifyValues}
                  >
                    Send
                  </Button>
                </>
              ) : (
                <center>
                  <CircularProgress />
                </center>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ margin: "2rem", marginTop: "4rem" }}>
              <FormControlLabel
              control={
                <Checkbox
                defaultChecked={availability === 0 ? true : false }
                name="Availability"
                color="primary"
                onChange={() => setAvailability(0)}
              />
              }
              label="Unselect the checkbox if you have lost Plasma Availability"
              style={{fontSize:"10px",textAlign:"left",width:"20rem",margin:"1rem"}} 
            />
              <br />
              <Button
                style={{ margin: "1rem" }}
                variant="contained"
                color="primary"
                onClick={updateValues}
              >
                Send
              </Button>
            </div>
          </>
        )}
      </div>
      </>
      :
      <>
        <center>
       <span style={{fontSize:"18px",color:"green",margin:"1rem",marginTop:"4rem"}}> Successfully Updated Availability of Plasma<DoneAllIcon/></span>
          </center>
      </>}
    </div>
  );
}
