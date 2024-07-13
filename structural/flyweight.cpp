#include <iostream>
#include <unordered_map>
#include <vector>
#include <memory>

// Flyweight class
class CharacterFormat
{
public:
  CharacterFormat(const std::string &font, int size, const std::string &color)
      : font_(font), size_(size), color_(color) {}

  void display() const
  {
    std::cout << "Font: " << font_ << ", Size: " << size_ << ", Color: " << color_ << std::endl;
  }

private:
  std::string font_;
  int size_;
  std::string color_;
};

// Flyweight Factory class
class CharacterFormatFactory
{
public:
  std::shared_ptr<CharacterFormat> getCharacterFormat(const std::string &font, int size, const std::string &color)
  {
    std::string key = font + std::to_string(size) + color;
    if (formats_.find(key) == formats_.end())
    {
      formats_[key] = std::make_shared<CharacterFormat>(font, size, color);
    }
    return formats_[key];
  }

private:
  std::unordered_map<std::string, std::shared_ptr<CharacterFormat>> formats_;
};

// Client class
class Character
{
public:
  Character(char symbol, std::shared_ptr<CharacterFormat> format)
      : symbol_(symbol), format_(format) {}

  void display() const
  {
    std::cout << "Character: " << symbol_ << " ";
    format_->display();
  }

private:
  char symbol_;
  std::shared_ptr<CharacterFormat> format_;
};

int main()
{
  CharacterFormatFactory factory;

  std::vector<Character> text;
  text.emplace_back('H', factory.getCharacterFormat("Arial", 12, "Black"));
  text.emplace_back('e', factory.getCharacterFormat("Arial", 12, "Black"));
  text.emplace_back('l', factory.getCharacterFormat("Arial", 12, "Black"));
  text.emplace_back('l', factory.getCharacterFormat("Arial", 12, "Black"));
  text.emplace_back('o', factory.getCharacterFormat("Arial", 12, "Black"));

  for (const auto &character : text)
  {
    character.display();
  }

  return 0;
}
