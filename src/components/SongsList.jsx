import { useEffect, useState } from "react";
import "../songslist.css";
import timer from "../utils/timer";
import { useGenres } from "../services/useGenres";
import { useSongs } from "../services/useSongs";

const SongsList = ({ open, musicNumber, setMusicNumber, setSongs }) => {
    // Handle selected genres state
    const [selectedGenre, setSelectedGenre] = useState(null);
    
    // Fetch genres and songs
    const { data: genres, isLoading: loadingGenres } = useGenres();
    const { data: songs, isLoading: loadingSongs, error: songsError } = useSongs(selectedGenre);

    useEffect(() => {
        if (songs) {
            // Update the songs
            setSongs(songs);
        }
    }, [songs, setSongs]);

    // Pause playback and reset the song number to null when the genre changes
    const handleGenreChange = (e) => {
        // Set new genre
        setSelectedGenre(parseInt(e.target.value));
        // Reset musicNumber when genre changes
        setMusicNumber(null);
    };

    const handleSongSelect = (index) => {
        // Set the current song number
        setMusicNumber(index); 
    };

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
                It may take a while if loading genre for the first time.
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
                {songs && songs.length > 0 && (
                    songs.map((song, index) => (
                        <li key={song.id} 
                            onClick={() => handleSongSelect(index)}
                            className={`${musicNumber === index ? "playing" : ""}`}>
                            <div className="row">
                                <span>{song.name}</span>
                                <p>{song.artist ? song.artist.name : "Unknown Artist"}</p>
                            </div>
                            <span className="duration">{timer(song.duration)}</span>
                        </li>
                    ))
                )}
            </ul>          
        </div>
    );
};

export default SongsList;