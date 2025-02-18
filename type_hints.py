from typing import Dict, TypeAlias

from classes.car import Car
from classes.direction import Direction
from classes.lights import LightState

LightsStateType: TypeAlias = Dict[Direction, LightState]
CarsCounterType: TypeAlias = Dict[Direction, Car]
