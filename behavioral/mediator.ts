// Sure, let's look at the Mediator design pattern with real-world examples.
// In this example, we'll create a chat room where multiple users can send messages
// through a mediator (the chat room itself).

// In this example:

// Mediator Interface: Defines the method show_message that a concrete mediator should implement.
// Concrete Mediator: Implements the ChatRoomMediator interface. It handles the interaction between different users by displaying the message with the sender's name and timestamp.
// Colleague: Represents User class, which interacts with each other via the mediator. Each user sends a message using the send method, which calls the mediator's show_message method.
// This setup demonstrates how the Mediator pattern can be used to facilitate communication between objects (users in a chat room) without them needing to refer to each other directly.

// Mediator Interface
interface ChatRoomMediator {
  showMessage(user: User, message: string): void;
}

// Concrete Mediator
class ChatRoom implements ChatRoomMediator {
  public showMessage(user: User, message: string): void {
    const time = new Date();
    const sender = user.getName();

    console.log(`${time.toLocaleTimeString()} [${sender}]: ${message}`);
  }
}

// Colleague
class User {
  private name: string;
  private chatMediator: ChatRoomMediator;

  constructor(name: string, chatMediator: ChatRoomMediator) {
    this.name = name;
    this.chatMediator = chatMediator;
  }

  public getName(): string {
    return this.name;
  }

  public send(message: string): void {
    this.chatMediator.showMessage(this, message);
  }
}

// Example usage
const mediator = new ChatRoom();

const user1 = new User("User 1", mediator);
const user2 = new User("User 2", mediator);

user1.send("Hello, User 2!");
user2.send("Hey, User 1!");
