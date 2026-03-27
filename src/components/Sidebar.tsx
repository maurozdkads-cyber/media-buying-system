"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "⊞" },
  { href: "/inbox", label: "Inbox", icon: "↓" },
  { href: "/triage", label: "Triage", icon: "⇄" },
  { href: "/tests", label: "Tests", icon: "◎" },
  { href: "/kb", label: "Knowledge Base", icon: "◆" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 z-50 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!collapsed && (
          <span className="text-sm font-semibold text-gray-800 truncate">
            Media Buying
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          title={collapsed ? "Expandir" : "Colapsar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Quick Add */}
      <div className="p-2 border-t border-gray-100">
        <Link
          href="/inbox?new=true"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-md text-sm bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          title="Nuevo input"
        >
          <span>+</span>
          {!collapsed && <span>Nuevo Input</span>}
        </Link>
      </div>
    </aside>
  );
}
