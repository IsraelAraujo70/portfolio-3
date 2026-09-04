"use client";

import Image from "next/image";

import {
  Home,
  User,
  FolderOpen,
  Briefcase,
  GitBranch,
  Mail,
} from "lucide-react";

const navItems = [
  { id: "hero", label: "Overview", icon: Home },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "about", label: "About me", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "opensource", label: "Open Source", icon: GitBranch },
  { id: "contact", label: "Contact", icon: Mail },
];

const techTags = [
  { label: "TypeScript", color: "#3178C6" },
  { label: "Node.js", color: "#5FA04E" },
  { label: "Python", color: "#3776AB" },
  { label: "AWS", color: "#FF9900" },
];

interface FinderSidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

/** Navigate the portfolio sections inside the Finder window. */
export function FinderSidebar({
  activeSection,
  onNavigate,
}: FinderSidebarProps) {
  return (
    <div className="finder-sidebar">
      <p className="finder-sidebar-label">Favorites</p>
      <nav className="finder-nav" aria-label="Portfolio sections">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            aria-current={activeSection === id ? "location" : undefined}
          >
            <Icon size={16} strokeWidth={1.7} />
            {label}
          </button>
        ))}
      </nav>
      <div className="finder-sidebar-footer">
        <p className="finder-sidebar-label">Tags</p>
        {techTags.map(({ label, color }) => (
          <div key={label} className="finder-tag">
            <span style={{ backgroundColor: color }} />
            {label}
          </div>
        ))}
        <div className="finder-owner">
          <Image src="/profile-picture.jpeg" alt="" width={28} height={28} />
          <div>
            <strong>Israel Araújo</strong>Personal workspace
          </div>
        </div>
      </div>
    </div>
  );
}
