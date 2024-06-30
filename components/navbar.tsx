import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex flex-col md:flex-row md:space-x-3">
        <li>
          <Link href="/" className="link">Home</Link>
        </li>
        <li>
          <Link href="/feed" className="link">Feed</Link>
        </li>
        <li>
          <Link href="/dashboard" className="link">Dashboard</Link>
        </li>
        <li>
          <Link href="/profile" className="link">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
