from typing import Type

from simulation.constants import CAR_PASS_CLOCK_TICKS, ONE_ROUND_CLOCK_TICKS
from simulation.crossing_connection.base.base_crossing_connection import (
    BaseCrossingConnection,
)

from .config import Config
from .crossing_state import CrossingState
from .errors.simulation_end import SimulationEnd
from .switching_strategy.base.base_switching_strategy import BaseSwitchingStrategy


class Intersection:
    def __init__(
        self,
        CrossingConnectionImplementation: Type[BaseCrossingConnection],
        SwitchingStrategyImplementation: Type[BaseSwitchingStrategy],
    ):
        self.config = Config()
        self.crossing_state = CrossingState(
            CrossingConnectionImplementation=CrossingConnectionImplementation
        )
        self.switching_strategy: BaseSwitchingStrategy = (
            SwitchingStrategyImplementation()
        )

        self.sim_round_ct = 0

    def run(self):
        if self.crossing_state.check_if_there_are_any_cars():
            print(self.crossing_state)
            print('No more cars at the intersection 🚗')

            raise SimulationEnd()

        print(
            f'==================== Round {self.sim_round_ct}, grace counter: {self.config.round_ct} ===================='
        )
        print(self.crossing_state)

        # update lights
        winning_direction = self.switching_strategy.calculate_winning_direction(
            crossing_state=self.crossing_state
        )

        if self.config.round_ct >= ONE_ROUND_CLOCK_TICKS:
            self.crossing_state.change_lights(
                winning_direction=winning_direction,
            )

            self.config.round_ct = 0

        if self.config.round_ct >= CAR_PASS_CLOCK_TICKS:
            self.crossing_state.move_cars(
                cars_counter_dict=self.crossing_state.cars_counter_dict
            )

        self.config.round_ct += 1
        self.sim_round_ct += 1
