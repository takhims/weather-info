import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Spinner,
  Tr,
  Th,
  Td,  
  TableContainer,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";

const RenderTable = () => {
  const { paramList, weatherData } = useSelector((state) => state.city);

  const calculateAverage = (arr) => {
    const average = arr.reduce((a, b) => a + b) / arr.length;
    return average;
  };

  return (
    <Container maxW="5xl" centerContent>
      <Box
        boxShadow="0 0 7px 2px rgb(0 0 0 / 10%)"
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
      {weatherData.length ? (
        <TableContainer style={{ paddingTop: "30px" }}>
          <Table variant="simple" borderRadius="lg" marginBottom="40px" bg="white">
            <Thead>
              <Tr>
                <Th>Location</Th>
                {paramList.includes("temperature") ? (
                  <Th>Temperature (°C)</Th>
                ) : null}
                {paramList.includes("dust") ? <Th>Dust (μg/m³)</Th> : null}
                {paramList.includes("windspeed") ? (
                  <Th>Windspeed (Km/h)</Th>
                ) : null}
                {paramList.includes("precipitation") ? (
                  <Th>Precipitation (mm)</Th>
                ) : null}
              </Tr>
            </Thead>
            <Tbody>
              {weatherData.map((d) => (
                <Tr key={d.city.name}>
                  <Td>{d.city.name}</Td>
                  {paramList.includes("temperature") ? (
                    <Td>
                      {calculateAverage(
                        d.weather.daily.apparent_temperature_max
                      ).toFixed(2)}
                    </Td>
                  ) : null}
                  {paramList.includes("dust") ? (
                    <Td>
                      {calculateAverage(d.airQuality.hourly.dust).toFixed(2)}
                    </Td>
                  ) : null}
                  {paramList.includes("windspeed") ? (
                    <Td>
                      {calculateAverage(d.weather.hourly.windspeed_10m).toFixed(
                        2
                      )}
                    </Td>
                  ) : null}
                  {paramList.includes("precipitation") ? (
                    <Td>
                      {calculateAverage(
                        d.weather.daily.precipitation_sum
                      ).toFixed(2)}
                    </Td>
                  ) : null}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Spinner size="xl" style={{}} />
      )}
    </Container>
  );
};

export default RenderTable;
