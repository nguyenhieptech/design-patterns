// Certainly! Let's consider a real-life example of an Iterator pattern in the context of a music player application.
// The music player application manages a playlist of songs,
// and the Iterator pattern can be used to iterate over the playlist and play songs one by one.

// In both examples, we have:

// - A Song class representing a song with a title and an artist.
// - A Playlist class representing a collection of songs. It has a method createIterator() that creates and returns an iterator for the playlist.
// - An Iterator interface (in TypeScript) or a custom iterator class (in Python) implementing methods
// to check if there are more elements (hasNext() in TypeScript, and __next__() in Python) and to retrieve the next element (next() in TypeScript, and __next__() in Python).
// - The example usage demonstrates how to use the iterator to iterate over the playlist and play each song.
// This pattern allows for the separation of concerns between the collection and the iteration logic,
// making the code more modular and easier to maintain. It also provides a uniform way to traverse different types of collections.

class Song {
  constructor(public title: string, public artist: string) {}

  toString(): string {
    return `${this.title} by ${this.artist}`;
  }
}

class PlaylistIterator implements Iterator<Song> {
  private index = 0;

  constructor(private songs: Song[]) {}

  public next(): IteratorResult<Song> {
    if (this.index < this.songs.length) {
      return {
        done: false,
        value: this.songs[this.index++],
      };
    } else {
      return {
        done: true,
        value: null as any, // TypeScript needs a value, but it will be ignored when done is true
      };
    }
  }
}

class Playlist implements Iterable<Song> {
  private songs: Song[] = [];

  public addSong(song: Song): void {
    this.songs.push(song);
  }

  public [Symbol.iterator](): PlaylistIterator {
    return new PlaylistIterator(this.songs);
  }
}

// Example usage
const playlist = new Playlist();
playlist.addSong(new Song("Song 1", "Artist A"));
playlist.addSong(new Song("Song 2", "Artist B"));

for (const song of playlist) {
  console.log(song.toString());
}
