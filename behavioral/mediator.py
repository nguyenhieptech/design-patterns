from __future__ import annotations
from datetime import datetime


# Mediator Interface
class ChatRoomMediator:
    def show_message(self, user: User, message: str) -> None:
        pass


# Concrete Mediator
class ChatRoom(ChatRoomMediator):
    def show_message(self, user: User, message: str) -> None:
        time = datetime.now().strftime("%H:%M:%S")
        sender = user.get_name()

        print(f"{time} [{sender}]: {message}")


# Colleague
class User:
    def __init__(self, name: str, chat_mediator: ChatRoomMediator):
        self._name = name
        self._chat_mediator = chat_mediator

    def get_name(self) -> str:
        return self._name

    def send(self, message: str) -> None:
        self._chat_mediator.show_message(self, message)


# Example usage
mediator = ChatRoom()

user1 = User("User 1", mediator)
user2 = User("User 2", mediator)

user1.send("Hello, User 2!")
user2.send("Hey, User 1!")
