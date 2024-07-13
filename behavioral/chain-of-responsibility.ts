// Abstract Handler
abstract class SupportHandler {
  protected nextHandler: SupportHandler | null = null;

  public setNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handleRequest(severity: string): void {
    if (this.nextHandler) {
      this.nextHandler.handleRequest(severity);
    }
  }
}

// Concrete Handler: LowLevelSupport
class LowLevelSupport extends SupportHandler {
  public handleRequest(severity: string): void {
    if (severity === "low") {
      console.log("LowLevelSupport: Handling low severity ticket");
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(severity);
    }
  }
}

// Concrete Handler: MidLevelSupport
class MidLevelSupport extends SupportHandler {
  public handleRequest(severity: string): void {
    if (severity === "medium") {
      console.log("MidLevelSupport: Handling medium severity ticket");
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(severity);
    }
  }
}

// Concrete Handler: HighLevelSupport
class HighLevelSupport extends SupportHandler {
  public handleRequest(severity: string): void {
    if (severity === "high") {
      console.log("HighLevelSupport: Handling high severity ticket");
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(severity);
    }
  }
}

// Example usage
const lowLevel = new LowLevelSupport();
const midLevel = new MidLevelSupport();
const highLevel = new HighLevelSupport();

lowLevel.setNext(midLevel).setNext(highLevel);

lowLevel.handleRequest("low");
lowLevel.handleRequest("medium");
lowLevel.handleRequest("high");
