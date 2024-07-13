#include <iostream>
#include <memory>

// Subject interface
class Image
{
public:
  virtual void display() const = 0;
};

// RealSubject
class RealImage : public Image
{
public:
  RealImage(const std::string &filename) : filename_(filename)
  {
    loadFromDisk();
  }

  void display() const override
  {
    std::cout << "Displaying " << filename_ << std::endl;
  }

private:
  void loadFromDisk() const
  {
    std::cout << "Loading " << filename_ << " from disk..." << std::endl;
  }

  std::string filename_;
};

// Proxy
class ProxyImage : public Image
{
public:
  ProxyImage(const std::string &filename) : filename_(filename) {}

  void display() const override
  {
    if (!realImage_)
    {
      realImage_ = std::make_unique<RealImage>(filename_);
    }
    realImage_->display();
  }

private:
  mutable std::unique_ptr<RealImage> realImage_;
  std::string filename_;
};

// Client code
int main()
{
  Image *image = new ProxyImage("test_image.jpg");
  image->display(); // Image will be loaded and displayed
  image->display(); // Image will be displayed without loading

  delete image;
  return 0;
}
