"use client";

import { useState } from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import { Mail, Lock, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setErro("");

    if (!email.trim()) {
      setErro("Digite seu email.");
      return;
    }

    if (!senha.trim()) {
      setErro("Digite sua senha.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch(
        `/auth/login?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      router.push("/dashboard");
    } catch (error: any) {
      setErro(
        error.message ||
          "Não foi possível entrar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      {/* IMAGEM DIREITA */}
      <div className={styles.heroArea}>
        <Image
          src="/hero1.png"
          alt="Hero"
          fill
          priority
          className={styles.hero}
        />
        <div className={styles.fade}></div>
      </div>

      {/* LOGIN */}
      <section className={styles.loginSide}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Faça seu Login<span>.</span>
          </h1>

          <form
            className={styles.form}
            onSubmit={handleLogin}
          >
            {/* EMAIL */}
            <div className={styles.field}>
              <label>Email</label>

              <div className={styles.input}>
                <Mail size={18} />

                <input
                  type="email"
                  placeholder="seuemail@email.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
            </div>

            {/* SENHA */}
            <div className={styles.field}>
              <label>Senha</label>

              <div className={styles.input}>
                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) =>
                    setSenha(e.target.value)
                  }
                />

                <Eye size={18} />
              </div>
            </div>

            <a
              href="#"
              className={styles.link}
            >
              Esqueci minha senha
            </a>

            {erro && (
              <p className={styles.error}>
                {erro}
              </p>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Entrando..."
                : "Entrar"}
            </button>

            <a
              href="#"
              className={styles.linkBottom}
            >
              Ainda não tenho uma conta
            </a>
          </form>

          <p className={styles.footer}>
            © 2025 NEDS Services
          </p>
        </div>
      </section>
    </main>
  );
}