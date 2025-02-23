
import useStore from "../store/store";

const Results = () => {
  const responsiveStyles = {
    banner: {
      maxHeight: '200px',
      minHeight: '200px',
      width: '700px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '60px'
    },
    results: {
      height: '69px',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '46px',
      textAlign: 'center'
    }
  };

  const { aqi, city, alertMessage, loading } = useStore();

  const getDisplayCity = () => {
    if (alertMessage) {
      return 'City Name';
    } else if (city) {
      return city;
    } else {
      return 'City Name';
    }
  };

  const getAirQuality = (aqi) => {
    if (aqi <= 50) return { level: "Good", color: "green" };
    if (aqi <= 100) return { level: "Moderate", color: "Gold" };
    if (aqi <= 150) return { level: "Poor", color: "orange" };
    if (aqi <= 200) return { level: "Unhealthy", color: "red" };
    if (aqi <= 250) return { level: "Severe", color: "purple" };
    return { level: "Hazard", color: "darkred" };
  };

  const airQuality = aqi ? getAirQuality(aqi) : null;

  // Display logic
  let displayContent;

  if (loading) {
    displayContent = null; // No content shown during loading
  } else if (alertMessage) {
    displayContent = <div>{alertMessage}</div>; // Show alert message if available
  } else if (aqi) {
    displayContent = (
      <>
        <span>AQI: {aqi} </span>
        {airQuality && (
          <span style={{ color: airQuality.color, fontWeight: 'bold' }}>
            {airQuality.level}
          </span>
        )}
      </>
    ); // Show AQI and air quality if available
  } else {
    displayContent = <div></div>;
  }


  return (
    <div id="wrapper">
      <div id="banner" style={responsiveStyles.banner}>
        <h2 id="cityName">
          {loading ? 'loading...' : getDisplayCity()}
        </h2>
      </div>
      <div id="results" style={responsiveStyles.results}>
        {displayContent}
      </div>
    </div>
  );
};

export default Results;