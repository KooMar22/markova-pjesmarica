export const loadSongMetadata = (song) => {
    return new Promise((resolve) => {
        const audio = new Audio(song.file_path);
        audio.onloadedmetadata = () => {
            resolve({
                ...song,
                duration: audio.duration || 0,
            });
        };
    });
};