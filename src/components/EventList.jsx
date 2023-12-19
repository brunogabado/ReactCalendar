import { useState } from "react";
import styled from "styled-components";

const EventList = styled.div`
  margin-top: 10%;
  justify-self: center;
  border-radius: 10px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 400px;
  background-color: #fff;
  color: #222;
  border-radius: 10px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.25em;

  ul {
    padding: 0;
  }
`;

const EventListHeader = styled.div`
  display: flex;
  align-items: center;
`;

const EventInput = styled.input`
  height: 20px;
  padding: 5px;
  margin: 5px;
  border: 1px solid #6f48eb;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  font-size: 15px;
  color: white;
  background-color: #6f48eb;
  height: 30px;
  width: 200px;
  border-radius: 5px;

  &:hover {
    transform: scale(1.1);
  }
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-content: center;
  color: "#6f48eb";
  background-color: white;
  border: 1px solid #6f48eb;
  border-radius: 5px;
`;

const EventsList = ({ eventDate, handleListClicked }) => {
  const [inputValue, setInputValue] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [dateRanges, setDateRanges] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      const newEvent = `${inputValue} from ${eventDate.start} to ${eventDate.end}`;
      const dateRange = { start: eventDate.start, end: eventDate.end };
      setEventsList([...eventsList, newEvent]);
      setDateRanges([...dateRanges, dateRange]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const updatedEventsList = [...eventsList];
    const updatedDateRanges = [...dateRanges];

    updatedEventsList.splice(index, 1);
    updatedDateRanges.splice(index, 1);

    setEventsList(updatedEventsList);
    setDateRanges(updatedDateRanges);
  };

  return (
    <EventList>
      <EventListHeader>
        <EventInput value={inputValue} onChange={handleInputChange} />
        <Button type="button" onClick={handleSubmit}>
          Create Event
        </Button>
      </EventListHeader>
      <ul>
        {eventsList.map((event, index) => (
          <List key={index} onClick={() => handleListClicked(dateRanges[index])}>
            {event}{" "}
            <DeleteButton onClick={() => handleDelete(index)}>
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                  stroke="#6f48eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DeleteButton>
          </List>
        ))}
      </ul>
    </EventList>
  );
};

export default EventsList;
