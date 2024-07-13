#include <iostream>
#include <string>
#include <unordered_map>
#include <memory>
#include <mutex>

class ConfigurationManager
{
private:
  static std::shared_ptr<ConfigurationManager> instance;
  static std::mutex mtx;
  std::unordered_map<std::string, int> settings;

  // Private constructor to prevent instantiation
  ConfigurationManager()
  {
    // Simulate loading settings from a file or remote server
    settings["server_url"] = 1; // Using int to simplify the example
    settings["timeout"] = 5000;
    settings["max_retries"] = 3;
  }

public:
  // Deleted copy constructor and assignment operator to prevent copying
  ConfigurationManager(const ConfigurationManager &) = delete;
  ConfigurationManager &operator=(const ConfigurationManager &) = delete;

  static std::shared_ptr<ConfigurationManager> get_instance()
  {
    std::lock_guard<std::mutex> lock(mtx);
    if (instance == nullptr)
    {
      instance = std::shared_ptr<ConfigurationManager>(new ConfigurationManager());
    }
    return instance;
  }

  int get_setting(const std::string &key)
  {
    return settings[key];
  }

  void set_setting(const std::string &key, int value)
  {
    settings[key] = value;
  }
};

// Initialize static members
std::shared_ptr<ConfigurationManager> ConfigurationManager::instance = nullptr;
std::mutex ConfigurationManager::mtx;

// Example usage
int main()
{
  auto config_manager1 = ConfigurationManager::get_instance();
  std::cout << "Server URL: " << config_manager1->get_setting("server_url") << std::endl;

  auto config_manager2 = ConfigurationManager::get_instance();
  std::cout << "Instances are the same: " << (config_manager1 == config_manager2) << std::endl;

  config_manager2->set_setting("timeout", 10000);
  std::cout << "Timeout: " << config_manager1->get_setting("timeout") << std::endl;

  return 0;
}
