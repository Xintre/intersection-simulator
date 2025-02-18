import config
from classes.crossing_state import CrossingState
from classes.direction import Direction
from constants import (
    ALL_LIGHTS_YELLOW,
    E_W_LIGHTS_GREEN,
    N_S_LIGHTS_GREEN,
    ONE_ROUND_CLOCK_TICKS,
)

from .basic_strategy import BasicStrategy


class MostCarsWinStrategy(BasicStrategy):
    @staticmethod
    def change_lights(crossing_state: CrossingState) -> None:
        """Changes intersection lights to green in direction where most cars are waiting."""
        most_cars_direction: Direction = sorted(
            crossing_state.cars_counter,
            key=crossing_state.cars_counter.get,
            reverse=True,
        )[0]
        if config.round_ct >= ONE_ROUND_CLOCK_TICKS:
            if crossing_state.lights_state == ALL_LIGHTS_YELLOW:
                if most_cars_direction in [Direction.N, Direction.S]:
                    print(
                        'Most of the cars are on North-South direction - strategy is to change these lights to green.'
                    )
                    crossing_state.lights_state = N_S_LIGHTS_GREEN
                else:
                    print(
                        'Most of the cars are on East-West direction - strategy is to change these lights to green.'
                    )
                    crossing_state.lights_state = E_W_LIGHTS_GREEN
            else:
                crossing_state.lights_state = ALL_LIGHTS_YELLOW
            config.round_ct = 0
