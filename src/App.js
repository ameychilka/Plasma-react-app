import './HomePage/App.css';
import 'antd/dist/antd.css';
import { Switch, Route } from 'react-router-dom';
import GetDonorsList from './HomePage/GetDonorsList';
import PostDonorsList from './HomePage/PostDonorsList';
import UpdatePlasmAvailability from './HomePage/UpdatePlasmAvailability';
import Eligibility from './HomePage/Eligibility';
function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={GetDonorsList}/>
        <Route exact path='/adddonors' component={PostDonorsList}/>
        <Route exact path='/update' component={UpdatePlasmAvailability}/>
        <Route exact path='/eligibility' component={Eligibility}/>
      </Switch>
    </>
  );
}

export default App;
