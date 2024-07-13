from typing import List


# Component
class FileSystemComponent:
    def get_name(self) -> str:
        raise NotImplementedError("Subclass must implement abstract method")

    def get_size(self) -> int:
        raise NotImplementedError("Subclass must implement abstract method")


# Leaf: FileComponent
class FileComponent(FileSystemComponent):
    def __init__(self, name: str, size: int) -> None:
        self.name = name
        self.size = size

    def get_name(self) -> str:
        return self.name

    def get_size(self) -> int:
        return self.size


# Composite: Folder
class Folder(FileSystemComponent):
    def __init__(self, name: str) -> None:
        self.name = name
        self.components: List[FileSystemComponent] = []

    def add(self, component: FileSystemComponent) -> None:
        self.components.append(component)

    def get_name(self) -> str:
        return self.name

    def get_size(self) -> int:
        return sum(component.get_size() for component in self.components)


# Example usage
file1 = FileComponent("File1.txt", 100)
file2 = FileComponent("File2.txt", 200)
file3 = FileComponent("File3.txt", 300)

folder1 = Folder("Folder1")
folder1.add(file1)
folder1.add(file2)

folder2 = Folder("Folder2")
folder2.add(file3)
folder2.add(folder1)

print(
    f"Total size of {folder2.get_name()}: {folder2.get_size()} bytes"
)  # Output: Total size of Folder2: 600 bytes
