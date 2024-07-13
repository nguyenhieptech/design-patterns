# Memento
class EditorMemento:
    def __init__(self, content: str) -> None:
        self._content = content

    def get_content(self) -> str:
        return self._content


# Originator
class Editor:
    def __init__(self) -> None:
        self._content: str = ""

    def type(self, words: str) -> None:
        self._content += words

    def get_content(self) -> str:
        return self._content

    def save(self) -> EditorMemento:
        return EditorMemento(self._content)

    def restore(self, memento: EditorMemento) -> None:
        self._content = memento.get_content()


# Caretaker
class EditorHistory:
    def __init__(self) -> None:
        self._history: list[EditorMemento] = []

    def push(self, memento: EditorMemento) -> None:
        self._history.append(memento)

    def pop(self) -> EditorMemento:
        if not self._history:
            raise IndexError("No mementos to restore")
        return self._history.pop()


# Example usage
editor = Editor()
editor_history = EditorHistory()

editor.type("This is the first sentence. ")
editor_history.push(editor.save())

editor.type("This is the second sentence. ")
editor_history.push(editor.save())

editor.type("And this is the third. ")

print(
    editor.get_content()
)  # Output: This is the first sentence. This is the second sentence. And this is the third.

try:
    editor.restore(editor_history.pop())
    print(
        editor.get_content()
    )  # Output: This is the first sentence. This is the second sentence.

    editor.restore(editor_history.pop())
    print(editor.get_content())  # Output: This is the first sentence.
except IndexError as e:
    print(e)
