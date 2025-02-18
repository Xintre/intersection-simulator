from classes.crossing_state import CrossingState
from classes.car import Car
from classes.direction import Direction
from strategies.most_cars_win_strategy import MostCarsWinStrategy
from time import sleep
import config

crossing_state: CrossingState = CrossingState()

for i in range(0, 5):
    crossing_state.add_random_car()

while True:
    if crossing_state.check_if_there_are_any_cars():
        print(crossing_state)
        print('No more cars at the intersection🚗')
        break
    print(f'==================== Round {config.round_ct} ====================')
    print(crossing_state)
    MostCarsWinStrategy.change_lights(crossing_state=crossing_state)
    crossing_state.check_and_delete_obsolete_cars()
    config.round_ct += 1
    sleep(1.5)
