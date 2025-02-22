from copy import deepcopy
from random import choice
from typing import Type

from simulation.config import Config

from .car import Car
from .constants import (
    STARTING_CARS_COUNTER,
)
from .crossing_connection.base.base_crossing_connection import (
    BaseCrossingConnection,
)
from .direction import Direction
from .type_hints import CarsCounterDict, LightsStateDict


class CrossingState:
    """Holds and handles crossing state."""

    lights_state_dict: LightsStateDict
    cars_counter_dict: CarsCounterDict
    crossing_connection: BaseCrossingConnection

    def __init__(
        self, CrossingConnectionImplementation: Type[BaseCrossingConnection]
    ) -> None:
        self.config = Config()

        self.crossing_connection = CrossingConnectionImplementation()
        self.lights_state_dict = self.crossing_connection.get_initial_lights_state()

        self.cars_counter_dict = deepcopy(STARTING_CARS_COUNTER)

    def __repr__(self) -> str:
        self.show_lights()

        return '\n'.join(
            [
                'Crossing state:',
                *[
                    '{}: {}🚗'.format(direction, car_number)
                    for direction, car_number in self.cars_counter_dict.items()
                ],
            ]
        )

    def show_lights(self) -> None:
        print('Lights 🚦')
        print(
            '\n'.join(
                [
                    *[
                        '{}:{}'.format(direction, light)
                        for direction, light in self.lights_state_dict.items()
                    ]
                ]
            )
        )

    def add_car(self, car: Car) -> None:
        self.cars_counter_dict[car.start] += 1

    def move_cars(self, cars_counter_dict: CarsCounterDict):
        self.crossing_connection.move_cars(
            lights_state_dict=self.lights_state_dict,
            cars_counter_dict=cars_counter_dict,
        )

    def check_if_there_are_any_cars(self) -> bool:
        return sum(self.cars_counter_dict.values()) == 0

    def add_random_car(self):
        return self.add_car(
            Car(start=choice(list(Direction)), destination=choice(list(Direction)))
        )

    def change_lights(self, winning_direction: Direction):
        """Changes intersection lights to green in direction where most cars are waiting."""
        self.lights_state_dict = self.crossing_connection.change_lights(
            lights_state_dict=self.lights_state_dict,
            winning_direction=winning_direction,
        )
