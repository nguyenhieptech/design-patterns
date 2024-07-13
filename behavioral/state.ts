// State Interface
interface TrafficLightState {
  changeState(trafficLight: TrafficLight): void;
}

// Context (Context Interface and Concrete State)
class TrafficLight {
  private state: TrafficLightState;

  constructor() {
    this.state = new RedLightState();
  }

  public setState(state: TrafficLightState): void {
    this.state = state;
  }

  public change(): void {
    this.state.changeState(this);
  }
}

// Concrete States
class RedLightState implements TrafficLightState {
  public changeState(trafficLight: TrafficLight): void {
    console.log("Red Light - Stop");
    trafficLight.setState(new GreenLightState());
  }
}

class GreenLightState implements TrafficLightState {
  public changeState(trafficLight: TrafficLight): void {
    console.log("Green Light - Go");
    trafficLight.setState(new YellowLightState());
  }
}

class YellowLightState implements TrafficLightState {
  public changeState(trafficLight: TrafficLight): void {
    console.log("Yellow Light - Prepare to stop");
    trafficLight.setState(new RedLightState());
  }
}

// Example usage
const trafficLight = new TrafficLight();

trafficLight.change(); // Output: Red Light - Stop
trafficLight.change(); // Output: Green Light - Go
trafficLight.change(); // Output: Yellow Light - Prepare to stop
trafficLight.change(); // Output: Red Light - Stop
