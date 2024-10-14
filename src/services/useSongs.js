import { useQuery } from '@tanstack/react-query';
import supabase from './supabase';

const fetchSongs = async (genreId) => {
    // Handles songs fetching from songs table
    const { data, error } = await supabase
        .from('songs')
        .select(`
            id,
            name,
            file_path,
            artist:artist_id (
                id,
                name,
                portrait,
                genre_id
            )
        `)
        // Order the songs alphabetically in the song list
        .order('name', { ascending: true });

    if (error) throw new Error(error.message);

    // Filter songs by genreID
    return data.filter(song => song.artist?.genre_id === genreId);
};


const preloadDurations = async (songs) => {
    // Preload durations for songs for slightly faster and stable loading
    return await Promise.all(
        songs.map(song => {
            return new Promise(resolve => {
                const audio = new Audio(song.file_path);
                audio.onloadedmetadata = () => {
                    resolve({
                        ...song,
                        // Add duration to song object
                        duration: audio.duration || 0, 
                    });
                };
            });
        })
    );
};

export const useSongs = (genreId) => {
    // Fetches the songs and their appropriate metadata
    return useQuery({
        queryKey: ['songs', genreId],
        queryFn: async () => {
            // If genreId is not provided
            if (!genreId) return []; 
            // Fetch the songs
            const songs = await fetchSongs(genreId);
            // Preload song durations
            return await preloadDurations(songs); 
        },
        // Only run the query if genreId exists
        enabled: !!genreId, 
        // Keep data in cache for 30 minutes for faster use
        cacheTime: 1000 * 60 * 30, 
        // Avoid refetching data when user focuses window
        refetchOnWindowFocus: false, 
    });
};