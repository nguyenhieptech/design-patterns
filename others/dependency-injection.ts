// Certainly! Let's consider a real-life example of Dependency Injection (DI) in the context of a logging library.
// In a logging library, you might have different loggers (e.g., console logger, file logger)
// that implement the same interface (Logger). Dependency Injection can be used to inject
// the appropriate logger implementation into other classes that require logging functionality.

// In this example:
// The Logger interface defines the common interface for all logger implementations.
// The ConsoleLogger and FileLogger classes are concrete implementations of the Logger interface.
// They provide specific implementations for logging messages to the console and a file, respectively.
// The SomeService class requires logging functionality and accepts a Logger implementation through its constructor.
// This class can perform various operations and log messages using the injected logger.
// In the example usage, we create instances of ConsoleLogger and FileLogger and inject them into instances of SomeService.
// This demonstrates how different logger implementations can be injected into classes
// that require logging functionality, enabling flexibility and testability.
// Dependency Injection allows for loose coupling between classes and their dependencies,
// making code more modular, maintainable, and testable. In a real-world logging library,
// Dependency Injection can be used to inject different logger implementations based on the application's configuration
// or requirements, without changing the code of the classes that use logging functionality.

// Logger interface
interface Logger {
  log(message: string): void;
}

// ConsoleLogger implementation
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[Console Logger] ${message}`);
  }
}

// FileLogger implementation
class FileLogger implements Logger {
  log(message: string): void {
    console.log(`[File Logger] ${message}`);
    // Logic to log message to a file
  }
}

// Class that requires logging functionality using Dependency Injection
class SomeService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  doSomething(): void {
    this.logger.log('Doing something...');
  }
}

// Example usage with Dependency Injection
const consoleLogger = new ConsoleLogger();
const fileLogger = new FileLogger();

const serviceWithConsoleLogger = new SomeService(consoleLogger);
serviceWithConsoleLogger.doSomething();

const serviceWithFileLogger = new SomeService(fileLogger);
serviceWithFileLogger.doSomething();
