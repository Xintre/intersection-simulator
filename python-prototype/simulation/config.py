class Config:
    """Singleton class that contains all the configuration values for the application."""

    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Config, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

    round_ct: int = 0
