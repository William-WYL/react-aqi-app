import { useCallback, useEffect, useRef, useState } from "react";
import useStore from "../store/store";
import Title from "./title";

const Form = () => {
  const [city, setCity] = useState('');
  const { loading, fetchAQI, setAlertMessage } = useStore();
  const inputRef = useRef(null);



  const handleSearch = useCallback(() => {
    if (!city) {
      setAlertMessage("⚠️ Please enter a city name");
    } else {
      fetchAQI(city);
    }
  }, [city, fetchAQI, setAlertMessage]);

  // props function for Title component
  const handleTitleClick = () => {
    window.location.reload(); // Reset the page to its initial state 
  };

  // Press Enter triger event
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [handleSearch]);


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <form id="searchForm">
        <Title
          title="City Air Quality Search"   // props value for Title component
          onTitleClick={handleTitleClick} />
        <div id="inputArea">
          <input
            type="text"
            id="cityName"
            ref={inputRef}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Please enter the city name (e.g. New York, London, Hong Kong)"
          />
          <button type="button" onClick={handleSearch} disabled={loading}>Search</button>
        </div>
      </form>
    </div>
  );
};

export default Form;