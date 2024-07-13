class Song:
    def __init__(self, title: str, artist: str):
        self.title = title
        self.artist = artist

    def __str__(self) -> str:
        return f"{self.title} by {self.artist}"


class PlaylistIterator:
    def __init__(self, songs: list[Song]):
        self._songs = songs
        self._index = 0

    def __iter__(self) -> "PlaylistIterator":
        return self

    def __next__(self) -> Song:
        if self._index < len(self._songs):
            song = self._songs[self._index]
            self._index += 1
            return song
        else:
            raise StopIteration


class Playlist:
    def __init__(self):
        self._songs: list[Song] = []

    def add_song(self, song: Song) -> None:
        self._songs.append(song)

    def __iter__(self) -> PlaylistIterator:
        return PlaylistIterator(self._songs)


# Example usage
playlist = Playlist()
playlist.add_song(Song("Song 1", "Artist A"))
playlist.add_song(Song("Song 2", "Artist B"))

for song in playlist:
    print(song)
