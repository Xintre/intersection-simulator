from typing import Dict
from direction import Direction
from light_state import LightState
from car import Car

class CrossingState:
    lights_state: Dict[Direction, LightState]
    cars_counter: Dict[Direction, Car]
    round_ct: int

    def __init__(self) -> None:
        self.lights_state = {}
        self.cars_counter = {Direction.N: 0, Direction.E: 0, Direction.S: 0, Direction.W: 0}
        self.lights_state = {Direction.N: LightState.GREEN, Direction.S: LightState.GREEN, Direction.E: LightState.RED, Direction.W: LightState.RED}
        self.round_ct = 0
    
    def __repr__(self) -> str:
        return '\n'.join(['Crossing state:', *['{}: {}🚗'.format(direction, car_number) for direction, car_number in self.cars_counter.items()]])

    def show_lights(self) -> None:
        print('Lights🚦')
        print('\n'.join([*['{}:{}'.format(direction, light) for direction, light in self.lights_state.items()]]))

    def update_round_ct(self) -> None:
        self.round_ct += 1

    def add_car(self, car: Car) -> None:
        self.cars_counter[car.start] += 1
    
    def delete_car(self, direction: Direction) -> None:
        self.cars_counter[direction] -= 1
