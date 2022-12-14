import React, { useState } from "react";
import Appbar from "./AppBar";
import useSWR from "swr";
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { Input } from 'antd';
import { CircularProgress } from "@material-ui/core";
import './App.css';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function GetDonorsList() {
  const history = useHistory();
  const url = "http://52.192.229.82/api/getplasmadonors";
  const { data, error } = useSWR(url, fetcher);
  const [input, setInput] = useState("");

  return (
    <div>
      <Appbar />
      <br />
      <center>
             <Input
            type="text"
            placeholder = "Search..."
            size="large"
            onChange={(e) => setInput(e.target.value)}
            id="input"
          />
             </center>
      <center>
          <h2 className="heads">
              Plasma Donors List
          </h2>

      </center>
      <div>
        {data ? (
          data
            .filter((info) => {
              return (
                info.bloodGroup.toLowerCase().includes(input.toLowerCase()) ||
                info.fullName.toLowerCase().includes(input.toLowerCase()) || 
                info.age.toLowerCase().includes(input.toLowerCase()) || 
                info.contactNo.toLowerCase().includes(input.toLowerCase()) ||
                info.emailId.toLowerCase().includes(input.toLowerCase())
              );
            })
            .map((info) => {
              return (
                <>
                  <div className="grid">
                    <div className="content">
                      Donor Full Name - <span style={{fontSize:"16px"}} > {info.fullName}</span><br />
                      Age -<span style={{fontSize:"16px"}} >  {info.age}</span>
                      <br />
                      Plasma Availability - &nbsp;
                       {info.availability === 1 ? (
                        <span style={{ fontSize: "17px", color: "green" }}>
                          Available
                        </span>
                      ) : (<span style={{ fontSize: "17px", color: "red" }}>
                          Not Available
                        </span>
                      )}
                      <br />
                      Blood Group - <span style={{fontSize:"16px"}} > {info.bloodGroup}</span><br/>
                      Contact Details - <span style={{fontSize:"16px"}} > {info.contactNo}</span><br/>
                      Email Identity - <span style={{fontSize:"16px"}}>{info.emailId}</span>
                    </div>
                  </div>
                </>
              );
            })
        ) : (
          <>
            <h2 style={{ marginTop: "4rem",textAlign:"center" }}><CircularProgress/></h2>
          </>
        )}
      </div>
     
      <Button color="inherit" id="buttn" variant="contained" color="primary" onClick={() => history.push('/update')}>Update Plasma Availablity</Button>
          <br/>
          <br/>
    </div>
  );
}
