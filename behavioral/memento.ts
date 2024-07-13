// Sure, let's look at the Memento design pattern with real-world examples.
// In this example, we'll create a simple text editor that can save and restore its state (text content).

// In this example:
// Memento: The EditorMemento class, which stores the state of the Editor.
// Originator: The Editor class, which creates and restores mementos.
// Caretaker: The EditorHistory class, which keeps track of the editor's mementos and provides undo functionality.

// This setup demonstrates how the Memento pattern can be used to save and restore the state of an object,
// providing undo functionality in applications like text editors.

// Memento
class EditorMemento {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }
}

// Originator
class Editor {
  private content: string = "";

  public type(words: string): void {
    this.content += words;
  }

  public getContent(): string {
    return this.content;
  }

  public save(): EditorMemento {
    return new EditorMemento(this.content);
  }

  public restore(memento: EditorMemento): void {
    this.content = memento.getContent();
  }
}

// Caretaker
class EditorHistory {
  private history: EditorMemento[] = [];

  public push(memento: EditorMemento): void {
    this.history.push(memento);
  }

  public pop(): EditorMemento | undefined {
    return this.history.pop();
  }
}

// Example usage
const editor = new Editor();
const editorHistory = new EditorHistory();

editor.type("This is the first sentence. ");
editorHistory.push(editor.save());

editor.type("This is the second sentence. ");
editorHistory.push(editor.save());

editor.type("And this is the third. ");

console.log(editor.getContent()); // Output: This is the first sentence. This is the second sentence. And this is the third.

editor.restore(editorHistory.pop()!);
console.log(editor.getContent()); // Output: This is the first sentence. This is the second sentence.

editor.restore(editorHistory.pop()!);
console.log(editor.getContent()); // Output: This is the first sentence.
