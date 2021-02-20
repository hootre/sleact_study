import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';
const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" /> {/* path -> to로 이동 */}
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};
export default App;
