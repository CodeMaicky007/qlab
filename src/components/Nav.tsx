"use client";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isWork = pathname === "/work";
  const isDark = isWork;

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-6 py-3 backdrop-blur-xl border rounded-full shadow-sm w-[90%] max-w-2xl ${
      isDark ? "bg-black/40 border-white/20" : "bg-white/60 border-white/40"
    }`}>
      <Link
        href="/"
        className={`font-[family-name:var(--font-cormorant)] text-xl font-light tracking-widest no-underline ${isDark ? "text-white" : "text-[#1A1A18]"}`}
      >
        QLab
      </Link>
      <ul className="flex gap-6 text-[13px] tracking-wide list-none">
        {[
          { label: "Work", href: "/work" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`no-underline transition-colors ${
                pathname === item.href
                  ? isDark ? "text-white" : "text-[#1A1A18]"
                  : isDark ? "text-white/50 hover:text-white" : "text-[#6B6B67] hover:text-[#1A1A18]"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}