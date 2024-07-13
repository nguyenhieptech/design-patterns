#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>

// Observer Interface
class Observer
{
public:
  virtual ~Observer() = default;
  virtual void update(float temperature, float humidity, float pressure) = 0;
};

// Subject Interface
class Subject
{
public:
  virtual ~Subject() = default;
  virtual void registerObserver(std::shared_ptr<Observer> observer) = 0;
  virtual void removeObserver(std::shared_ptr<Observer> observer) = 0;
  virtual void notifyObservers() = 0;
};

// Concrete Subject: WeatherData
class WeatherData : public Subject
{
public:
  void registerObserver(std::shared_ptr<Observer> observer) override
  {
    observers.push_back(observer);
  }

  void removeObserver(std::shared_ptr<Observer> observer) override
  {
    observers.erase(
        std::remove(observers.begin(), observers.end(), observer),
        observers.end());
  }

  void notifyObservers() override
  {
    for (const auto &observer : observers)
    {
      observer->update(temperature, humidity, pressure);
    }
  }

  void setMeasurements(float temp, float hum, float pres)
  {
    temperature = temp;
    humidity = hum;
    pressure = pres;
    notifyObservers();
  }

private:
  std::vector<std::shared_ptr<Observer>> observers;
  float temperature = 0.0;
  float humidity = 0.0;
  float pressure = 0.0;
};

// Concrete Observer: CurrentConditionsDisplay
class CurrentConditionsDisplay : public Observer, public std::enable_shared_from_this<CurrentConditionsDisplay>
{
public:
  CurrentConditionsDisplay(std::shared_ptr<Subject> weatherData) : weatherData(weatherData)
  {
    weatherData->registerObserver(shared_from_this());
  }

  void update(float temp, float hum, float pres) override
  {
    temperature = temp;
    humidity = hum;
    display();
  }

  void display() const
  {
    std::cout << "Current conditions: " << temperature << "F degrees and " << humidity << "% humidity" << std::endl;
  }

private:
  float temperature = 0.0;
  float humidity = 0.0;
  std::shared_ptr<Subject> weatherData;
};

// Concrete Observer: StatisticsDisplay
class StatisticsDisplay : public Observer, public std::enable_shared_from_this<StatisticsDisplay>
{
public:
  StatisticsDisplay(std::shared_ptr<Subject> weatherData) : weatherData(weatherData)
  {
    weatherData->registerObserver(shared_from_this());
  }

  void update(float temp, float hum, float pres) override
  {
    temperature = temp;
    humidity = hum;
    pressure = pres;
    display();
  }

  void display() const
  {
    std::cout << "Statistics: " << temperature << "F, " << humidity << "%, " << pressure << "Pa" << std::endl;
  }

private:
  float temperature = 0.0;
  float humidity = 0.0;
  float pressure = 0.0;
  std::shared_ptr<Subject> weatherData;
};

// Example usage
int main()
{
  auto weatherData = std::make_shared<WeatherData>();

  auto currentDisplay = std::make_shared<CurrentConditionsDisplay>(weatherData);
  auto statisticsDisplay = std::make_shared<StatisticsDisplay>(weatherData);

  weatherData->setMeasurements(80, 65, 30.4);
  weatherData->setMeasurements(82, 70, 29.2);
  weatherData->setMeasurements(78, 90, 29.2);

  return 0;
}
