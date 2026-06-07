import React, { useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Menu, UserRound, X } from 'lucide-react';
import Button from './Button';
import Modal from './Modal';
import ThemeToggle from './ThemeToggle';
import BrandMark from './BrandMark';
import { cn } from './utils';

export default function AppNavbar({ username, role, items = [], homePath = '/home' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = useMemo(() => items.filter(Boolean), [items]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const brandClick = () => {
    if (location.pathname === homePath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(homePath);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 px-4 py-2 sm:px-6 lg:px-8">
        <div className="section-shell">
          <div className="glass-panel flex items-center justify-between px-4 py-2 sm:px-5">
            <button type="button" onClick={brandClick} className="text-left">
              <BrandMark compact showSubtitle subtitleClassName="hidden xl:block" />
            </button>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-3.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
                      isActive && 'text-sky-600 dark:text-sky-300',
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="relative inline-flex items-center gap-2">
                      {item.icon ? <item.icon className="h-4 w-4" /> : null}
                      {item.label}
                      {isActive ? <motion.span layoutId="nav-indicator" className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-sky-500" /> : null}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />
              {username ? (
                <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-2.5 py-1.5 dark:border-white/10 dark:bg-slate-950/70">
                  <div className="rounded-full bg-slate-100 p-1.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <UserRound className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold leading-none text-slate-800 dark:text-white">{username}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{role || 'Guest'}</div>
                  </div>
                </div>
              ) : null}
              <Button variant="ghost" size="icon" onClick={() => setShowLogout(true)} aria-label="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex rounded-full border border-white/50 bg-white/70 p-3 text-slate-700 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 lg:hidden"
              onClick={() => setMobileOpen((current) => !current)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="glass-panel mt-3 p-4 lg:hidden"
              >
                <div className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <NavLink key={item.label} to={item.to} onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 dark:text-slate-200 dark:hover:bg-slate-900">
                      <span className="inline-flex items-center gap-2">
                        {item.icon ? <item.icon className="h-4 w-4" /> : null}
                        {item.label}
                      </span>
                    </NavLink>
                  ))}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <ThemeToggle className="flex-1 justify-center" />
                    <Button variant="outline" className="flex-1" onClick={() => setShowLogout(true)}>
                      Logout
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      <Modal open={showLogout} onOpenChange={setShowLogout} title="Sign out" description="You will return to the login screen.">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setShowLogout(false)}>
            Stay here
          </Button>
          <Button variant="danger" onClick={logout}>
            Log out
          </Button>
        </div>
      </Modal>
    </>
  );
}