// components/RealtimeMapWrapper.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {toast} from 'react-hot-toast';
interface YourTableRow {
    id: string;
    name: string; // Assuming you have a 'name' field for display
    created_at: string;
    lat: number;
    long: number;
    [key: string]: any;
}

interface RealtimeMapHookReturn {
    loading: boolean;
    latestEntry: YourTableRow | null;
    retry: () => void;
}

const useRealtimeMap = () : RealtimeMapHookReturn => {
    const [loading, setLoading] = useState(true);
    const [latestEntry, setLatestEntry] = useState<YourTableRow | null>(null);
    const tableName = 'routes'; // ✨ IMPORTANT: REPLACE WITH YOUR ACTUAL TABLE NAME! ✨

    const fetchInitialLatest = async () => {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            toast.error('Error fetching initial latest entry:');
        } else if (data) {
            setLatestEntry(data as YourTableRow);
            setLoading(false);
        }
    };
    useEffect(() => {
        

        fetchInitialLatest();

        const channel = supabase
            .channel('latest_entry_map_channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: tableName },
                (payload) => {
                    console.log('Realtime INSERT received for map!', payload);
                    setLatestEntry(payload.new as YourTableRow);
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log(`Subscribed to realtime inserts on '${tableName}' for map!`);
                } else if (status === 'CHANNEL_ERROR') {
                    console.error(`Error subscribing to channel for '${tableName}' for map!`);
                }
            });

        return () => {
            supabase.removeChannel(channel);
            console.log(`Unsubscribed from realtime map channel for '${tableName}'.`);
        };
    }, []);

    return { loading, latestEntry , retry:fetchInitialLatest};
};

export default useRealtimeMap;