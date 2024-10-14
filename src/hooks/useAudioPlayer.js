import { useRef, useState, useEffect } from "react";

const useAudioPlayer = (initialVolume = 50, songs, musicNumber, setMusicNumber) => {
    const [play, setPlay] = useState(true);
    const [volume, setVolume] = useState(initialVolume);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [repeat, setRepeat] = useState("autoplay");
    const audioRef = useRef(null);

    // Update audio volume whenever it changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Handle audio playback and events
    useEffect(() => {
        if (songs.length > 0 && musicNumber !== null && musicNumber < songs.length) {
            const currentSong = songs[musicNumber];

            // Load the song"s location if not already loaded
            if (audioRef.current.src !== currentSong.file_path) {
                audioRef.current.src = currentSong.file_path;
                audioRef.current.load();
            }

            const handleLoadedMetadata = () => {
                // Handle loaded (duration) metadata
                setDuration(audioRef.current.duration);
            };

            const handleTimeUpdate = () => {
                setCurrentTime(audioRef.current.currentTime);
            };

            const handleEnded = () => {
                switch (repeat) {
                    case "repeat":
                        // If repeat mode - repeat the song
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                        break;
                    case "shuffle":
                        // If shuffle mode - randomly select next song
                        handleShuffle();
                        break;
                    case "autoplay":
                        // If normal mode - move to the next song
                        handleNextPrev(1);
                        break;
                    default:
                        break;
                }
            };

            audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
            audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
            audioRef.current.addEventListener("ended", handleEnded);

            if (play) {
                audioRef.current.play();
            }

            return () => {
                audioRef.current.pause();
                audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
                audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                audioRef.current.removeEventListener("ended", handleEnded);
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songs, musicNumber, play, repeat]);

    const handlePlayingAudio = () => {
        if (play) {
            audioRef.current.pause();
            setPlay(false);
        } else {
            audioRef.current.play();
            setPlay(true);
        }
    };

    const changeCurrentTime = (e) => {
        const newTime = parseFloat(e.target.value);
        if (!isNaN(newTime) && newTime >= 0 && newTime <= duration) {
            // Set currentTime only if valid
            audioRef.current.currentTime = newTime; 
        } else {
            // Log error for invalid time
            console.error("Invalid time value:", newTime); 
        }
    };

    const handleNextPrev = (n) => {
        // If repeat
        if (repeat === "repeat") return;

        if (repeat === "shuffle") {
            // If shuffle
            handleShuffle();
        } else {
            // Normal mode
            setMusicNumber((prev) => {
                const nextIndex = (prev + n + songs.length) % songs.length;
                return nextIndex;
            });
        }
    };

    const handleRepeat = () => {
        setRepeat((prev) => {
            switch (prev) {
                // Repeat is after normal mode
                case "autoplay":
                    return "repeat";
                case "repeat":
                    // Shuffle is after repeat mode
                    return "shuffle";
                default:
                    // Back to normal mode after shuffle
                    return "autoplay";
            }
        });
    };

    const handleShuffle = () => {
        // Randomly select next song within the song list
        const randomIndex = Math.floor(Math.random() * songs.length);
        setMusicNumber(randomIndex);
    };

    return {
        audioRef,
        play,
        setPlay,
        volume,
        setVolume,
        currentTime,
        duration,
        repeat,
        handlePlayingAudio,
        changeCurrentTime,
        handleNextPrev,
        handleRepeat,
    };
};

export default useAudioPlayer