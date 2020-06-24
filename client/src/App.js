import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Visual from "./pages/VisualPage";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
        <Visual />
        <SignUp />
        <SignIn />
      </main>

    </div>
  );
}

export default App;
