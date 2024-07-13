from typing import Protocol


# Logger interface
class Logger(Protocol):
    def log(self, message: str) -> None:
        pass


# ConsoleLogger implementation
class ConsoleLogger:
    def log(self, message: str) -> None:
        print(f"[Console Logger] {message}")


# FileLogger implementation
class FileLogger:
    def log(self, message: str) -> None:
        print(f"[File Logger] {message}")
        # Logic to log message to a file


# Class that requires logging functionality using Dependency Injection
class SomeService:
    def __init__(self, logger: Logger) -> None:
        self.logger = logger

    def doSomething(self) -> None:
        self.logger.log("Doing something...")


# Example usage with Dependency Injection
console_logger = ConsoleLogger()
file_logger = FileLogger()

service_with_console_logger = SomeService(console_logger)
service_with_console_logger.doSomething()

service_with_file_logger = SomeService(file_logger)
service_with_file_logger.doSomething()
