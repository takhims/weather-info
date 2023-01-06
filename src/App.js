import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import { Route, Routes } from "react-router-dom";
import ParamPage from "./components/ParamPage";
import ChartScreen from "./components/ChartScreen";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/params" element={<ParamPage />}></Route>
        <Route path="/chart" element={<ChartScreen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
