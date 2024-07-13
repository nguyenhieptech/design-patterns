from typing import Dict, List


class CharacterFormat:
    def __init__(self, font: str, size: int, color: str) -> None:
        self.font = font
        self.size = size
        self.color = color

    def display(self) -> None:
        print(f"Font: {self.font}, Size: {self.size}, Color: {self.color}")


class CharacterFormatFactory:
    def __init__(self) -> None:
        self.formats: Dict[str, CharacterFormat] = {}

    def get_character_format(self, font: str, size: int, color: str) -> CharacterFormat:
        key = f"{font}{size}{color}"
        if key not in self.formats:
            self.formats[key] = CharacterFormat(font, size, color)
        return self.formats[key]


class Character:
    def __init__(self, symbol: str, format: CharacterFormat) -> None:
        self.symbol = symbol
        self.format = format

    def display(self) -> None:
        print(f"Character: {self.symbol} ", end="")
        self.format.display()


# Example usage
factory = CharacterFormatFactory()

text: List[Character] = [
    Character("H", factory.get_character_format("Arial", 12, "Black")),
    Character("e", factory.get_character_format("Arial", 12, "Black")),
    Character("l", factory.get_character_format("Arial", 12, "Black")),
    Character("l", factory.get_character_format("Arial", 12, "Black")),
    Character("o", factory.get_character_format("Arial", 12, "Black")),
]

for character in text:
    character.display()
