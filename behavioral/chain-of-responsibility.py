from abc import ABC, abstractmethod
from typing import Optional


# Abstract Handler
class SupportHandler(ABC):
    def __init__(self):
        self._next_handler: Optional[SupportHandler] = None

    def set_next(self, handler: "SupportHandler") -> "SupportHandler":
        self._next_handler = handler
        return handler

    @abstractmethod
    def handle_request(self, severity: str) -> None:
        if self._next_handler:
            self._next_handler.handle_request(severity)


# Concrete Handler: LowLevelSupport
class LowLevelSupport(SupportHandler):
    def handle_request(self, severity: str) -> None:
        if severity == "low":
            print("LowLevelSupport: Handling low severity ticket")
        elif self._next_handler:
            self._next_handler.handle_request(severity)


# Concrete Handler: MidLevelSupport
class MidLevelSupport(SupportHandler):
    def handle_request(self, severity: str) -> None:
        if severity == "medium":
            print("MidLevelSupport: Handling medium severity ticket")
        elif self._next_handler:
            self._next_handler.handle_request(severity)


# Concrete Handler: HighLevelSupport
class HighLevelSupport(SupportHandler):
    def handle_request(self, severity: str) -> None:
        if severity == "high":
            print("HighLevelSupport: Handling high severity ticket")
        elif self._next_handler:
            self._next_handler.handle_request(severity)


# Example usage
low_level = LowLevelSupport()
mid_level = MidLevelSupport()
high_level = HighLevelSupport()

low_level.set_next(mid_level).set_next(high_level)

low_level.handle_request("low")
low_level.handle_request("medium")
low_level.handle_request("high")
