import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Visual from "./pages/VisualPage";
import QuestionPage from "./pages/QuestionDisplayPage";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/visualization">
            <Visual />
          </Route>
          <Route path="/question">
          <QuestionPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
