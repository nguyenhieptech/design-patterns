from typing import Optional


# Subject interface
class Image:
    def display(self) -> None:
        pass


# RealSubject
class RealImage(Image):
    def __init__(self, filename: str) -> None:
        self.filename = filename
        self._load_from_disk()

    def display(self) -> None:
        print(f"Displaying {self.filename}")

    def _load_from_disk(self) -> None:
        print(f"Loading {self.filename} from disk...")


# Proxy
class ProxyImage(Image):
    def __init__(self, filename: str) -> None:
        self.filename = filename
        self._real_image: Optional[RealImage] = None

    def display(self) -> None:
        if self._real_image is None:
            self._real_image = RealImage(self.filename)
        self._real_image.display()


# Client code
image = ProxyImage("test_image.jpg")
image.display()  # Image will be loaded and displayed
image.display()  # Image will be displayed without loading
