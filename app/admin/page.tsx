"use client";


import React from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion
    // Par exemple, supprimer le token d'authentification, etc.
    router.push('/login'); // Redirige vers la page de connexion après la déconnexion
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-xl">Bienvenue sur le tableau de bord administrateur de MusiLearn.</p>
      <button
        onClick={handleLogout}
        className="mt-8 rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-red-700"
      >
        Logout
      </button>
      
    </main>
  );
};

export default AdminPage;