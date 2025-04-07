"use client";

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/login'; // Redirect if not logged in
      } else {
        setUser(session.user);
      }
    };
    
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';  // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>Dashboard content here...</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
