import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./HomeScreen/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Playground } from "./Playground";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/playground/:folderId/:playgroundId"
            element={<Playground />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
