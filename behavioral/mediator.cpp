#include <iostream>
#include <memory>
#include <string>
#include <ctime>
#include <iomanip>
#include <sstream>

// Forward declaration of User to be used in ChatRoomMediator
class User;

// Mediator Interface
class ChatRoomMediator
{
public:
  virtual void showMessage(std::shared_ptr<User> user, const std::string &message) = 0;
  virtual ~ChatRoomMediator() = default;
};

// Concrete Mediator
class ChatRoom : public ChatRoomMediator
{
public:
  void showMessage(std::shared_ptr<User> user, const std::string &message) override;
};

// Colleague
class User : public std::enable_shared_from_this<User>
{
public:
  User(const std::string &name, std::shared_ptr<ChatRoomMediator> chatMediator)
      : name(name), chatMediator(chatMediator) {}

  std::string getName() const
  {
    return name;
  }

  void send(const std::string &message)
  {
    chatMediator->showMessage(shared_from_this(), message);
  }

private:
  std::string name;
  std::shared_ptr<ChatRoomMediator> chatMediator;
};

// Implementing the showMessage method
void ChatRoom::showMessage(std::shared_ptr<User> user, const std::string &message)
{
  std::time_t now = std::time(nullptr);
  std::tm now_tm;
#if defined(_WIN32) || defined(_WIN64)
  localtime_s(&now_tm, &now);
#else
  localtime_r(&now, &now_tm);
#endif

  std::ostringstream timeStream;
  timeStream << std::setw(2) << std::setfill('0') << now_tm.tm_hour << ":"
             << std::setw(2) << std::setfill('0') << now_tm.tm_min << ":"
             << std::setw(2) << std::setfill('0') << now_tm.tm_sec;

  std::cout << timeStream.str() << " [" << user->getName() << "]: " << message << std::endl;
}

// Example usage
int main()
{
  auto mediator = std::make_shared<ChatRoom>();

  auto user1 = std::make_shared<User>("User 1", mediator);
  auto user2 = std::make_shared<User>("User 2", mediator);

  user1->send("Hello, User 2!");
  user2->send("Hey, User 1!");

  return 0;
}
