from enum import StrEnum, Enum, auto


class LightState(StrEnum):
    RED = '🔴'
    YELLOW = '🟡'
    GREEN = '🟢'

    def __repr__(self) -> str:
        return self.value

class AllLightsState(Enum):
    N_S_GREEN = auto()
    W_E_GREEN = auto()
    ALL_YELLOW = auto()
