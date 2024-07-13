// The Composite design pattern is used to treat individual objects and compositions of objects uniformly.
// It is useful when dealing with tree structures, such as representing hierarchies of files and folders.
// Here's an example of a file system where both files and folders can be treated uniformly using the Composite pattern.

// Component: The FileSystemComponent interface defines common operations (getName and getSize) that both files and folders must implement.
// Leaf: The FileComponent class represents a file with a name and size.
// Composite: The Folder class can contain multiple FileSystemComponent objects (both FileComponent and Folder), and it implements the common operations.
// Client Code: Demonstrates creating files and folders, adding files to folders, and computing the total size of the folder contents.

// Component
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
}

// Leaf: FileComponent
class FileComponent implements FileSystemComponent {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }
}

// Composite: Folder
class Folder implements FileSystemComponent {
  private name: string;
  private components: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(component: FileSystemComponent): void {
    this.components.push(component);
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.components.reduce(
      (total, component) => total + component.getSize(),
      0
    );
  }
}

// Example usage
const file1 = new FileComponent("File1.txt", 100);
const file2 = new FileComponent("File2.txt", 200);
const file3 = new FileComponent("File3.txt", 300);

const folder1 = new Folder("Folder1");
folder1.add(file1);
folder1.add(file2);

const folder2 = new Folder("Folder2");
folder2.add(file3);
folder2.add(folder1);

console.log(`Total size of ${folder2.getName()}: ${folder2.getSize()} bytes`); // Output: Total size of Folder2: 600 bytes
