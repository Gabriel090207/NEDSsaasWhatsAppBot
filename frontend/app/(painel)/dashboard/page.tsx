import styles from "./Dashboard.module.css";
import {
  Send,
  Inbox,
  MessageCircle,
  Wifi
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      
      {/* CARDS */}
      <div className={styles.cards}>
        
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.icon}>
              <Send size={16} />
            </div>
            <h3>Enviadas</h3>
          </div>
          <div className={styles.cardValue}>1.234</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.icon}>
              <Inbox size={16} />
            </div>
            <h3>Recebidas</h3>
          </div>
          <div className={styles.cardValue}>980</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.icon}>
              <MessageCircle size={16} />
            </div>
            <h3>Conversas</h3>
          </div>
          <div className={styles.cardValue}>120</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.icon}>
              <Wifi size={16} />
            </div>
            <h3>Status</h3>
          </div>
          <div className={`${styles.cardValue} ${styles.online}`}>
            Online
          </div>
        </div>

      </div>

      {/* GRÁFICO */}
      <div className={styles.chart}>
        (Gráfico em breve)
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        
        <div className={styles.box}>
          <h3>Bot</h3>
          <p>Ativo • Última interação agora</p>
          <button>Configurar Bot</button>
        </div>

        <div className={styles.box}>
          <h3>Conexão</h3>
          <p>WhatsApp conectado</p>
          <button>Reconectar</button>
        </div>

      </div>

    </div>
  );
}