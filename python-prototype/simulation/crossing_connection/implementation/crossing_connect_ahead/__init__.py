from simulation.constants import ALL_LIGHTS_YELLOW

from ...base.base_crossing_connection import (
    BaseCrossingConnection,
)
from simulation.direction import Direction
from simulation.type_hints import CarsCounterDict, LightsStateDict

from .constants import N_S_LIGHTS_GREEN, E_W_LIGHTS_GREEN


class CrossingConnectAhead(BaseCrossingConnection):
    def getInitialLightsState(self):
        return N_S_LIGHTS_GREEN

    def move_cars(
        self, lights_state_dict: LightsStateDict, cars_counter_dict: CarsCounterDict
    ):
        if lights_state_dict == N_S_LIGHTS_GREEN:
            cars_counter_dict[Direction.N] = 0
            cars_counter_dict[Direction.S] = 0

        if lights_state_dict == E_W_LIGHTS_GREEN:
            cars_counter_dict[Direction.W] = 0
            cars_counter_dict[Direction.E] = 0

    def change_lights(
        self, lights_state_dict: LightsStateDict, winning_direction: Direction
    ) -> LightsStateDict:
        if lights_state_dict == ALL_LIGHTS_YELLOW:
            if winning_direction in [Direction.N, Direction.S]:
                print(
                    'Most of the cars are on North-South direction - strategy is to change these lights to green.'
                )

                return N_S_LIGHTS_GREEN
            else:
                print(
                    'Most of the cars are on East-West direction - strategy is to change these lights to green.'
                )

                return E_W_LIGHTS_GREEN
        else:
            return ALL_LIGHTS_YELLOW
