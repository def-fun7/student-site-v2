// hooks/useNavigateToMapPage.ts
'use client'; // 👈 This is essential

import { useRouter } from 'next/navigation';

export function useNavigateToMapPage() {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/mapPage');
    };

    return { handleNavigate };
}
