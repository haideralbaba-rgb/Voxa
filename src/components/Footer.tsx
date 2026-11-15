import Link from "next/link";
import { ArrowUpLeft, ArrowUp } from "lucide-react";
import { STUDIO } from "@/lib/voxa-data";

export function Footer() {
  return (
    <footer className="vx-footer">
      <div className="vx-wrap">
        <div className="vx-footer-top">
          <Link href="/" className="vx-logo" dir="ltr">
            voxa<span>✳</span>
          </Link>
          <p>أفكار جريئة. تفاصيل مدروسة. أثر يدوم.</p>
          <a href="#main" className="vx-back-top">
            إلى الأعلى <ArrowUp size={16} />
          </a>
        </div>
        <div className="vx-footer-bottom">
          <span>© {new Date().getFullYear()} فوكسـا. صُنع بشغف في العراق.</span>
          <a href={`mailto:${STUDIO.email}`} dir="ltr">
            {STUDIO.email} <ArrowUpLeft size={14} />
          </a>
          <span dir="ltr">INDEPENDENT BY DESIGN ↗</span>
        </div>
      </div>
    </footer>
  );
}
