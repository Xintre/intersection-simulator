from abc import ABC, abstractmethod
from classes.crossing_state import CrossingState


class BasicStrategy(ABC):
    @abstractmethod
    def change_lights(corssing_state: CrossingState) -> None:
        """
        Updates intersection lights basing on applied strategy.
        """
        pass

    @staticmethod
    def check_and_delete_obsolete_cars(crossing_state: CrossingState) -> None:
        """
        Checks and deletes cars from the intersection.
        """
        pass
