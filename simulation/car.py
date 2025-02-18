from .direction import Direction


class Car:
    """Class representing a car."""

    start: Direction
    destination: Direction
    round_ct: int

    def __init__(self, start: str, destination: str) -> None:
        self.start = start
        self.destination = destination
        self.round_ct = 0
