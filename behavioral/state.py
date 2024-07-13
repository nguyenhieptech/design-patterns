from __future__ import annotations
from abc import ABC, abstractmethod


# State Interface
class TrafficLightState(ABC):
    @abstractmethod
    def change_state(self, traffic_light: TrafficLight) -> None:
        pass


# Context (Context Interface and Concrete State)
class TrafficLight:
    def __init__(self) -> None:
        self._state: TrafficLightState = RedLightState()

    def set_state(self, state: TrafficLightState) -> None:
        self._state = state

    def change(self) -> None:
        self._state.change_state(self)


# Concrete States
class RedLightState(TrafficLightState):
    def change_state(self, traffic_light: TrafficLight) -> None:
        print("Red Light - Stop")
        traffic_light.set_state(GreenLightState())


class GreenLightState(TrafficLightState):
    def change_state(self, traffic_light: TrafficLight) -> None:
        print("Green Light - Go")
        traffic_light.set_state(YellowLightState())


class YellowLightState(TrafficLightState):
    def change_state(self, traffic_light: TrafficLight) -> None:
        print("Yellow Light - Prepare to stop")
        traffic_light.set_state(RedLightState())


# Example usage
traffic_light = TrafficLight()

traffic_light.change()  # Output: Red Light - Stop
traffic_light.change()  # Output: Green Light - Go
traffic_light.change()  # Output: Yellow Light - Prepare to stop
traffic_light.change()  # Output: Red Light - Stop
