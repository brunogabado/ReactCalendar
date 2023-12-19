import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
`;
const HeaderLeftDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;
const HeaderCenterDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 70%;
  font-size: 20px;
  font-weight: 400;
  color: #6f48eb;
`;
const HeaderRightDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-end;
`;




const Header = ({ currentMonth, nextYear, prevYear, nextMonth, prevMonth }) => {
  const dateFormat = "MMMM YYYY";

  return (
    <HeaderContainer>
      <HeaderLeftDiv>
        <div onClick={() => prevYear()}>
          <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5"
              stroke="#6f48eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 19L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L11 5"
              stroke="#6f48eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div onClick={() => prevMonth()}>
          {" "}
          <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5"
              stroke="#6f48eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </HeaderLeftDiv>
      <HeaderCenterDiv>
        <span>{currentMonth.format(dateFormat)}</span>
      </HeaderCenterDiv>
      <HeaderRightDiv>
        <div onClick={() => nextMonth()}>
          <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19"
              stroke="#6f48eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div onClick={() => nextYear()}>
          <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              color="#6f48eb"
              d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19"
              stroke="#6f48eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19"
              stroke="#6f48eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </HeaderRightDiv>
    </HeaderContainer>
  );
};

export default Header;
