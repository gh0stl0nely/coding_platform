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
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/visualization">
            <Visual />
          </Route>
          {/* Going forward, once logged in, then /question/id/:id lead to question, 
          but if not, then just automatically go back to /question -> This can be done in backend with res.redirect(/question or /signup) :) */}
          <Route path="/question/id/:id" children={<QuestionPage />}>
          </Route>
          <Route path="/question">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
