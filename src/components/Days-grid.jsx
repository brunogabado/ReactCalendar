import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);
dayjs.extend(isBetween);

const RowOfDays = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px 0 10px;
  font-weight: 500;
`;

const Day = styled.button`
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  background-color: white;
  border: none;
  border-radius: ${({ $isFirst, $isLast }) => ($isFirst ? "7px 0 0 7px" : $isLast ? "0 10px 10px 0" : "none")};
  background-color: ${({ $isSelected, $isBetween }) => ($isSelected ? "#6f48eb" : $isBetween ? "#eee" : "white")};
  color: ${({ $isSelected, $isDisabled, $isBetween }) =>
    $isSelected ? "white" : $isBetween ? "#6f48eb" : $isDisabled ? "rgb(220, 220, 220)" : "black"};
  font-size: 15px;
`;

const WeekDay = styled.div`
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  font-size: 14px;
`;

const Grid = ({ now, currentMonth, handleNewDate, selectedRange, setSelectedRange }) => {
  const dateFormat = "dddd";

  const [arrayOfDays, setArrayOfDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({ startSelectedMonth: currentMonth, endSelectedMonth: currentMonth });

  const formateDateObject = (date) => {
    const clonedObject = { ...date.toObject() };

    const formatedObject = {
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      fullDate: `${clonedObject.years}/${clonedObject.months}/${clonedObject.date}`,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isCurrentDay: date.isToday(),
    };

    return formatedObject;
  };

  const handleClick = (date) => {
    const day = `${date.year}-${date.month}-${date.day}`;

    if (!selectedRange.start) {
      setSelectedRange({ start: day, end: day });
      setSelectedMonth({ startSelectedMonth: date.month, endSelectedMonth: date.month });
    } else if (selectedRange.start === day) {
      setSelectedRange({ start: null, end: null });
      setSelectedMonth({ startSelectedMonth: null, endSelectedMonth: null });
    } else if (selectedRange.end === day) {
      setSelectedRange({ start: selectedRange.start, end: null });
      setSelectedMonth({ startSelectedMonth: selectedMonth.startSelectedMonth, endSelectedMonth: null });
    } else if (dayjs(day).isAfter(dayjs(selectedRange.start))) {
      setSelectedRange({ start: selectedRange.start, end: day });
      setSelectedMonth({ startSelectedMonth: selectedMonth.startSelectedMonth, endSelectedMonth: currentMonth });
    }
    handleNewDate(selectedRange.start, selectedRange.end);
  };

  const getAllDays = () => {
    let currentDate = currentMonth.startOf("month").weekday(0);
    const nextMonth = currentMonth.add(1, "month").month();
    let allDates = [];
    let weekDates = [];
    let weekCounter = 1;

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formated = formateDateObject(currentDate);

      weekDates.push(formated);

      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, "day");
    }
    setArrayOfDays(allDates);
  };

  useEffect(() => {
    getAllDays();
    handleNewDate(selectedRange.start, selectedRange.end);
  }, [currentMonth, selectedRange]);

  const Days = () => {
    return arrayOfDays.map((week, index) => (
      <RowOfDays key={index}>
        {week.dates.map((d, i) => (
          <Day
            onClick={() => handleClick(d)}
            key={i}
            $isFirst={`${d.year}-${d.month}-${d.day}` === selectedRange.start}
            $isLast={`${d.year}-${d.month}-${d.day}` === selectedRange.end}
            $isSelected={selectedRange.start === `${d.year}-${d.month}-${d.day}` || selectedRange.end === `${d.year}-${d.month}-${d.day}`}
            $isBetween={selectedRange.start && selectedRange.end && dayjs(d.fullDate).isBetween(selectedRange.start, dayjs(selectedRange.end), "day")}
            $isDisabled={!d.isCurrentMonth}
          >
            <strong>{d.day}</strong>
          </Day>
        ))}
      </RowOfDays>
    ));
  };

  const WeekDays = Array.from({ length: 7 }, (_, i) => {
    const fullDay = now.weekday(i).format(dateFormat);
    const abbreviatedDay = fullDay.substring(0, 3).toUpperCase();
    return (
      <WeekDay key={i}>
        <strong>{abbreviatedDay}</strong>
      </WeekDay>
    );
  });

  return (
    <div>
      <RowOfDays>{WeekDays}</RowOfDays>
      <div>{Days()}</div>
    </div>
  );
};

export default Grid;
