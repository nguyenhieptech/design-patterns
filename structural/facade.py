# Subsystem: DVD Player
class DVDPlayer:
    def on(self) -> None:
        print("DVD Player is on.")

    def play(self, movie: str) -> None:
        print(f"Playing movie: {movie}")


# Subsystem: Projector
class Projector:
    def on(self) -> None:
        print("Projector is on.")

    def set_input(self, dvd_player: DVDPlayer) -> None:
        print("Projector input set to DVD Player.")


# Subsystem: Sound System
class SoundSystem:
    def on(self) -> None:
        print("Sound System is on.")

    def set_volume(self, level: int) -> None:
        print(f"Sound System volume set to {level}.")


# Subsystem: Lights
class Lights:
    def dim(self, level: int) -> None:
        print(f"Lights dimmed to {level}%.")


# Facade: Home Theater Facade
class HomeTheaterFacade:
    def __init__(self) -> None:
        self.dvd_player = DVDPlayer()
        self.projector = Projector()
        self.sound_system = SoundSystem()
        self.lights = Lights()

    def watch_movie(self, movie: str) -> None:
        print("Getting ready to watch a movie...")
        self.lights.dim(30)
        self.projector.on()
        self.projector.set_input(self.dvd_player)
        self.sound_system.on()
        self.sound_system.set_volume(5)
        self.dvd_player.on()
        self.dvd_player.play(movie)


# Example Usage
home_theater = HomeTheaterFacade()
home_theater.watch_movie("Inception")
