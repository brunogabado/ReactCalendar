import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { locale } from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import Header from "./Header";
import Grid from "./Days-grid";
import styled from "styled-components";

dayjs.extend(weekdayPlugin);

const CalendarContainer = styled.div`
  margin-top: 10%;
  justify-self: center;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  color: #222;
  border-radius: 10px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Calendar = ({ handleNewDate, setSelectedRange, selectedRange, newMonth, setMonthToRender }) => {
  const now = dayjs().locale({
    ...locale,
  });
  const [currentMonth, setCurrentMonth] = useState(now);

  const setEventMonthPicked = () => {
    if (newMonth) {
      const monthToHighlight = newMonth.add(1, "month");
      setCurrentMonth(monthToHighlight);
      setMonthToRender(null);
    }
  };

  const nextMonth = () => {
    const plus = currentMonth.add(1, "month");
    setCurrentMonth(plus);
  };

  const prevMonth = () => {
    const minus = currentMonth.subtract(1, "month");
    setCurrentMonth(minus);
  };

  const nextYear = () => {
    const plus = currentMonth.add(12, "month");
    setCurrentMonth(plus);
  };

  const prevYear = () => {
    const minus = currentMonth.subtract(12, "month");
    setCurrentMonth(minus);
  };

  useEffect(() => {
    if (newMonth) {
      setEventMonthPicked();
      setMonthToRender(null);
    }
  }, [newMonth, setMonthToRender]);

  return (
    <CalendarContainer className="calendar">
      <Header currentMonth={currentMonth} nextYear={nextYear} nextMonth={nextMonth} prevYear={prevYear} prevMonth={prevMonth}></Header>
      <Grid
        now={now}
        currentMonth={currentMonth}
        handleNewDate={handleNewDate}
        setSelectedRange={setSelectedRange}
        selectedRange={selectedRange}
      ></Grid>
    </CalendarContainer>
  );
};

export default Calendar;
