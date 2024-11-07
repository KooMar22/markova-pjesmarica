import { useEffect, useState } from "react";
import "../songslist.css";
import timer from "../utils/timer";
import { useGenres } from "../services/useGenres";
import { useSongs } from "../services/useSongs";
import { loadSongMetadata } from "../services/loadSongMetadata";

const SongsList = ({ open, musicNumber, setMusicNumber, setSongs }) => {
    // Handle selected genres and loaded songs state
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loadedSongs, setLoadedSongs] = useState([]);

    // Fetch genres and songs
    const { data: genres, isLoading: loadingGenres } = useGenres();
    const { data: songs, isLoading: loadingSongs, error: songsError } = useSongs(selectedGenre);

    useEffect(() => {
        if (songs) {
            // Update the songs list
            setSongs(songs);
            // Load songs without their duration initially
            setLoadedSongs(songs);
        }
    }, [songs, setSongs]);

    useEffect(() => {
        if (musicNumber !== null && !loadedSongs[musicNumber]?.duration) {
            // Lazy load metadata for the selected song if duration is not already loaded
            const loadMetadata = async () => {
                const updatedSong = await loadSongMetadata(loadedSongs[musicNumber]);
                setLoadedSongs((prevSongs) =>
                    prevSongs.map((song, i) => (i === musicNumber ? updatedSong : song))
                );
            };
            loadMetadata();
        }
    }, [musicNumber, loadedSongs]);

    // Pause playback and reset the song number to null when the genre changes
    const handleGenreChange = (e) => {
        // Set new genre
        setSelectedGenre(parseInt(e.target.value));
        // Reset musicNumber when genre changes
        setMusicNumber(null);
    };

    const handleSongSelect = (index) => {
        setMusicNumber(index);
        // Check if the song metadata is already loaded and load it if it is not
        if (!loadedSongs[index]?.duration) {
            loadSongMetadata(loadedSongs[index]).then((updatedSong) => {
                setLoadedSongs((prevSongs) =>
                    prevSongs.map((song, i) => (i === index ? updatedSong : song))
                );
            });
        }
    };

    // Check for genre and song loading states
    if (loadingGenres) return (
        <div className="loading-div">
            <p className="loading">Loading genres...
                <br/>
                It may take a while if loading genre for the first time.
            </p>
        </div>
    );
    if (loadingSongs) return (
        <div className="loading-div">
            <p className="loading">Loading songs...
                <br />
                <br />
                It may take a while if loading genre for the first time.
                <br />
                <br />
                When loaded, you have to select a song to play it.
            </p>
        </div>
    );
    if (songsError) return (
        <div className="loading-div">
            <p className="loading-error">Error loading songs: {songsError.message}</p>
        </div>
    );

    return (
        <div className={`list ${open ? "show" : ""}`}>
            <div className="header">
                <div>
                    <span>Music list</span>
                </div>
            </div>

            {/* Genre selection dropdown */}
            <div className="genre-selector-div">
                <select className="genre-selector"
                    onChange={handleGenreChange}
                    // Set the value to selected genre
                    value={selectedGenre || ""}
                >
                    <option value="" disabled>Select a Genre</option>
                    {genres && genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.genre}
                        </option>
                    ))}
                </select>
            </div>

            <ul>
                {loadedSongs && loadedSongs.length > 0 && loadedSongs.map((song, index) => (
                    <li
                        key={song.id}
                        onClick={() => handleSongSelect(index)}
                        className={`${musicNumber === index ? "playing" : ""}`}
                    >
                        <div className="row">
                            <span>{song.name}</span>
                            <p>{song.artist ? song.artist.name : "Unknown Artist"}</p>
                        </div>
                        <span className="duration">
                            {/* Show duration for all loaded songs*/}
                            {song.duration ? timer(song.duration) : ""}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongsList;