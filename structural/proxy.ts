// Sure! Let's use a real-world example of a virtual proxy for a heavy resource: a large image file.
// The proxy will load the image only when it is actually needed.

// In these examples, the ProxyImage class acts as a proxy to the RealImage class.
// The RealImage class represents a heavy resource that is expensive to create and load.
// The ProxyImage class controls access to the RealImage and ensures that
// it is only loaded when needed, optimizing resource usage.

// Subject interface
interface Image {
  display(): void;
}

// RealSubject
class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk();
  }

  display(): void {
    console.log(`Displaying ${this.filename}`);
  }

  private loadFromDisk(): void {
    console.log(`Loading ${this.filename} from disk...`);
  }
}

// Proxy
class ProxyImage implements Image {
  private filename: string;
  private realImage: RealImage | null = null;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Client code
const image: Image = new ProxyImage("test_image.jpg");
image.display(); // Image will be loaded and displayed
image.display(); // Image will be displayed without loading
