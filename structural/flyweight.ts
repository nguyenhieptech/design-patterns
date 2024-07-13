// Sure! Let's use a real-world example of a text editor where we need to handle
// a large number of characters with formatting (font, size, color).
// Using the Flyweight design pattern, we can share the common formatting details
// among multiple character objects to save memory.

// In this example, the CharacterFormat class is the flyweight object that stores the formatting details.
// The CharacterFormatFactory is responsible for creating and managing the flyweight objects.
// The Character class uses the flyweight objects to store the formatting details and
// displays the character with its formatting.
// This way, the memory usage is optimized by sharing the common formatting details among multiple character objects.

// Flyweight class
class CharacterFormat {
  constructor(public font: string, public size: number, public color: string) {}

  display(): void {
    console.log(`Font: ${this.font}, Size: ${this.size}, Color: ${this.color}`);
  }
}

// Flyweight Factory class
class CharacterFormatFactory {
  private formats: { [key: string]: CharacterFormat } = {};

  getCharacterFormat(
    font: string,
    size: number,
    color: string
  ): CharacterFormat {
    const key = `${font}${size}${color}`;
    if (!this.formats[key]) {
      this.formats[key] = new CharacterFormat(font, size, color);
    }
    return this.formats[key];
  }
}

// Client class
class Character {
  constructor(public symbol: string, private format: CharacterFormat) {}

  display(): void {
    console.log(`Character: ${this.symbol} `);
    this.format.display();
  }
}

// Example usage
const factory = new CharacterFormatFactory();

const text = [
  new Character("H", factory.getCharacterFormat("Arial", 12, "Black")),
  new Character("e", factory.getCharacterFormat("Arial", 12, "Black")),
  new Character("l", factory.getCharacterFormat("Arial", 12, "Black")),
  new Character("l", factory.getCharacterFormat("Arial", 12, "Black")),
  new Character("o", factory.getCharacterFormat("Arial", 12, "Black")),
];

for (const character of text) {
  character.display();
}
