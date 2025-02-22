from enum import StrEnum


class LightState(StrEnum):
    """Enum representing possible light states."""

    RED = '🔴'
    YELLOW = '🟡'
    GREEN = '🟢'

    def __repr__(self) -> str:
        return self.value
