const MAX_RETRIES = 5;

export const loadSongMetadata = (song) => {
    return new Promise((resolve) => {
        const audio = new Audio(song.file_path);
        let attempts = 0;

        audio.onloadedmetadata = () => {
            resolve({
                ...song,
                duration: audio.duration || 0,
            });
        };

        audio.onerror = () => {
            // A flaky connection can prevent metadata from ever loading, leaving this
            // promise pending forever. Retry a few times before giving up.
            attempts += 1;
            if (attempts <= MAX_RETRIES) {
                setTimeout(() => audio.load(), 3000);
            } else {
                resolve({ ...song, duration: 0 });
            }
        };
    });
};