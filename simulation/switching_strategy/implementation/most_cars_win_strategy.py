from ...crossing_state import CrossingState
from ...direction import Direction

from ..base.base_switching_strategy import BaseSwitchingStrategy


class MostCarsWinSwitchingStrategy(BaseSwitchingStrategy):
    """Strategy that changes lights to green in direction where most cars are waiting."""

    def __init__(self):
        super().__init__()

    def calculate_winning_direction(self, crossing_state: CrossingState) -> Direction:
        return sorted(
            crossing_state.cars_counter_dict,
            key=crossing_state.cars_counter_dict.get,
            reverse=True,
        )[0]
