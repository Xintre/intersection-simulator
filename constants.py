from typing import Dict
from classes.direction import Direction
from classes.lights import LightState
from classes.car import Car
from type_hints import LightsStateType, CarsCounterType

ONE_ROUND_CLOCK_TICKS: int = 3
CAR_PASS_CLOCK_TICKS: int = 2

STARTING_LIGHTS_STATE: LightsStateType = {
    Direction.N: LightState.GREEN, Direction.S: LightState.GREEN, Direction.E: LightState.RED, Direction.W: LightState.RED}
STARTING_CARS_COUNTER: CarsCounterType = {
    Direction.N: 0, Direction.E: 0, Direction.S: 0, Direction.W: 0}
