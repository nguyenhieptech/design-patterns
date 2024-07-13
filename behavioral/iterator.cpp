#include <iostream>
#include <vector>
#include <memory>
#include <string>

// Song class
class Song
{
public:
  Song(const std::string &title, const std::string &artist) : title(title), artist(artist) {}

  std::string toString() const
  {
    return title + " by " + artist;
  }

private:
  std::string title;
  std::string artist;
};

// Iterator Interface
template <typename T>
class Iterator
{
public:
  virtual ~Iterator() = default;
  virtual bool hasNext() = 0;
  virtual T next() = 0;
};

// Concrete Iterator: PlaylistIterator
class PlaylistIterator : public Iterator<Song>
{
public:
  PlaylistIterator(const std::vector<Song> &songs) : songs(songs), index(0) {}

  bool hasNext() override
  {
    return index < songs.size();
  }

  Song next() override
  {
    if (hasNext())
    {
      return songs[index++];
    }
    else
    {
      throw std::out_of_range("No more songs in the playlist");
    }
  }

private:
  std::vector<Song> songs;
  size_t index;
};

// Aggregate Interface
template <typename T>
class Aggregate
{
public:
  virtual ~Aggregate() = default;
  virtual std::shared_ptr<Iterator<T>> createIterator() = 0;
};

// Concrete Aggregate: Playlist
class Playlist : public Aggregate<Song>
{
public:
  void addSong(const Song &song)
  {
    songs.push_back(song);
  }

  std::shared_ptr<Iterator<Song>> createIterator() override
  {
    return std::make_shared<PlaylistIterator>(songs);
  }

private:
  std::vector<Song> songs;
};

// Example usage
int main()
{
  Playlist playlist;
  playlist.addSong(Song("Song 1", "Artist A"));
  playlist.addSong(Song("Song 2", "Artist B"));

  auto it = playlist.createIterator();
  while (it->hasNext())
  {
    Song song = it->next();
    std::cout << song.toString() << std::endl;
  }

  return 0;
}
