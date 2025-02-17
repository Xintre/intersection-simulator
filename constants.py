from typing import Dict
from classes.direction import Direction
from classes.lights import LightState
from classes.car import Car
from type_hints import LightsStateType, CarsCounterType

ONE_ROUND_CLOCK_TICKS: int = 3
CAR_PASS_CLOCK_TICKS: int = 2

STARTING_CARS_COUNTER: CarsCounterType = {
    Direction.N: 0, Direction.E: 0, Direction.S: 0, Direction.W: 0}

N_S_LIGHTS_GREEN: LightsStateType = {
    Direction.N: LightState.GREEN, Direction.S: LightState.GREEN, Direction.E: LightState.RED, Direction.W: LightState.RED}
E_W_LIGHTS_GREEN: LightsStateType = {
    Direction.N: LightState.RED, Direction.S: LightState.RED, Direction.E: LightState.GREEN, Direction.W: LightState.GREEN}
ALL_LIGHTS_YELLOW: LightsStateType = {
    Direction.N: LightState.YELLOW, Direction.S: LightState.YELLOW, Direction.E: LightState.YELLOW, Direction.W: LightState.YELLOW}
