from typing import Any


class ConfigurationManager:
    _instance = None
    _settings: dict[str, Any]

    def __init__(self):
        # Simulate loading settings from a file or remote server
        self._settings = {
            "server_url": "https://example.com",
            "timeout": 5000,
            "max_retries": 3,
        }

    @classmethod
    def get_instance(cls) -> "ConfigurationManager":
        if cls._instance is None:
            cls._instance = ConfigurationManager()
        return cls._instance

    def get_setting(self, key: str) -> Any:
        return self._settings[key]

    def set_setting(self, key: str, value: Any) -> None:
        self._settings[key] = value


# Example usage
config_manager1 = ConfigurationManager.get_instance()
print(config_manager1.get_setting("server_url"))  # Output: https://example.com

config_manager2 = ConfigurationManager.get_instance()
print(config_manager1 is config_manager2)  # Output: True

config_manager2.set_setting("timeout", 10000)
print(config_manager1.get_setting("timeout"))  # Output: 10000
