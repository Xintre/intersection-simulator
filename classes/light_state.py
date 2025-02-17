from enum import StrEnum


class LightsState(StrEnum):
    RED = '🔴'
    YELLOW = '🟡'
    GREEN = '🟢'

    def __repr__(self) -> str:
        return self.value
