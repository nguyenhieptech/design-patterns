// Generated by ChatGPT: Give me code example for Abstract Factory design pattern in TypeScript.
// Example with useful and real life would be better (like which part of a library use this pattern).
// Sure! Let's consider a real-life example of an Abstract Factory pattern in a library for UI components.
// We'll create a simple UI library that can generate different types of buttons and input fields based on the user's platform: web or mobile.

// In this example:
// We define an abstract factory UIComponentFactory which declares methods to
// create different UI components like buttons and input fields.
// We have concrete factories WebUIComponentFactory and MobileUIComponentFactory that implement UIComponentFactory.
// Each factory is responsible for creating UI components appropriate for its platform.
// We define abstract products Button and InputField with
// concrete implementations WebButton, MobileButton, WebInputField, and MobileInputField.
// The UIManager class acts as a client that uses the abstract factory to create UI components.
// It doesn't need to know the specific platform or implementation details, thanks to the abstract factory pattern.
// This pattern allows us to add new platforms or UI components
// without modifying existing code, promoting flexibility and scalability

// Abstract Factory Interface
interface UIComponentFactory {
  createButton(): Button;
  createInputField(): InputField;
}

// Concrete Factory for Web
class WebUIComponentFactory implements UIComponentFactory {
  createButton(): Button {
    return new WebButton();
  }

  createInputField(): InputField {
    return new WebInputField();
  }
}

// Concrete Factory for Mobile
class MobileUIComponentFactory implements UIComponentFactory {
  createButton(): Button {
    return new MobileButton();
  }

  createInputField(): InputField {
    return new MobileInputField();
  }
}

// Abstract Product: Button
interface Button {
  render(): void;
}

// Concrete Product: Web Button
class WebButton implements Button {
  render(): void {
    console.log("Rendering a web button.");
  }
}

// Concrete Product: Mobile Button
class MobileButton implements Button {
  render(): void {
    console.log("Rendering a mobile button.");
  }
}

// Abstract Product: InputField
interface InputField {
  render(): void;
}

// Concrete Product: Web InputField
class WebInputField implements InputField {
  render(): void {
    console.log("Rendering a web input field.");
  }
}

// Concrete Product: Mobile InputField
class MobileInputField implements InputField {
  render(): void {
    console.log("Rendering a mobile input field.");
  }
}

// Client
class UIManager {
  private _factory: UIComponentFactory;

  constructor(factory: UIComponentFactory) {
    this._factory = factory;
  }

  renderUI(): void {
    const button = this._factory.createButton();
    const inputField = this._factory.createInputField();

    button.render();
    inputField.render();
  }
}

// Example Usage
const webUIManager = new UIManager(new WebUIComponentFactory());
webUIManager.renderUI();

const mobileUIManager = new UIManager(new MobileUIComponentFactory());
mobileUIManager.renderUI();
