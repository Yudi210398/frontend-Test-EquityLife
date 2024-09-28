"use client";
import Link from "next/link"; // Import Link for routing

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setTimeout(() => {
    window?.location.reload();
  }, 3599000);
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">TEST TEKNIS PT EQUITY LIFE INDONESIA</Link>
          </div>

          {/* Links */}
          <div className="space-x-4">
            <Link href="/api_fe/postdata" className="hover:text-gray-300">
              Post Data Transaksi
            </Link>
            <Link href="/api_fe/list_employee" className="hover:text-gray-300">
              List Employee
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
