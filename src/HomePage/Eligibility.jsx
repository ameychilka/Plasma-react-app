import React from "react";
import './App.css';
import AppBar from './AppBar';

export default function Eligibility() {
  return (
      <>
      <AppBar/><br/>
      <center>
          <h2>
          Who can Donote Plasma?
          </h2>
      </center>
    <div className="Alignments">
      <ul>
      <li>Recovered people aged between 18 and 60 are eligible to donate. Plasma
      from pregnant women and subjects with comorbid conditions should be
      avoided for COVID treatment.<br/></li>
        <li>
        The haemoglobin level of the donor should
      be above 12.5 g/dL and weight 55 kgs at the least. <br/>
        </li>
      <li>The donor must have been admitted at the hospital for COVID treatment. Asymptomatic patients
      are ineligible to donate. <br/></li>
      <li>The donor’s plasma should have antibodies for treating COVID. Antibodies develop automatically once they have recovered.
      A report certifying the presence of antibodies should be produced before
      plasma donation. <br/></li>
      <li>Plasma can be donated 14 days after getting
      discharged.<br/> </li>
      <li>The donor should have a COVID test report certifying the
      negative result, if they are donating between 14 days and 28 days after
      discharge. If the donor does not have the report, the test can be taken
      before donating plasma at the hospital. <br/></li>
      <li>Test reports are not needed if
      the recovered person donates after more than 28 days from the date of
      discharge. “If the person is hale and healthy after the window period, it
      signifies that the virus is neutralised with the antibodies. Hence,
      reports are not mandatory and tests need not be taken before donation,”
      added the doctor-in-charge.</li>
      </ul>
    </div>
    <br/>
    </>
  );
}
