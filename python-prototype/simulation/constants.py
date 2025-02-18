from .direction import Direction
from .light_state import LightState
from .type_hints import CarsCounterDict, LightsStateDict

ONE_ROUND_CLOCK_TICKS: int = 3
CAR_PASS_CLOCK_TICKS: int = 2

STARTING_CARS_COUNTER: CarsCounterDict = {
    Direction.N: 0,
    Direction.E: 0,
    Direction.S: 0,
    Direction.W: 0,
}

ALL_LIGHTS_YELLOW: LightsStateDict = {
    Direction.N: LightState.YELLOW,
    Direction.S: LightState.YELLOW,
    Direction.E: LightState.YELLOW,
    Direction.W: LightState.YELLOW,
}
