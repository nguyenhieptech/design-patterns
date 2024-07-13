from abc import ABC, abstractmethod
from typing import Optional


# Command Interface
class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        pass

    @abstractmethod
    def undo(self) -> None:
        pass


# Receiver: Light
class Light:
    def turn_on(self) -> None:
        print("Light is On")

    def turn_off(self) -> None:
        print("Light is Off")


# Concrete Command: LightOnCommand
class LightOnCommand(Command):
    def __init__(self, light: Light):
        self.light = light

    def execute(self) -> None:
        self.light.turn_on()

    def undo(self) -> None:
        self.light.turn_off()


# Concrete Command: LightOffCommand
class LightOffCommand(Command):
    def __init__(self, light: Light):
        self.light = light

    def execute(self) -> None:
        self.light.turn_off()

    def undo(self) -> None:
        self.light.turn_on()


# Invoker: RemoteControl
class RemoteControl:
    def __init__(self):
        self.command: Optional[Command] = None

    def set_command(self, command: Command) -> None:
        self.command = command

    def press_button(self) -> None:
        if self.command:
            self.command.execute()

    def press_undo(self) -> None:
        if self.command:
            self.command.undo()


# Example usage
light = Light()
light_on = LightOnCommand(light)
light_off = LightOffCommand(light)

remote = RemoteControl()

remote.set_command(light_on)
remote.press_button()  # Light is On
remote.press_undo()  # Light is Off

remote.set_command(light_off)
remote.press_button()  # Light is Off
remote.press_undo()  # Light is On
