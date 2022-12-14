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
import { Link } from "react-router-dom";

export default function PostDonorsList() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [availability, setAvailability] = useState(0);
  const [eligibility, setEligibility] = useState(0);

  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  function verifyValues() {
    setLoading(true);
    if (fullName === "") {
      openNotificationWithIconforBlankValues("error");
      setLoading(false);
      return false;
    }
    if (age === "") {
      openNotificationWithIconforBlankValues("error");
      setLoading(false);
      return false;
    }
    if (bloodGroup === "") {
      openNotificationWithIconforBlankValues("error");
      setLoading(false);
      return false;
    }
    if (contactNo === "") {
      openNotificationWithIconforBlankValues("error");
      setLoading(false);
      return false;
    }
    if (contactNo.length !== 10) {
      openNotificationWithIconforPhone("error");
      setLoading(false);
      return false;
    }
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
    if (availability === 0) {
      openNotificationWithIconforblankticks("error");
      setLoading(false);
      return false;
    }
    if (eligibility === 0) {
      openNotificationWithIconforblankticks("error");
      setLoading(false);
      return false;
    }
    submitData();
  }

  function submitData() {
    axios
      .post("http://52.192.229.82/api/addplasmadonors", {
        fullName,
        age,
        bloodGroup,
        contactNo,
        emailId,
        availability,
        eligibility,
      })
      .then((resp) => {
        setLoading(false);
        openNotificationWithIconSuccess("success");
        setShowIcon(true);
      })
      .catch((err) => {
        setLoading(false);
        openNotificationWithError("error");
      });
  }
  const openNotificationWithIconforPhone = (type) => {
    notification[type]({
      message: "Invalid Mobile Number",
      description:
        "Mobile Number you have entered seems to be invalid. Please check your mobile number and try again.",
    });
  };
  const openNotificationWithIconforEmail = (type) => {
    notification[type]({
      message: "Invalid Email",
      description:
        "Email Address you have entered seems to be invalid. Please check your email address and try again.",
    });
  };
  const openNotificationWithIconforblankticks = (type) => {
    notification[type]({
      message: "Tick Checkboxes",
      description:
        "Read the eligibility conditions and tick the checkboxes above mentioned",
    });
  };
  const openNotificationWithIconforBlankValues = (type) => {
    notification[type]({
      message: "Empty Fields",
      description:
        "Empty Fields are not accepted. Please try again with Valid Information.",
    });
  };
  const openNotificationWithIconSuccess = (type) => {
    notification[type]({
      message: "Successfully Submitted",
      description:
        "You will be notified once we upload this product on our website.",
    });
  };
  const openNotificationWithError = (type) => {
    notification[type]({
      message: "Failed Submission",
      description: "Please try again later.",
    });
  };

  return (
    <div>
      <Appbar />
      <br />
      <div className="headsinposts">
        You are kindly requested to carefully read the Eligibility criteria
        rules <Link to="/eligibility">Here</Link> and then proceed to fill up
        the form.
      </div>

      <div className="App">
        <TextField
          style={{ width: "18rem", margin: "1rem" }}
          id="outlined-basic"
          label="Donor Full Name"
          variant="outlined"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName ? fullName : null}
        />
        <br />
        <TextField
          style={{ width: "18rem", margin: "1rem" }}
          id="outlined-basic"
          label="Donor Age"
          type="number"
          variant="outlined"
          onChange={(e) => setAge(e.target.value)}
          value={age ? age : null}
        />
        <br />
        <TextField
          style={{ width: "18rem", margin: "1rem" }}
          id="outlined-basic"
          label="Donor Blood Group"
          variant="outlined"
          onChange={(e) => setBloodGroup(e.target.value)}
          value={bloodGroup ? bloodGroup : null}
        />
        <br />
        <TextField
          style={{ width: "18rem", margin: "1rem" }}
          id="outlined-basic"
          label="Enter 10-Digit Mobile Number"
          variant="outlined"
          onChange={(e) => setContactNo(e.target.value)}
          value={contactNo ? contactNo : null}
        />
        <br />
        <TextField
          style={{ width: "18rem", margin: "1rem" }}
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          onChange={(e) => setEmailId(e.target.value)}
          value={emailId ? emailId : null}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={false}
              name="Availability"
              color="primary"
              onChange={() => setAvailability(1)}
              value={1 ? 1 : 0}
            />
          }
          label="Check, if Plasma donor is currently available.You can uncheck this field later"
          id="ticks"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={false}
              name="Eligibility"
              color="primary"
              onChange={() => setEligibility(1)}
              value={1 ? 1 : 0}
            />
          }
          label="Agree with Eligibility rules"
          id="ticks"
        />
        <Link to="/eligibility">Check Here</Link>
        <br />
        {!showIcon ? (
          <>
            {!loading ? (
              <>
                <Button
                  style={{ margin: "1rem" }}
                  variant="contained"
                  color="primary"
                  onClick={verifyValues}
                >
                  Submit
                </Button>
              </>
            ) : (
              <center>
                <CircularProgress />
              </center>
            )}
          </>
        ) : (
          <>
            <center>
              <span style={{ fontSize: "20px", color: "green" }}>
                Submit Success! <DoneAllIcon />
              </span>
            </center>
          </>
        )}
      </div>
      <br />
      <br />
    </div>
  );
}
