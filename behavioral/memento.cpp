#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <stdexcept>

// Memento
class EditorMemento
{
public:
  EditorMemento(const std::string &content) : content(content) {}

  std::string getContent() const
  {
    return content;
  }

private:
  std::string content;
};

// Originator
class Editor
{
public:
  void type(const std::string &words)
  {
    content += words;
  }

  std::string getContent() const
  {
    return content;
  }

  std::shared_ptr<EditorMemento> save() const
  {
    return std::make_shared<EditorMemento>(content);
  }

  void restore(const std::shared_ptr<EditorMemento> &memento)
  {
    content = memento->getContent();
  }

private:
  std::string content;
};

// Caretaker
class EditorHistory
{
public:
  void push(const std::shared_ptr<EditorMemento> &memento)
  {
    history.push_back(memento);
  }

  std::shared_ptr<EditorMemento> pop()
  {
    if (history.empty())
    {
      throw std::out_of_range("No mementos to restore");
    }
    auto memento = history.back();
    history.pop_back();
    return memento;
  }

private:
  std::vector<std::shared_ptr<EditorMemento>> history;
};

// Example usage
int main()
{
  Editor editor;
  EditorHistory editorHistory;

  editor.type("This is the first sentence. ");
  editorHistory.push(editor.save());

  editor.type("This is the second sentence. ");
  editorHistory.push(editor.save());

  editor.type("And this is the third. ");

  std::cout << editor.getContent() << std::endl; // Output: This is the first sentence. This is the second sentence. And this is the third.

  try
  {
    editor.restore(editorHistory.pop());
    std::cout << editor.getContent() << std::endl; // Output: This is the first sentence. This is the second sentence.

    editor.restore(editorHistory.pop());
    std::cout << editor.getContent() << std::endl; // Output: This is the first sentence.
  }
  catch (const std::out_of_range &e)
  {
    std::cout << e.what() << std::endl;
  }

  return 0;
}
