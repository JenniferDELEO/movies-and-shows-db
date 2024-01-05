import Link from "next/link";

const Header = () => {
  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between border-b-2 border-b-white mb-10">
      <div className="flex items-center w-full md:w-2/3">
        <Link href="/">Accueil</Link>
      </div>
      <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/movies">Films</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/tvshows">Séries TV</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/profil">Mon profil</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
