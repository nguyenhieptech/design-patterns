// Observer Interface
interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;
}

// Subject Interface
interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

// Concrete Subject: WeatherData
class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  setMeasurements(temp: number, hum: number, pres: number): void {
    this.temperature = temp;
    this.humidity = hum;
    this.pressure = pres;
    this.notifyObservers();
  }
}

// Concrete Observer: CurrentConditionsDisplay
class CurrentConditionsDisplay implements Observer {
  private temperature: number = 0;
  private humidity: number = 0;

  constructor(weatherData: Subject) {
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }

  display(): void {
    console.log(
      `Current conditions: ${this.temperature}F degrees and ${this.humidity}% humidity`
    );
  }
}

// Concrete Observer: StatisticsDisplay
class StatisticsDisplay implements Observer {
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  constructor(weatherData: Subject) {
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  display(): void {
    console.log(
      `Statistics: ${this.temperature}F, ${this.humidity}%, ${this.pressure}Pa`
    );
  }
}

// Example usage
const weatherData = new WeatherData();

const currentDisplay = new CurrentConditionsDisplay(weatherData);
const statisticsDisplay = new StatisticsDisplay(weatherData);

weatherData.setMeasurements(80, 65, 30.4);
weatherData.setMeasurements(82, 70, 29.2);
weatherData.setMeasurements(78, 90, 29.2);
