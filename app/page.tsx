import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <h1 className={`${lusitana.className} text-5xl font-bold text-white md:text-7xl`}>
        MusiLearn
      </h1>
      <p className={`${lusitana.className} mt-4 text-xl text-white md:text-3xl`}>
        Modernisez la gestion de votre école de musique.
      </p>
      <Link
        href="/login"
        className="mt-8 flex items-center gap-5 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 md:text-base animate-bounce"
      >
        <span>Se connecter</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}
