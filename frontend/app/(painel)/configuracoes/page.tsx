"use client";

import { useState } from "react";
import styles from "./Configuracoes.module.css";
import {
  User,
  Palette,
  Bell,
  Shield,
  Server,
  Building2,
  Globe,
  KeyRound,
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [tab, setTab] = useState("perfil");

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.top}>
        <div>
          <h1>Configurações</h1>
          <p>Gerencie preferências, segurança e dados da conta.</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* MENU */}
        <div className={styles.sidebar}>
          <button
            className={tab === "perfil" ? styles.active : styles.item}
            onClick={() => setTab("perfil")}
          >
            <User size={16} />
            Perfil
          </button>

          <button
            className={tab === "aparencia" ? styles.active : styles.item}
            onClick={() => setTab("aparencia")}
          >
            <Palette size={16} />
            Aparência
          </button>

          <button
            className={tab === "notificacoes" ? styles.active : styles.item}
            onClick={() => setTab("notificacoes")}
          >
            <Bell size={16} />
            Notificações
          </button>

          <button
            className={tab === "seguranca" ? styles.active : styles.item}
            onClick={() => setTab("seguranca")}
          >
            <Shield size={16} />
            Segurança
          </button>

          <button
            className={tab === "sistema" ? styles.active : styles.item}
            onClick={() => setTab("sistema")}
          >
            <Server size={16} />
            Sistema
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className={styles.content}>
          {tab === "perfil" && (
            <div className={styles.card}>
              <h2>Perfil da Empresa</h2>

              <div className={styles.row}>
                <div className={styles.inputWrap}>
                  <Building2 size={16} />
                  <input placeholder="Nome da empresa" />
                </div>

                <div className={styles.inputWrap}>
                  <Globe size={16} />
                  <input placeholder="Website" />
                </div>
              </div>

              <div className={styles.inputWrap}>
                <User size={16} />
                <input placeholder="Responsável" />
              </div>

              <div className={styles.inputWrap}>
                <Bell size={16} />
                <input placeholder="Email principal" />
              </div>

              <button className={styles.primaryBtn}>
                Salvar alterações
              </button>
            </div>
          )}

          {tab === "aparencia" && (
            <div className={styles.card}>
              <h2>Aparência</h2>

              <select>
                <option>Tema Escuro</option>
                <option>Tema Claro</option>
              </select>

              <select>
                <option>Azul</option>
                <option>Verde</option>
                <option>Roxo</option>
              </select>

              <select>
                <option>Português</option>
                <option>English</option>
              </select>

              <button className={styles.primaryBtn}>
                Salvar preferências
              </button>
            </div>
          )}

          {tab === "notificacoes" && (
            <div className={styles.card}>
              <h2>Notificações</h2>

              <label className={styles.switchRow}>
                <span>Email</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className={styles.switchRow}>
                <span>WhatsApp</span>
                <input type="checkbox" />
              </label>

              <label className={styles.switchRow}>
                <span>Novos tickets</span>
                <input type="checkbox" defaultChecked />
              </label>

              <button className={styles.primaryBtn}>
                Salvar notificações
              </button>
            </div>
          )}

          {tab === "seguranca" && (
            <div className={styles.card}>
              <h2>Segurança</h2>

              <div className={styles.inputWrap}>
                <KeyRound size={16} />
                <input placeholder="Nova senha" type="password" />
              </div>

              <div className={styles.inputWrap}>
                <KeyRound size={16} />
                <input placeholder="Confirmar senha" type="password" />
              </div>

              <button className={styles.primaryBtn}>
                Atualizar senha
              </button>
            </div>
          )}

          {tab === "sistema" && (
            <div className={styles.card}>
              <h2>Informações do Sistema</h2>

              <div className={styles.infoBox}>
                <span>Plano atual</span>
                <strong>PRO</strong>
              </div>

              <div className={styles.infoBox}>
                <span>Versão</span>
                <strong>1.0.0</strong>
              </div>

              <div className={styles.infoBox}>
                <span>Status</span>
                <strong className={styles.online}>Online</strong>
              </div>

              <button className={styles.primaryBtn}>
                Ver logs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}