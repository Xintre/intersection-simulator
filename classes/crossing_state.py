from typing import Dict
from .direction import Direction
from .lights import LightState, AllLightsState
from .car import Car
from constants import ONE_ROUND_CLOCK_TICKS, N_S_LIGHTS_GREEN, STARTING_CARS_COUNTER
from type_hints import LightsStateType, CarsCounterType


class CrossingState:
    lights_state: LightsStateType
    cars_counter: CarsCounterType

    def __init__(self) -> None:
        self.lights_state = N_S_LIGHTS_GREEN
        self.cars_counter = STARTING_CARS_COUNTER

    def __repr__(self) -> str:
        self.show_lights()
        return '\n'.join(['Crossing state:', *['{}: {}🚗'.format(direction, car_number) for direction, car_number in self.cars_counter.items()]])

    def show_lights(self) -> None:
        print('Lights🚦')
        print('\n'.join([*['{}:{}'.format(direction, light)
              for direction, light in self.lights_state.items()]]))

    def add_car(self, car: Car) -> None:
        self.cars_counter[car.start] += 1

    def delete_car(self, direction: Direction) -> None:
        self.cars_counter[direction] -= 1

    def check_lights(self) -> int:
        n_light_state: LightState = self.lights_state[Direction.N]
        match n_light_state:
            case LightState.GREEN:
                return AllLightsState.N_S_GREEN
            case LightState.RED:
                return AllLightsState.W_E_GREEN
            case LightState.YELLOW:
                return AllLightsState.ALL_YELLOW

    def delete_cars() -> None:
        pass

# TODO to implement


def add_cars_randomly() -> None:
    pass
