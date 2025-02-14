"use client";

import { useState, type ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { Home, Menu, X, FileText } from "lucide-react";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "ホーム", href: "/", icon: Home },
    { name: "記事一覧", href: "/articles", icon: FileText },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <nav className="h-[65px] fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 w-full">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-slate-800">
                  Created by Next.js
                </span>
              </Link>
            </div>

            <div className="items-center hidden md:flex md:items-center md:space-x-2">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-blue-600"
                        : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="block bg-white border-b border-slate-200 md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                      isActive(link.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-[65px]">
        <motion.div
          className="h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-white border-t border-slate-200 h-[85px] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600 text-sm">
            © {new Date().getFullYear()} Created by Next.js
          </div>
        </div>
      </footer>
    </div>
  );
};
