import Link from "next/link";

const navItems = ["Features", "Products", "Resources", "Contact"];

export default function SiteHeader() {
  return (
    <header className="af-header">
      <div className="af-shell af-header-row">
        <Link href="/" className="af-brand" aria-label="AstralFund home">
          <img src="/AstralFund-Logo.svg" alt="AstralFund" className="af-logo" />
        </Link>
        <div className="af-header-nav-main">
          <nav aria-label="Primary">
            <ul className="af-nav-list">
              {navItems.map((item) => (
                <li key={item}>
                  <a href="#" className="af-nav-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="af-header-actions">
              <a href="#" className="af-cta">
              Get started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
