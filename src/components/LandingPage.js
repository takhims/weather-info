import React, { useState, useCallback } from "react";
import {
  Button,
  useToast,
  Input,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import CityList from "./CityList";
import { addCity } from "../redux/citySlice";
import axios from "axios";

const LandingPage = () => {
  const cityList = useSelector((state) => state.city.cityList);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const toast = useToast();

  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (text) => {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${text}`
    );
    if (response?.data?.results)
      setSuggestions(
        response.data.results.map(
          ({ latitude, longitude, name, admin1, country, id }) => ({
            latitude,
            longitude,
            id,
            name: `${name}, ${country}`,
          })
        )
      );
  };

  const debouncedGetSuggestion = useCallback(
    debounce(getSuggestions, 200),
    []
  );

  const onChange = (e) => {
    setCity(e.target.value);
    debouncedGetSuggestion(e.target.value);
  };

  const addCityToStore = () => {
    if (city.length === 0) {
      toast({
        title: "Please enter a city name",
        position: "bottom",
        status: "warning",
        duration: "2000",
        isClosable: true,
      });
      return;
    } else if (cityList.some((c) => c.name === city)) {
      toast({
        title: "City already exists",
        position: "bottom",
        status: "warning",
        duration: "2000",
        isClosable: true,
      });
      return;
    }

    const find = suggestions.find((s) => s.name === city);
    if (find) {
      dispatch(addCity(find));
      setCity('');
      setSuggestions([]);
    }
  };  
  
  return (
    <Container maxW="xl" centerContent>
      <Box
        boxShadow="0 0 7px 2px rgb(0 0 0 / 10%);"
        display="flex"
        bg="white"
        justifyContent="center"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="2px"
        w="100%"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Weather Info
        </Text>
      </Box>

      <Box
        bg="white"
        justifyContent="center"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="2px"
      >
        <Text >Please search and add cities</Text>
        <Input
          list="city-suggestions"
          placeholder="Enter the City Name"
          value={city}
          onChange={onChange}
        />
        <datalist id="city-suggestions">
          {suggestions.map((s) => (
            <option key={s.id} value={s.name} />
          ))}
        </datalist>

        <Button
          onClick={addCityToStore}
          position="center"
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
        >
          Add City
        </Button>
      </Box>
      <Box
        display="flex"
        bg="white"
        flexDirection="column"
        justifyContent="center"
        w="100%"        
        gap="5px"
        maxH="360px"
        p="10px"
        m="15px 0 15px 0"
        borderRadius="lg"
        borderWidth="2px"
      >
        <div style={{overflowY: 'scroll', height: '100%', paddingRight: '10px'}}>
        {cityList.length ? (
          cityList.map((city) => <CityList name={city.name} id={city.id} key={city.id} />)
        ) : (
          <Text>Please add a city to proceed further</Text>
        )}
        </div>
      </Box>
      <Link to="/params">
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="blue"
          variant="outline"
          position="right"
          disabled={cityList.length ? false : true}
        >
          Next
        </Button>
      </Link>
    </Container>
  );
};

export default LandingPage;
