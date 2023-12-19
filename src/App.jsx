import React, { useState } from "react";
import Calendar from "./components/Calendar";
import styled from "styled-components";
import EventsList from "./components/EventList";
import dayjs from "dayjs";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10%;
  align-content: center;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    transform: scale(0.8);
  }

`;

function App() {
  const [inputDates, setInputDates] = useState({ start: "", end: "" });
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [monthToRender, setMonthToRender] = useState(null);

  const handleNewDate = (start, end) => {
    return setInputDates({ start: start, end: end });
  };

  const handleListClicked = (eventRange) => {
    setMonthToRender(dayjs(eventRange.start).startOf(1, "month"));
    setSelectedRange({ start: eventRange.start, end: eventRange.end });
  };

  return (
    <AppContainer>
      <Calendar
        handleNewDate={handleNewDate}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        newMonth={monthToRender}
        setMonthToRender={setMonthToRender}
      />
      <EventsList eventDate={inputDates} handleListClicked={handleListClicked} />
    </AppContainer>
  );
}

export default App;
