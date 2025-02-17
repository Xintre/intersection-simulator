from enum import StrEnum


class LightState(StrEnum):
    RED = '🔴'
    YELLOW = '🟡'
    GREEN = '🟢'

    def __repr__(self) -> str:
        return self.value
