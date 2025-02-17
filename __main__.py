from classes.crossing_state import CrossingState
from classes.car import Car
from classes.direction import Direction
from strategies.most_cars_win_strategy import MostCarsWinStrategy
from time import sleep
import config

# TODO change to add cars randomly
crossing_state: CrossingState = CrossingState()
car_1: Car = Car(start=Direction.E, destination=Direction.W)
car_2: Car = Car(start=Direction.E, destination=Direction.W)
car_3: Car = Car(start=Direction.E, destination=Direction.W)
car_4: Car = Car(start=Direction.N, destination=Direction.W)

crossing_state.add_car(car_1)
crossing_state.add_car(car_2)
crossing_state.add_car(car_3)
crossing_state.add_car(car_4)

config.round_ct: int = 0
while True:
    print(f'==================== Round {config.round_ct} ====================')
    print(crossing_state)
    MostCarsWinStrategy.change_lights(crossing_state=crossing_state)
    config.round_ct += 1
    sleep(1.5)
