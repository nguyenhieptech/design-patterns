from abc import ABC, abstractmethod


# Abstract Factory Interface
class UIComponentFactory(ABC):
    @abstractmethod
    def create_button(self) -> "Button":
        pass

    @abstractmethod
    def create_input_field(self) -> "InputField":
        pass


# Concrete Factory for Web
class WebUIComponentFactory(UIComponentFactory):
    def create_button(self) -> "Button":
        return WebButton()

    def create_input_field(self) -> "InputField":
        return WebInputField()


# Concrete Factory for Mobile
class MobileUIComponentFactory(UIComponentFactory):
    def create_button(self) -> "Button":
        return MobileButton()

    def create_input_field(self) -> "InputField":
        return MobileInputField()


# Abstract Product: Button
class Button(ABC):
    @abstractmethod
    def render(self) -> None:
        pass


# Concrete Product: Web Button
class WebButton(Button):
    def render(self) -> None:
        print("Rendering a web button.")


# Concrete Product: Mobile Button
class MobileButton(Button):
    def render(self) -> None:
        print("Rendering a mobile button.")


# Abstract Product: InputField
class InputField(ABC):
    @abstractmethod
    def render(self) -> None:
        pass


# Concrete Product: Web InputField
class WebInputField(InputField):
    def render(self) -> None:
        print("Rendering a web input field.")


# Concrete Product: Mobile InputField
class MobileInputField(InputField):
    def render(self) -> None:
        print("Rendering a mobile input field.")


# Client
class UIManager:
    def __init__(self, factory: UIComponentFactory) -> None:
        self._factory = factory

    def render_ui(self) -> None:
        button = self._factory.create_button()
        input_field = self._factory.create_input_field()

        button.render()
        input_field.render()


# Example Usage
web_ui_manager = UIManager(WebUIComponentFactory())
web_ui_manager.render_ui()

mobile_ui_manager = UIManager(MobileUIComponentFactory())
mobile_ui_manager.render_ui()
