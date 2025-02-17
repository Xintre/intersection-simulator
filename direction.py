from enum import StrEnum


class Direction(StrEnum):
    N = 'N'
    E = 'E'
    S = 'S'
    W = 'W'

    def __repr__(self) -> str:
        return self.value
