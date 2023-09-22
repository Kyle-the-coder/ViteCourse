import { useState } from "react";
import { DatePicker } from "./DatePicker";

function App() {
  return (
    <>
      <div class="date-picker-container">
        <button class="date-picker-button">June 26th, 2023</button>
        <DatePicker />
      </div>
    </>
  );
}

export default App;
