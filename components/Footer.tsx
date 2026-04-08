import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-500/50 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center text-white font-bold text-lg">
                G
              </div>
              <div>
                <span className="text-lg font-bold text-white">Grapinz</span>
                <span className="text-lg font-light text-slate-400 ml-1">Tech Blog</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Explore the latest in technology and enhance your learning experience with Grapinz Technology & Institution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/posts', label: 'All Articles' },
                { href: '/categories', label: 'Categories' },
                { href: '/authors', label: 'Authors' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Programs</h4>
            <ul className="space-y-2">
              {['Programming', 'UI/UX Design', 'Adobe Master Course', 'VFX & 3D Animation', 'Digital Marketing'].map(
                (program) => (
                  <li key={program}>
                    <span className="text-sm text-slate-400">{program}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-dark-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} Grapinz Tech Blog. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Powered by</span>
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:text-accent-purple transition-colors font-medium"
            >
              Cosmic
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}