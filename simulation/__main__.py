from time import sleep

from simulation.crossing_connection.implementation.crossing_connect_ahead import (
    CrossingConnectAhead,
)
from simulation.switching_strategy.implementation.most_cars_win_strategy import (
    MostCarsWinSwitchingStrategy,
)

from .errors.simulation_end import SimulationEnd
from .intersection import Intersection

intersection = Intersection(
    CrossingConnectionImplementation=CrossingConnectAhead,
    SwitchingStrategyImplementation=MostCarsWinSwitchingStrategy,
)

for i in range(0, 5):
    intersection.crossing_state.add_random_car()

while True:
    try:
        intersection.run()
    except SimulationEnd:
        print('Simulation finished!')
        break

    sleep(1.5)
