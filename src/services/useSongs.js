import { useQuery } from '@tanstack/react-query';
import supabase from './supabase';

const fetchSongs = async (genreId) => {
    // Fetch all artists according to genreID
    const { data: artists, error: artistError } = await supabase
        .from('artists')
        .select('id')
        .eq('genre_id', genreId);

    if (artistError) throw new Error(artistError.message);

    const artistIds = artists.map(artist => artist.id);

    // After that, fetch the appropriate songs from their artist_id
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
        // Filter the songs according to artist_id
        .in('artist_id', artistIds)
        .order('name', { ascending: true });

    if (error) throw new Error(error.message);

    return data;
};

export const useSongs = (genreId) => {
    // Fetches the songs and their appropriate metadata
    return useQuery({
        queryKey: ['songs', genreId],
        queryFn: async () => {
            // If genreId is not provided
            if (!genreId) return [];
            // Else, fetch the songs
            return await fetchSongs(genreId);
        },
        // Only run the query if genreId exists
        enabled: !!genreId,
        // Keep data in cache for 30 minutes for faster use
        cacheTime: 1000 * 60 * 30,
        staleTime: 1000 * 60 * 30,
        // Avoid refetching data when user focuses window
        refetchOnWindowFocus: false,
    });
};