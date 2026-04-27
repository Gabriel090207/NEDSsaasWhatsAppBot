"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import {
  Search,
  Moon,
  Bell,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";

type UserType = {
  name?: string;
  email?: string;
};

export default function Header() {
  const router = useRouter();

  const [user, setUser] =
    useState<UserType>({});

  useEffect(() => {
    async function loadUser() {
      const saved =
        localStorage.getItem("user");

      if (!saved) return;

      const localUser =
        JSON.parse(saved);

      try {
        const data = await apiFetch(
          `/auth/login?email=${encodeURIComponent(
            localUser.email
          )}`,
          {
            method: "POST",
          }
        );

        setUser(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } catch {
        setUser(localUser);
      }
    }

    loadUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  const nome =
    user.name || "Usuário";

  const letra =
    nome.charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      {/* LEFT */}
      <div className={styles.left}>
        <div>
          <h1>Dashboard</h1>
          <span>
            Veja os principais indicadores
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.searchBox}>
          <Search size={16} />
          <input placeholder="Busque aqui..." />
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <Moon size={18} />
        </button>

        <button className={styles.iconBtn}>
          <Bell size={18} />
        </button>

        <div className={styles.user}>
          <div className={styles.userInfo}>
            <strong>{nome}</strong>
            <span>Cliente</span>
          </div>

          <div className={styles.avatar}>
            {letra}
          </div>

          <button
            className={styles.iconBtn}
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}