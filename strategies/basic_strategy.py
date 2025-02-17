from abc import ABC, abstractmethod
from classes.crossing_state import CrossingState


class BasicStrategy(ABC):
    @abstractmethod
    def change_lights(corssing_state: CrossingState) -> None:
        """
        Updates intersection lights basing on applied strategy.
        """
        pass
