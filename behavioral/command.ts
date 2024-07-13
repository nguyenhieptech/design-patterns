// Sure! Let's consider a real-life example of a Command pattern in the context of a home automation system.
// The home automation system allows users to control various devices, such as lights,
// heaters, and security systems, using a remote control.
// The Command pattern can be used to encapsulate requests as objects,
// allowing users to parameterize and queue requests, as well as support undo operations.

// In this example:
// The Light class acts as the Receiver, representing a device that can be controlled.
// The Command interface defines the common interface for all commands, specifying execute() and undo() methods.
// The concrete commands TurnOnLightCommand and TurnOffLightCommand encapsulate requests to turn the light on and off, respectively.
// The RemoteControl class acts as the Invoker, which stores and executes commands.
// It also provides an addCommand() method to add commands to the queue and pressUndoButton() to undo the last command executed.
// In the example usage, we create a Light object and two concrete command objects (TurnOnLightCommand and TurnOffLightCommand).
// We add these commands to the RemoteControl, press buttons to execute the commands, and press the undo button to undo the last command executed.
// This pattern allows for decoupling between the sender (client), receiver (light), and invoker (remote control),
// providing flexibility, extensibility, and support for undo operations in the home automation system.

// Receiver: Light
class Light {
  turnOn(): void {
    console.log("Light is ON");
  }

  turnOff(): void {
    console.log("Light is OFF");
  }
}

// Command Interface
interface Command {
  execute(): void;
  undo(): void;
}

// Concrete Command: TurnOnLightCommand
class TurnOnLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }

  undo(): void {
    this.light.turnOff();
  }
}

// Concrete Command: TurnOffLightCommand
class TurnOffLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }

  undo(): void {
    this.light.turnOn();
  }
}

// Invoker: RemoteControl
class RemoteControl {
  private commands: Command[] = [];

  addCommand(command: Command): void {
    this.commands.push(command);
  }

  pressButton(): void {
    if (this.commands.length > 0) {
      const command = this.commands.pop();
      command?.execute();
    } else {
      console.log("No command to execute");
    }
  }

  pressUndoButton(): void {
    if (this.commands.length > 0) {
      const lastCommand = this.commands[this.commands.length - 1];
      lastCommand.undo();
    } else {
      console.log("No command to undo");
    }
  }
}

// Example Usage
const light = new Light();
const turnOnCommand = new TurnOnLightCommand(light);
const turnOffCommand = new TurnOffLightCommand(light);

const remoteControl = new RemoteControl();
remoteControl.addCommand(turnOnCommand);
remoteControl.addCommand(turnOffCommand);

remoteControl.pressButton(); // Turns on the light
remoteControl.pressButton(); // Turns off the light
remoteControl.pressUndoButton(); // Undo turning off the light
remoteControl.pressUndoButton(); // Undo turning on the light
