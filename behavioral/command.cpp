#include <iostream>
#include <memory>

// Command Interface
class Command
{
public:
  virtual ~Command() = default;
  virtual void execute() = 0;
  virtual void undo() = 0;
};

// Receiver: Light
class Light
{
public:
  void turnOn()
  {
    std::cout << "Light is On" << std::endl;
  }

  void turnOff()
  {
    std::cout << "Light is Off" << std::endl;
  }
};

// Concrete Command: LightOnCommand
class LightOnCommand : public Command
{
public:
  LightOnCommand(Light *light) : light(light) {}

  void execute() override
  {
    light->turnOn();
  }

  void undo() override
  {
    light->turnOff();
  }

private:
  Light *light;
};

// Concrete Command: LightOffCommand
class LightOffCommand : public Command
{
public:
  LightOffCommand(Light *light) : light(light) {}

  void execute() override
  {
    light->turnOff();
  }

  void undo() override
  {
    light->turnOn();
  }

private:
  Light *light;
};

// Invoker: RemoteControl
class RemoteControl
{
public:
  void setCommand(std::shared_ptr<Command> command)
  {
    this->command = command;
  }

  void pressButton()
  {
    if (command)
    {
      command->execute();
    }
  }

  void pressUndo()
  {
    if (command)
    {
      command->undo();
    }
  }

private:
  std::shared_ptr<Command> command;
};

// Example usage
int main()
{
  auto light = std::make_shared<Light>();
  auto lightOn = std::make_shared<LightOnCommand>(light.get());
  auto lightOff = std::make_shared<LightOffCommand>(light.get());

  RemoteControl remote;

  remote.setCommand(lightOn);
  remote.pressButton(); // Light is On
  remote.pressUndo();   // Light is Off

  remote.setCommand(lightOff);
  remote.pressButton(); // Light is Off
  remote.pressUndo();   // Light is On

  return 0;
}
