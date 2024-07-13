#include <iostream>
#include <memory>
#include <string>

// Abstract Handler
class SupportHandler
{
public:
  virtual ~SupportHandler() = default;

  void setNext(std::shared_ptr<SupportHandler> handler)
  {
    nextHandler = handler;
  }

  virtual void handleRequest(const std::string &severity)
  {
    if (nextHandler)
    {
      nextHandler->handleRequest(severity);
    }
  }

protected:
  std::shared_ptr<SupportHandler> nextHandler;
};

// Concrete Handler: LowLevelSupport
class LowLevelSupport : public SupportHandler
{
public:
  void handleRequest(const std::string &severity) override
  {
    if (severity == "low")
    {
      std::cout << "LowLevelSupport: Handling low severity ticket" << std::endl;
    }
    else if (nextHandler)
    {
      nextHandler->handleRequest(severity);
    }
  }
};

// Concrete Handler: MidLevelSupport
class MidLevelSupport : public SupportHandler
{
public:
  void handleRequest(const std::string &severity) override
  {
    if (severity == "medium")
    {
      std::cout << "MidLevelSupport: Handling medium severity ticket" << std::endl;
    }
    else if (nextHandler)
    {
      nextHandler->handleRequest(severity);
    }
  }
};

// Concrete Handler: HighLevelSupport
class HighLevelSupport : public SupportHandler
{
public:
  void handleRequest(const std::string &severity) override
  {
    if (severity == "high")
    {
      std::cout << "HighLevelSupport: Handling high severity ticket" << std::endl;
    }
    else if (nextHandler)
    {
      nextHandler->handleRequest(severity);
    }
  }
};

// Example usage
int main()
{
  auto lowLevel = std::make_shared<LowLevelSupport>();
  auto midLevel = std::make_shared<MidLevelSupport>();
  auto highLevel = std::make_shared<HighLevelSupport>();

  lowLevel->setNext(midLevel);
  midLevel->setNext(highLevel);

  lowLevel->handleRequest("low");    // Output: LowLevelSupport: Handling low severity ticket
  lowLevel->handleRequest("medium"); // Output: MidLevelSupport: Handling medium severity ticket
  lowLevel->handleRequest("high");   // Output: HighLevelSupport: Handling high severity ticket

  return 0;
}
