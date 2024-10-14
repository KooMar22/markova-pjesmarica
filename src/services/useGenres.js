import { useQuery } from '@tanstack/react-query';
import supabase from './supabase';

export const useGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('genres')
                // Select id and genre from genres table
                .select('id, genre')
                // Order genres alphabetically
                .order('genre', { ascending: true });
            if (error) throw new Error(error.message);
            return data;
        }
    });
};