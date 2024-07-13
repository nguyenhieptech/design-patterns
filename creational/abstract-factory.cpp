#include <iostream>

// Abstract Product: Button
class Button
{
public:
  virtual void render() = 0;
  virtual ~Button() {}
};

// Concrete Product: Web Button
class WebButton : public Button
{
public:
  void render() override
  {
    std::cout << "Rendering a web button." << std::endl;
  }
};

// Concrete Product: Mobile Button
class MobileButton : public Button
{
public:
  void render() override
  {
    std::cout << "Rendering a mobile button." << std::endl;
  }
};

// Abstract Product: InputField
class InputField
{
public:
  virtual void render() = 0;
  virtual ~InputField() {}
};

// Concrete Product: Web InputField
class WebInputField : public InputField
{
public:
  void render() override
  {
    std::cout << "Rendering a web input field." << std::endl;
  }
};

// Concrete Product: Mobile InputField
class MobileInputField : public InputField
{
public:
  void render() override
  {
    std::cout << "Rendering a mobile input field." << std::endl;
  }
};

// Abstract Factory Interface
class UIComponentFactory
{
public:
  virtual Button *createButton() = 0;
  virtual InputField *createInputField() = 0;
  virtual ~UIComponentFactory() {}
};

// Concrete Factory for Web
class WebUIComponentFactory : public UIComponentFactory
{
public:
  Button *createButton() override
  {
    return new WebButton();
  }

  InputField *createInputField() override
  {
    return new WebInputField();
  }
};

// Concrete Factory for Mobile
class MobileUIComponentFactory : public UIComponentFactory
{
public:
  Button *createButton() override
  {
    return new MobileButton();
  }

  InputField *createInputField() override
  {
    return new MobileInputField();
  }
};

// Client
class UIManager
{
private:
  UIComponentFactory *_factory;

public:
  UIManager(UIComponentFactory *factory) : _factory(factory) {}

  void renderUI()
  {
    Button *button = _factory->createButton();
    InputField *inputField = _factory->createInputField();

    button->render();
    inputField->render();

    delete button;
    delete inputField;
  }

  ~UIManager()
  {
    delete _factory;
  }
};

// Example Usage
int main()
{
  UIManager *webUIManager = new UIManager(new WebUIComponentFactory());
  webUIManager->renderUI();

  UIManager *mobileUIManager = new UIManager(new MobileUIComponentFactory());
  mobileUIManager->renderUI();

  delete webUIManager;
  delete mobileUIManager;

  return 0;
}
