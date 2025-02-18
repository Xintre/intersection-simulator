from typing import Dict, TypeAlias

from .car import Car
from .direction import Direction
from .light_state import LightState

LightsStateDict: TypeAlias = Dict[Direction, LightState]
CarsCounterDict: TypeAlias = Dict[Direction, Car]
