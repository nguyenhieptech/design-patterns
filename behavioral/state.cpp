#include <iostream>
#include <memory>

// Forward declaration of TrafficLight to be used in the state classes
class TrafficLight;

// State Interface
class TrafficLightState
{
public:
  virtual void changeState(TrafficLight &trafficLight) = 0;
  virtual ~TrafficLightState() = default;
};

// Concrete States
class RedLightState : public TrafficLightState
{
public:
  void changeState(TrafficLight &trafficLight) override;
};

class GreenLightState : public TrafficLightState
{
public:
  void changeState(TrafficLight &trafficLight) override;
};

class YellowLightState : public TrafficLightState
{
public:
  void changeState(TrafficLight &trafficLight) override;
};

// Context
class TrafficLight
{
private:
  std::unique_ptr<TrafficLightState> state;

public:
  TrafficLight() : state(std::make_unique<RedLightState>()) {}

  void setState(std::unique_ptr<TrafficLightState> newState)
  {
    state = std::move(newState);
  }

  void change()
  {
    state->changeState(*this);
  }

  void displayState(const std::string &stateName)
  {
    std::cout << stateName << std::endl;
  }
};

// Implementing the changeState methods
void RedLightState::changeState(TrafficLight &trafficLight)
{
  trafficLight.displayState("Red Light - Stop");
  trafficLight.setState(std::make_unique<GreenLightState>());
}

void GreenLightState::changeState(TrafficLight &trafficLight)
{
  trafficLight.displayState("Green Light - Go");
  trafficLight.setState(std::make_unique<YellowLightState>());
}

void YellowLightState::changeState(TrafficLight &trafficLight)
{
  trafficLight.displayState("Yellow Light - Prepare to stop");
  trafficLight.setState(std::make_unique<RedLightState>());
}

// Example usage
int main()
{
  TrafficLight trafficLight;

  trafficLight.change(); // Output: Red Light - Stop
  trafficLight.change(); // Output: Green Light - Go
  trafficLight.change(); // Output: Yellow Light - Prepare to stop
  trafficLight.change(); // Output: Red Light - Stop

  return 0;
}
