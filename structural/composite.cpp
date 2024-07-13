#include <iostream>
#include <memory>
#include <vector>
#include <numeric>

// Component
class FileSystemComponent
{
public:
  virtual ~FileSystemComponent() = default;
  virtual std::string getName() const = 0;
  virtual int getSize() const = 0;
};

// Leaf: FileComponent
class FileComponent : public FileSystemComponent
{
  std::string name;
  int size;

public:
  FileComponent(const std::string &name, int size) : name(name), size(size) {}

  std::string getName() const override
  {
    return name;
  }

  int getSize() const override
  {
    return size;
  }
};

// Composite: Folder
class Folder : public FileSystemComponent
{
  std::string name;
  std::vector<std::shared_ptr<FileSystemComponent>> components;

public:
  Folder(const std::string &name) : name(name) {}

  void add(const std::shared_ptr<FileSystemComponent> &component)
  {
    components.push_back(component);
  }

  std::string getName() const override
  {
    return name;
  }

  int getSize() const override
  {
    return std::accumulate(components.begin(), components.end(), 0,
                           [](int total, const std::shared_ptr<FileSystemComponent> &component)
                           {
                             return total + component->getSize();
                           });
  }
};

// Example usage
int main()
{
  auto file1 = std::make_shared<FileComponent>("File1.txt", 100);
  auto file2 = std::make_shared<FileComponent>("File2.txt", 200);
  auto file3 = std::make_shared<FileComponent>("File3.txt", 300);

  auto folder1 = std::make_shared<Folder>("Folder1");
  folder1->add(file1);
  folder1->add(file2);

  auto folder2 = std::make_shared<Folder>("Folder2");
  folder2->add(file3);
  folder2->add(folder1);

  std::cout << "Total size of " << folder2->getName() << ": " << folder2->getSize() << " bytes\n"; // Output: Total size of Folder2: 600 bytes

  return 0;
}
