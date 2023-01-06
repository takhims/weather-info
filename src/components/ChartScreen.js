import { Button, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWeatherDataAsync, resetState } from "../redux/citySlice";
import  RenderTable  from "./RenderTable";
import RenderGraph from "./RenderGraph";
import { RepeatIcon } from "@chakra-ui/icons";

const ChartScreen = () => {
  const { cityList, weatherData, paramList } = useSelector(
    (state) => state.city
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherDataAsync(cityList));    
  }, [cityList, dispatch]);  

  const restoreState = () => {    
    dispatch(resetState());
  }


  return (
    <Container maxW="5xl" centerContent>
      <RenderTable />
      { paramList.includes('temperature') ? <RenderGraph /> : null}
      { weatherData.length ? <Link to="/">
        <Button bg="white" marginTop='13px' marginBottom="20px" rightIcon={<RepeatIcon />} onClick={restoreState}>Start Over Again</Button>
      </Link> : null}
      
    </Container>
  );
};

export default ChartScreen;
