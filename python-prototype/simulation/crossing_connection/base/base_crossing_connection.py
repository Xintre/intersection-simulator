from abc import ABC, abstractmethod

from simulation.config import Config
from simulation.direction import Direction
from simulation.type_hints import LightsStateDict


class BaseCrossingConnection(ABC):
    """Base class for crossing types that specifies possible light switching patterns."""

    def __init__(self):
        super().__init__()

        self.config = Config()

    @abstractmethod
    def get_initial_lights_state(self) -> LightsStateDict: ...

    @abstractmethod
    def move_cars(self, lights_state_dict: LightsStateDict) -> None: ...

    @abstractmethod
    def change_lights(
        self, lights_state_dict: LightsStateDict, winning_direction: Direction
    ):
        """Changes intersection lights to green in direction where most cars are waiting.

        Returns new lights_state_dict value that should be updated.
        """
        ...
