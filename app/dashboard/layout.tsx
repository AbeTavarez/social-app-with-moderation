import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="col-span-2">{children}</div>
      <nav className="border">
        <ul>
            <li>
            <Link href="/dashboard/settings">Settings</Link>
            </li>
        </ul>
      </nav>
    </div>
  );
}
