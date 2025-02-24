import {
  Button,
  Divider,
  Headline,
  MD2DarkTheme,
  MD2LightTheme,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, useColorScheme} from 'react-native';

import {type Intersection} from '../simulation/src/crossingLogic';
import {type IO} from '../simulation/src/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios, {AxiosResponse} from 'axios';
import {faker} from '@faker-js/faker';
import {Dropdown} from 'react-native-paper-dropdown';
import {Provider as PaperProvider} from 'react-native-paper';
import {DIRECTIONS} from './constants';
import {JsonDirection} from '../simulation/src/shared/io';

type SimulationState = ReturnType<Intersection['getState']>;

function App(): React.JSX.Element {
  const [state, setState] = useState<SimulationState | null>(null);
  const [startDirection, setStartDirection] = useState<JsonDirection>(
    JsonDirection.N,
  );
  const [destinationDirection, setDestinationDirection] =
    useState<JsonDirection>(JsonDirection.S);

  // on mount - fetch simulation state
  useEffect(
    () => {
      async function fetch() {
        const response = await axios.get<SimulationState>(
          'http://localhost:8000/api/state',
        );

        setState(response.data);
      }

      fetch();
    },
    // on mount - empty list below
    [],
  );

  const isDarkMode = useColorScheme() === 'dark';

  const addCar = useCallback(async () => {
    const vehicleId = faker.vehicle.vehicle();

    console.log(
      `Adding new car '${vehicleId}' driving from ${startDirection} to ${destinationDirection}`,
    );

    const result = await axios.post<
      any,
      AxiosResponse<SimulationState>,
      IO.AllCommands
    >('http://localhost:8000/api/command', {
      type: 'addVehicle',
      vehicleId: vehicleId,
      startRoad: startDirection,
      endRoad: destinationDirection,
    });

    setState(result.data);
  }, [startDirection, destinationDirection]);

  const stepSimulation = useCallback(async () => {
    const result = await axios.post<
      any,
      AxiosResponse<SimulationState>,
      IO.AllCommands
    >('http://localhost:8000/api/command', {
      type: 'step',
    });

    setState(result.data);
  }, []);

  return (
    <PaperProvider theme={isDarkMode ? MD2DarkTheme : MD2LightTheme}>
      <SafeAreaView style={styles.fillScreenHeight}>
        <ScrollView contentContainerStyle={styles.scrollViewContents}>
          <Headline style={[styles.header, styles.centeredText]}>
            Xintre's Crossroads App
          </Headline>

          <Divider style={styles.divider} />

          <View style={styles.addCarSection}>
            <Dropdown
              label="Start direction"
              placeholder="Select start direction"
              options={DIRECTIONS}
              value={startDirection}
              onSelect={value => setStartDirection(value! as JsonDirection)}
            />

            <Dropdown
              label="Destination direction"
              placeholder="Select destination direction"
              options={DIRECTIONS}
              value={destinationDirection}
              onSelect={value =>
                setDestinationDirection(value! as JsonDirection)
              }
            />
            <Button
              onPress={addCar}
              mode="contained"
              icon="car"
              contentStyle={styles.buttonIconRight}>
              Add car
            </Button>
          </View>

          <Divider style={styles.divider} />

          <Title style={styles.centeredText}>🚦 Simulation control 🚦</Title>

          <Button
            onPress={stepSimulation}
            mode="contained"
            icon="step-forward"
            contentStyle={styles.buttonIconRight}>
            Step simulation
          </Button>

          <Divider style={styles.divider} />

          <Text>Simulation round {state?.simRoundCt ?? '---'}</Text>
          <Text>Lights cooldown counter {state?.graceCt ?? '---'}</Text>

          <Paragraph style={styles.lightsDisplay}>Lights🚦</Paragraph>

          <Text style={styles.lightsDisplay}>N: {state?.lightsState.N}</Text>
          <Text style={styles.lightsDisplay}>S: {state?.lightsState.S}</Text>
          <Text style={styles.lightsDisplay}>E: {state?.lightsState.E}</Text>
          <Text style={styles.lightsDisplay}>W: {state?.lightsState.W}</Text>

          {state?.carsStore ? (
            <View style={styles.column}>
              {Object.entries(state.carsStore).map(([direction, cars]) => (
                <View key={direction} style={styles.column}>
                  <Paragraph style={styles.directionText}>
                    Cars on {direction}:{' '}
                  </Paragraph>

                  {cars.length ? (
                    cars.map((car, index) => (
                      <Text key={index} style={styles.carsInDirection}>
                        🚘 {car.carID} start: {car.start}, destination:{' '}
                        {car.destination}
                      </Text>
                    ))
                  ) : (
                    <Text style={[styles.italic, styles.carsInDirection]}>
                      No cars
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <Text>Intersection not loaded yet!</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
  },
  centeredText: {textAlign: 'center'},
  fillScreenHeight: {
    height: '100%',
  },
  scrollViewContents: {
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  column: {flexDirection: 'column'},
  italic: {fontStyle: 'italic'},
  carsInDirection: {marginStart: 15, marginBottom: 5},
  directionText: {marginTop: 25},
  lightsDisplay: {textAlign: 'center'},
  addCarSection: {marginHorizontal: 80, paddingVertical: 10, gap: 10},
  divider: {
    marginVertical: 15,
  },
  buttonIconRight: {flexDirection: 'row-reverse'},
});

export default App;
