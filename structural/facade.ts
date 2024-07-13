// Sure! Let's use a real-world example of a home theater system.
// The facade pattern can be used to simplify the interaction with
// various subsystems like the DVD player, projector, sound system, and lights.

// In these examples, the HomeTheaterFacade class simplifies the interaction with
// the different components of the home theater system, making it easy for clients to use.
// This way, the client only needs to interact with the HomeTheaterFacade to perform
// a complex operation like watching a movie, without needing to understand the details of how the different subsystems work together.

// Subsystem: DVD Player
class DVDPlayer {
  on(): void {
    console.log("DVD Player is on.");
  }
  play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }
}

// Subsystem: Projector
class Projector {
  on(): void {
    console.log("Projector is on.");
  }
  setInput(dvdPlayer: DVDPlayer): void {
    console.log("Projector input set to DVD Player.");
  }
}

// Subsystem: Sound System
class SoundSystem {
  on(): void {
    console.log("Sound System is on.");
  }
  setVolume(level: number): void {
    console.log(`Sound System volume set to ${level}.`);
  }
}

// Subsystem: Lights
class Lights {
  dim(level: number): void {
    console.log(`Lights dimmed to ${level}%.`);
  }
}

// Facade: Home Theater Facade
class HomeTheaterFacade {
  private dvdPlayer: DVDPlayer;
  private projector: Projector;
  private soundSystem: SoundSystem;
  private lights: Lights;

  constructor() {
    this.dvdPlayer = new DVDPlayer();
    this.projector = new Projector();
    this.soundSystem = new SoundSystem();
    this.lights = new Lights();
  }

  watchMovie(movie: string): void {
    console.log("Getting ready to watch a movie...");
    this.lights.dim(30);
    this.projector.on();
    this.projector.setInput(this.dvdPlayer);
    this.soundSystem.on();
    this.soundSystem.setVolume(5);
    this.dvdPlayer.on();
    this.dvdPlayer.play(movie);
  }
}

// Example Usage
const homeTheater = new HomeTheaterFacade();
homeTheater.watchMovie("Inception");
