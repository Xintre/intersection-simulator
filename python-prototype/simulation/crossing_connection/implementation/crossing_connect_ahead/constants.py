from simulation.direction import Direction
from simulation.light_state import LightState
from simulation.type_hints import LightsStateDict

N_S_LIGHTS_GREEN: LightsStateDict = {
    Direction.N: LightState.GREEN,
    Direction.S: LightState.GREEN,
    Direction.E: LightState.RED,
    Direction.W: LightState.RED,
}
E_W_LIGHTS_GREEN: LightsStateDict = {
    Direction.N: LightState.RED,
    Direction.S: LightState.RED,
    Direction.E: LightState.GREEN,
    Direction.W: LightState.GREEN,
}
