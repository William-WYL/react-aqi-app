import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import useStore from "../store/store";

const Time = () => {
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    setCurrentDate(dayjs().format('DD MMMM YYYY'));
  }, []);


  const { time } = useStore();
  const formattedDate = dayjs(time).format("DD MMMM YYYY h:mm A");

  return (
    <>
      <h2>{time && 'Data Collected Time: '}{(time && formattedDate) || currentDate}</h2>
    </>
  );
};

export default Time;