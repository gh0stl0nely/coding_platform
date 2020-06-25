import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Visual from "./pages/VisualPage";
import QuestionPage from "./pages/QuestionDisplayPage";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CodeEditor from "./components/CodeEditor"

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
        <Visual />
        <QuestionPage />
        <SignUp />
        <SignIn />
        <CodeEditor />
      </main>

    </div>
  );
}

export default App;
