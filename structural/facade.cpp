#include <iostream>
#include <string>

// Subsystem: DVD Player
class DVDPlayer
{
public:
  void on()
  {
    std::cout << "DVD Player is on." << std::endl;
  }
  void play(const std::string &movie)
  {
    std::cout << "Playing movie: " << movie << std::endl;
  }
};

// Subsystem: Projector
class Projector
{
public:
  void on()
  {
    std::cout << "Projector is on." << std::endl;
  }
  void setInput(DVDPlayer *dvdPlayer)
  {
    std::cout << "Projector input set to DVD Player." << std::endl;
  }
};

// Subsystem: Sound System
class SoundSystem
{
public:
  void on()
  {
    std::cout << "Sound System is on." << std::endl;
  }
  void setVolume(int level)
  {
    std::cout << "Sound System volume set to " << level << "." << std::endl;
  }
};

// Subsystem: Lights
class Lights
{
public:
  void dim(int level)
  {
    std::cout << "Lights dimmed to " << level << "%." << std::endl;
  }
};

// Facade: Home Theater Facade
class HomeTheaterFacade
{
public:
  HomeTheaterFacade() : dvdPlayer(new DVDPlayer()), projector(new Projector()), soundSystem(new SoundSystem()), lights(new Lights()) {}

  ~HomeTheaterFacade()
  {
    delete dvdPlayer;
    delete projector;
    delete soundSystem;
    delete lights;
  }

  void watchMovie(const std::string &movie)
  {
    std::cout << "Getting ready to watch a movie..." << std::endl;
    lights->dim(30);
    projector->on();
    projector->setInput(dvdPlayer);
    soundSystem->on();
    soundSystem->setVolume(5);
    dvdPlayer->on();
    dvdPlayer->play(movie);
  }

private:
  DVDPlayer *dvdPlayer;
  Projector *projector;
  SoundSystem *soundSystem;
  Lights *lights;
};

// Example Usage
int main()
{
  HomeTheaterFacade homeTheater;
  homeTheater.watchMovie("Inception");
  return 0;
}
