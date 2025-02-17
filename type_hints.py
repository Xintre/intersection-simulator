from typing import TypeAlias, Dict
from classes.direction import Direction
from classes.lights import LightState
from classes.car import Car

LightsStateType: TypeAlias = Dict[Direction, LightState]
CarsCounterType: TypeAlias = Dict[Direction, Car]
