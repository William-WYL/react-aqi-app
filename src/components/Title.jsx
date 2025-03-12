import Results from "./Results";
import Time from "./Time";

// Destructuring of props data
const Title = ({ title, onTitleClick }) => {

  return (
    <>
      <h1
        id="title"
        onClick={onTitleClick}
        style={{ cursor: 'pointer' }}
      >{title}</h1>
      <Results />
      <Time />
    </>
  );
};

export default Title;