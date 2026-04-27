"use client";

import { useMemo, useState } from "react";
import styles from "./Faq.module.css";
import {
  Search,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const categories = [
  "Bot",
  "Conexão",
  "Fluxos",
  "Atendimento",
  "Integrações",
  "Planos",
  "Segurança",
  "Configurações",
];

const articlesData = [
  {
    category: "Bot",
    title: "Como criar meu primeiro bot?",
    desc: "Aprenda a criar um bot completo em poucos minutos usando fluxos, mensagens e automações.",
    level: "Popular",
  },
  {
    category: "Bot",
    title: "Como usar botões e respostas rápidas?",
    desc: "Crie menus interativos para facilitar o atendimento e aumentar conversões.",
    level: "Popular",
  },
  {
    category: "Conexão",
    title: "Como conectar meu WhatsApp?",
    desc: "Veja como conectar número via QR Code e manter tudo online com segurança.",
    level: "Popular",
  },
  {
    category: "Fluxos",
    title: "Como redirecionar para outro fluxo?",
    desc: "Organize jornadas complexas enviando o cliente para outro fluxo automaticamente.",
    level: "Médio",
  },
  {
    category: "Atendimento",
    title: "Como transferir para atendente?",
    desc: "Pause o bot e envie o cliente para atendimento humano com notificação.",
    level: "Popular",
  },
  {
    category: "Integrações",
    title: "Posso integrar com API?",
    desc: "Conecte sistemas externos usando webhooks, APIs e automações.",
    level: "Médio",
  },
  {
    category: "Segurança",
    title: "Meus dados estão protegidos?",
    desc: "Utilizamos práticas modernas de segurança e controle de acesso.",
    level: "Popular",
  },
];

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("Bot");


  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const filtered = useMemo(() => {
    return articlesData.filter((item) => {
      const byCategory =
        item.category === activeCategory;

      const bySearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.desc
          .toLowerCase()
          .includes(search.toLowerCase());

      return byCategory && bySearch;
    });
  }, [search, activeCategory]);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>

        <h1>Como podemos te ajudar?</h1>

        <div className={styles.searchBox}>
          <Search size={20} />

          <input
            type="text"
            placeholder="Procure na central de ajuda..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </section>

  
      {/* CONTENT */}
      <section className={styles.content}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3>Categorias</h3>

          {categories.map((item) => (
            <button
              key={item}
              onClick={() =>
                setActiveCategory(item)
              }
              className={`${styles.categoryBtn} ${
                activeCategory === item
                  ? styles.activeCategory
                  : ""
              }`}
            >
              {item}
            </button>
          ))}
        </aside>

        {/* LISTA */}
        <div className={styles.articles}>
          {filtered.map((item, index) => (
            
            

             <div
  key={index}
  className={styles.card}
  onClick={() =>
    setOpenIndex(
      openIndex === index ? null : index
    )
  }
>
  {/* TOPO */}
  <div className={styles.cardHeader}>
    <div className={styles.cardLeft}>
      <div className={styles.iconWrap}>
        <BookOpen size={18} />
      </div>

      <h4>{item.title}</h4>
    </div>

    <div className={styles.cardRight}>
      <ChevronDown
        size={18}
        className={
          openIndex === index
            ? styles.rotate
            : ""
        }
      />
    </div>
  </div>

  {/* RESPOSTA */}
  <div
    className={`${styles.answerBox} ${
      openIndex === index
        ? styles.answerOpen
        : ""
    }`}
  >
    <p>{item.desc}</p>
  </div>
</div>
          ))}

          {filtered.length === 0 && (
            <div className={styles.empty}>
              Nenhum artigo encontrado.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}