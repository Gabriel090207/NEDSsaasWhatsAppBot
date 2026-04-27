"use client";

import styles from "./Sidebar.module.css";
import {
  LayoutDashboard,
  Bot,
  Plug,
  Settings,
  LifeBuoy,
  HelpCircle,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      
      {/* LOGO */}
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
        />

        <div className={styles.logoText}>
          <strong>NEDS Services</strong>
          <span>Bot de atendimento</span>
        </div>
      </div>

      {/* MENU */}
      <nav className={styles.menu}>
        <p className={styles.section}>MENU PRINCIPAL</p>

        <Link
          href="/dashboard"
          className={`${styles.item} ${
            pathname === "/dashboard" ? styles.active : ""
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/bot"
          className={`${styles.item} ${
            pathname === "/bot" ? styles.active : ""
          }`}
        >
          <Bot size={18} />
          Bot
        </Link>

        <Link
          href="/conexao"
          className={`${styles.item} ${
            pathname === "/conexao" ? styles.active : ""
          }`}
        >
          <Plug size={18} />
          Conexão
        </Link>

        <Link
          href="/configuracoes"
          className={`${styles.item} ${
            pathname === "/configuracoes" ? styles.active : ""
          }`}
        >
          <Settings size={18} />
          Configurações
        </Link>
      </nav>

      {/* AJUDA */}
      <div className={styles.menu}>
        <p className={styles.section}>AJUDA</p>

        <Link
          href="/suporte"
          className={`${styles.item} ${
            pathname === "/suporte" ? styles.active : ""
          }`}
        >
          <LifeBuoy size={18} />
          Suporte
        </Link>

        <Link
          href="/faq"
          className={`${styles.item} ${
            pathname === "/faq" ? styles.active : ""
          }`}
        >
          <HelpCircle size={18} />
          FAQ
        </Link>
      </div>

    </aside>
  );
}