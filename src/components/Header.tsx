"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpLeft, Menu, X } from "lucide-react";

const links = [
  ["work", "أعمال مختارة"],
  ["services", "ماذا نقدم"],
  ["studio", "عن فوكسـا"],
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="vx-header">
      <div className="vx-header-inner">
        <Link
          href="/"
          className="vx-logo"
          aria-label="فوكسـا — الرئيسية"
          dir="ltr"
        >
          voxa<span>✳</span>
        </Link>
        <nav className="vx-desktop-nav" aria-label="القائمة الرئيسية">
          {links.map(([id, label]) => (
            <Link key={id} href={`/#${id}`}>
              {label}
            </Link>
          ))}
          <span className="vx-nav-divider" />
          <span className="vx-nav-note">نصنع الاختلاف، معاً.</span>
        </nav>
        <div className="vx-header-actions">
          <Link className="vx-header-cta" href="/#contact">
            لنتحدث <ArrowUpLeft size={16} />
          </Link>
          <button
            className="vx-menu-button"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="vx-mobile-nav"
          aria-label="قائمة الهاتف"
        >
          {[...links, ["process", "كيف نعمل"], ["contact", "ابدأ مشروعك"]].map(
            ([id, label]) => (
              <Link onClick={() => setOpen(false)} key={id} href={`/#${id}`}>
                {label}
                <ArrowUpLeft size={22} />
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
