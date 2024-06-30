import Link from "next/link";
import { IoChatbubbles } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import NavBar from "./navbar";

export default function Header() {
  return (
    <header className="flex justify-between md:items-baseline mt-4">
      <div className="flex items-center md:space-x-12">
        <div className="hidden md:flex md:items-center md:space-x-1">
          <Link href="/" className="text-xl">
            Social App
          </Link>
          <IoChatbubbles size={24} />
        </div>

        <NavBar />
      </div>

      <MdOutlineDarkMode size={24} />
    </header>
  );
}
