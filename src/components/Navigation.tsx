"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;
  return (
    <header className="header">
      <Link
        href="/"
        className="w-10 h-10 rounded-lg 
        bg-white flex justify-center items-center 
        font-bold shadow-md"
      >
        <p className="blue-gradient_text">AH</p>
      </Link>

      <nav className="flex text-lg gap-7 font-medium">
        <Link
          href="/About"
          className={isActive("/About") ? "text-blue-500" : "text-black"}
        >
          About
        </Link>
        <Link
          href="/Projects"
          className={isActive("/Projects") ? "text-blue-500" : "text-black"}
        >
          Projects
        </Link>
      </nav>
    </header>
  );
}

export default Navigation;
