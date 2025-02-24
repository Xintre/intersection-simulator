import {Button, Headline, MD2Colors, Paragraph} from 'react-native-paper';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import {
  Direction,
  type Intersection,
  type IO,
} from '../simulation/src/crossingLogic';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios, {AxiosResponse} from 'axios';
import {faker} from '@faker-js/faker';
import _ from 'lodash';

type SimulationState = ReturnType<Intersection['getState']>;

function App(): React.JSX.Element {
  const [state, setState] = useState<SimulationState | null>(null);

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? MD2Colors.grey300 : MD2Colors.white,
  };

  const addCar = useCallback(async () => {
    const result = await axios.post<
      any,
      AxiosResponse<SimulationState>,
      IO.AllCommands
    >('http://localhost:8000/api/command', {
      type: 'addVehicle',
      vehicleId: faker.vehicle.vehicle(),
      startRoad: _.sample(Object.values(Direction))!,
      endRoad: _.sample(Object.values(Direction))!,
    });

    setState(result.data);
  }, []);

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
    <SafeAreaView style={styles.fillSpace}>
      <View style={[backgroundStyle, styles.fillSpace]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <ScrollView
          style={backgroundStyle}
          contentContainerStyle={styles.scrollViewContents}>
          <Headline style={styles.header}>Xintre's Crossroads App</Headline>
          <Text>Simulation round {state?.simRoundCt ?? '---'}</Text>
          <Text>Lights cooldown counter {state?.graceCt ?? '---'}</Text>

          <Text>Lights N: {state?.lightsState.N}</Text>
          <Text>Lights S: {state?.lightsState.S}</Text>
          <Text>Lights E: {state?.lightsState.E}</Text>
          <Text>Lights W: {state?.lightsState.W}</Text>

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
          <Button onPress={addCar}>Add car 🚗</Button>
          <Button onPress={stepSimulation}>Step simulation🚦</Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
  },
  fillSpace: {
    flex: 1,
  },
  scrollViewContents: {
    gap: 10,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  column: {flexDirection: 'column'},
  italic: {fontStyle: 'italic'},
  carsInDirection: {marginStart: 15, marginBottom: 5},
  directionText: {marginTop: 25},
});

export default App;
