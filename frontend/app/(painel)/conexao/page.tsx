import styles from "./Conexao.module.css";
import {
  Copy,
  Wifi,
  Smartphone,
  RefreshCw,
} from "lucide-react";

export default function ConexaoPage() {
  return (
    <div className={styles.container}>
      {/* TABS */}
      <div className={styles.tabs}>
        <button className={styles.activeTab}>
          Dados da conexão
        </button>

        <button className={styles.tab}>
          Webhooks
        </button>

        <button className={styles.tab}>
          Assinatura
        </button>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.card}>
            <h2>NEDS Services Bot</h2>
            <p>Criado em 11/04/2026</p>
          </div>

          <div className={styles.card}>
            <h3>Credenciais</h3>

            <div className={styles.row}>
              <span>URL API</span>

              <div className={styles.copy}>
                https://api.neds.com/instance/123
                <Copy size={14} />
              </div>
            </div>

            <div className={styles.row}>
              <span>ID</span>

              <div className={styles.copy}>
                123456789
                <Copy size={14} />
              </div>
            </div>

            <div className={styles.row}>
              <span>Token</span>

              <div className={styles.copy}>
                neds_token_abc123
                <Copy size={14} />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Status</h3>

            <div className={styles.statusLine}>
              <Wifi size={16} />

              <span className={styles.online}>
                Online
              </span>
            </div>

            <p>Última conexão: agora</p>
            <p>Mensagens hoje: 124</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.card}>
            <h3>Conectar WhatsApp</h3>

            <p className={styles.desc}>
              Escaneie o QR Code abaixo para conectar.
            </p>

            {/* QR REALISTA */}
            <div className={styles.qrBox}>
              <img
                src="/fake-qr.png"
                alt="QR Code"
                className={styles.qrImage}
              />

              <div className={styles.qrCenter}>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className={styles.qrLogo}
                />
              </div>
            </div>

            <button className={styles.primaryBtn}>
              <RefreshCw size={14} />
              Reconectar
            </button>

            <button className={styles.secondaryBtn}>
              <Smartphone size={14} />
              Conectar por número
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}