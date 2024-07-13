from __future__ import annotations
from typing import Protocol


class Observer(Protocol):
    def update(self, temperature: float, humidity: float, pressure: float) -> None: ...


class Subject(Protocol):
    def register_observer(self, observer: Observer) -> None: ...

    def remove_observer(self, observer: Observer) -> None: ...

    def notify_observers(self) -> None: ...


class WeatherData(Subject):
    def __init__(self) -> None:
        self._observers: list[Observer] = []
        self._temperature: float = 0.0
        self._humidity: float = 0.0
        self._pressure: float = 0.0

    def register_observer(self, observer: Observer) -> None:
        self._observers.append(observer)

    def remove_observer(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify_observers(self) -> None:
        for observer in self._observers:
            observer.update(self._temperature, self._humidity, self._pressure)

    def set_measurements(
        self, temperature: float, humidity: float, pressure: float
    ) -> None:
        self._temperature = temperature
        self._humidity = humidity
        self._pressure = pressure
        self.notify_observers()


class CurrentConditionsDisplay(Observer):
    def __init__(self, weather_data: Subject) -> None:
        self._temperature: float = 0.0
        self._humidity: float = 0.0
        weather_data.register_observer(self)

    def update(self, temperature: float, humidity: float, pressure: float) -> None:
        self._temperature = temperature
        self._humidity = humidity
        self.display()

    def display(self) -> None:
        print(
            f"Current conditions: {self._temperature}F degrees and {self._humidity}% humidity"
        )


class StatisticsDisplay(Observer):
    def __init__(self, weather_data: Subject) -> None:
        self._temperature: float = 0.0
        self._humidity: float = 0.0
        self._pressure: float = 0.0
        weather_data.register_observer(self)

    def update(self, temperature: float, humidity: float, pressure: float) -> None:
        self._temperature = temperature
        self._humidity = humidity
        self._pressure = pressure
        self.display()

    def display(self) -> None:
        print(
            f"Statistics: {self._temperature}F, {self._humidity}%, {self._pressure}Pa"
        )


# Example usage
weather_data = WeatherData()

current_display = CurrentConditionsDisplay(weather_data)
statistics_display = StatisticsDisplay(weather_data)

weather_data.set_measurements(80, 65, 30.4)
weather_data.set_measurements(82, 70, 29.2)
weather_data.set_measurements(78, 90, 29.2)
