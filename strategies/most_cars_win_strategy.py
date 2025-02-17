from .basic_strategy import BasicStrategy
from classes.lights import AllLightsState
from classes.direction import Direction
from classes.crossing_state import CrossingState
from constants import ALL_LIGHTS_YELLOW, E_W_LIGHTS_GREEN, N_S_LIGHTS_GREEN


class MostCarsWinStrategy(BasicStrategy):
    @staticmethod
    def change_lights(crossing_state: CrossingState) -> None:
        """
        Changes intersection lights to green in direction where most cars are waiting.
        """
        most_cars_direction: Direction = sorted(crossing_state.cars_counter,
                                                key=crossing_state.cars_counter.get)[0]
        if crossing_state.round_ct >= 3:
            if crossing_state.all_lights_state == AllLightsState.YELLOW:
                if most_cars_direction in [Direction.N, Direction.S]:
                    crossing_state.lights_state = N_S_LIGHTS_GREEN
                else:
                    crossing_state.lights_state = E_W_LIGHTS_GREEN
                crossing_state.round_ct = 0
            else:
                crossing_state.lights_state = ALL_LIGHTS_YELLOW
                crossing_state.round_ct = 0
