import React, { useState } from "react";
import {
  Button,
  Stack,
  Checkbox,
  Container,
  Box,
  Text  
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addParams } from "../redux/citySlice";

const ParamPage = () => {
  const dispatch = useDispatch();
  const paramList = [
    { key: "Temperature", value: "temperature" },
    { key: "Wind Speed", value: "windspeed" },
    { key: "Dust", value: "dust" },
    { key: "Precipitation", value: "precipitation" },
  ];

  const [selectedParams, setSelectedParams] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedParams([...selectedParams, e.target.value]);
    } else {
      setSelectedParams(selectedParams.filter((i) => i !== e.target.value));
    }
  };

  const addParamsToStore = () => {
    dispatch(addParams(selectedParams));
  };

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        boxShadow="0 0 7px 2px rgb(0 0 0 / 10%);"
        justifyContent="center"        
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="2px"
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
        <Stack spacing={6} direction="column">
          <Text>Please select the required parameters</Text>
          {paramList.map((param) => (
            <Checkbox
              value={param.value}
              key={param.key}
              onChange={handleChange}
            >
              {param.key}
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <div style={{ justifyContent: 'space-between', marginTop:'10px', width: '100%', display:'flex'}}>
        <Link to="/">
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="blue"
            variant="outline"
          >
            Back
          </Button>
        </Link>
        
        <Link to="/chart">
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            variant="outline"
            disabled={selectedParams.length ? false : true}
            onClick={addParamsToStore}
          >
            Next
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default ParamPage;
