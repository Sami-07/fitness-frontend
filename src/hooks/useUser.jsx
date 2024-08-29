import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export default function useUser() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            if (!isLoaded) {
                // Handle loading state however you like
                return;
            }

            if (!isSignedIn) {
                // Handle signed out state however you like
                return;
            }

            const token = await getToken();
            const res = await fetch(url + "/current-user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const parsedRes = await res.json();
            setUser(parsedRes?.user);
        }

        fetchUser();
    }, [isLoaded, isSignedIn]);

    return user;
}
