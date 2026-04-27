import styles from "./Suporte.module.css";
import {
  MessageCircle,
  Mail,
  Headphones,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react";

export default function SuportePage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <h1>Central de Suporte</h1>
          <p>
            Atendimento rápido, suporte técnico e acompanhamento dos seus chamados.
          </p>
        </div>

        <button className={styles.primaryBtn}>
          Abrir chamado
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <Clock3 size={18} />
          <div>
            <strong>12</strong>
            <span>Em andamento</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <AlertCircle size={18} />
          <div>
            <strong>4</strong>
            <span>Pendentes</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <CheckCircle2 size={18} />
          <div>
            <strong>28</strong>
            <span>Resolvidos</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <Headphones size={18} />
          <div>
            <strong>2 min</strong>
            <span>Tempo médio</span>
          </div>
        </div>
      </div>

      <div className={styles.searchBox}>
        <Search size={18} />
        <input placeholder="Buscar chamado, assunto ou cliente..." />
      </div>

      <section className={styles.section}>
        <h3>Canais de atendimento</h3>

        <div className={styles.channels}>
  <div className={styles.card}>
    <div className={styles.cardTop}>
      <div className={styles.iconBlue}>
        <MessageCircle size={22} />
      </div>

      <div className={styles.cardInfo}>
        <h4>WhatsApp</h4>
        <p>Atendimento rápido em tempo real.</p>
      </div>
    </div>

    <button>Chamar suporte</button>
  </div>

  <div className={styles.card}>
    <div className={styles.cardTop}>
      <div className={styles.iconBlue}>
        <Mail size={22} />
      </div>

      <div className={styles.cardInfo}>
        <h4>Email</h4>
        <p>Suporte detalhado e envio de anexos.</p>
      </div>
    </div>

    <button>Enviar email</button>
  </div>

  <div className={styles.card}>
    <div className={styles.cardTop}>
      <div className={styles.iconBlue}>
        <Headphones size={22} />
      </div>

      <div className={styles.cardInfo}>
        <h4>Ticket</h4>
        <p>Abra chamados técnicos completos.</p>
      </div>
    </div>

    <button>Abrir ticket</button>
  </div>
</div>
      </section>

      <section className={styles.section}>
        <h3>Últimos chamados</h3>

        <div className={styles.ticketList}>
          <div className={styles.ticket}>
            <div>
              <strong>Erro ao conectar WhatsApp</strong>
              <span>Atualizado há 3 min</span>
            </div>

            <small className={styles.warning}>Em análise</small>
          </div>

          <div className={styles.ticket}>
            <div>
              <strong>Dúvida sobre fluxos</strong>
              <span>Atualizado há 12 min</span>
            </div>

            <small className={styles.success}>Resolvido</small>
          </div>

          <div className={styles.ticket}>
            <div>
              <strong>Webhook não responde</strong>
              <span>Atualizado há 25 min</span>
            </div>

            <small className={styles.pending}>Pendente</small>
          </div>
        </div>
      </section>
    </div>
  );
}