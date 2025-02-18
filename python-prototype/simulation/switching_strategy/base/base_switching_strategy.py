from abc import ABC, abstractmethod

from simulation.direction import Direction

from ...config import Config
from ...crossing_state import CrossingState


class BaseSwitchingStrategy(ABC):
    def __init__(self):
        super().__init__()

        self.config = Config()

    @abstractmethod
    def calculate_winning_direction(self, crossing_state: CrossingState) -> Direction:
        """Returns direction that should be enabled (green) ASAP."""
        ...
