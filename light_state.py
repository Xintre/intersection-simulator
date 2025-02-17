from enum import Enum


class LightState(Enum):
    RED = '🔴'
    YELLOW = '🟡'
    GREEN = '🟢'

    def __repr__(self) -> None:
        return self.value
