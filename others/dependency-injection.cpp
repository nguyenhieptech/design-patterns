#include <iostream>
#include <memory>
#include <string>

// Logger interface
class Logger
{
public:
  virtual void log(const std::string &message) const = 0;
  virtual ~Logger() = default;
};

// ConsoleLogger implementation
class ConsoleLogger : public Logger
{
public:
  void log(const std::string &message) const override
  {
    std::cout << "[Console Logger] " << message << std::endl;
  }
};

// FileLogger implementation
class FileLogger : public Logger
{
public:
  void log(const std::string &message) const override
  {
    std::cout << "[File Logger] " << message << std::endl;
    // Logic to log message to a file
  }
};

// Class that requires logging functionality using Dependency Injection
class SomeService
{
public:
  SomeService(std::shared_ptr<Logger> logger) : logger_(std::move(logger)) {}

  void doSomething() const
  {
    logger_->log("Doing something...");
  }

private:
  std::shared_ptr<Logger> logger_;
};

// Example usage with Dependency Injection
int main()
{
  auto consoleLogger = std::make_shared<ConsoleLogger>();
  auto fileLogger = std::make_shared<FileLogger>();

  SomeService serviceWithConsoleLogger(consoleLogger);
  serviceWithConsoleLogger.doSomething();

  SomeService serviceWithFileLogger(fileLogger);
  serviceWithFileLogger.doSomething();

  return 0;
}
