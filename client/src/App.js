import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Visual from "./pages/VisualPage";
import QuestionPage from "./pages/QuestionDisplayPage";
import QuestionListPage from "./pages/QuestionListPage";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NoMatch from './pages/NoMatch';
import { UserContextProvider } from "./context/UserAuthentication";

function App() {
  return (
    <UserContextProvider>
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
              <Route path="/question/:questionTitle" >
                <QuestionPage />
              </Route>
              <Route exact path="/questionlist">
                <QuestionListPage />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </Router>
    </UserContextProvider>

  );
}

export default App;
