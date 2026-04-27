import styles from "./FlowBuilder.module.css";

export default function Block({ block, onChange }: any) {
  return (
    <div className={styles.block}>
      
      <h4 className={styles.title}>
        {block.type === "message" ? "Mensagem" : "Botões"}
      </h4>

      {/* MENSAGEM */}
      {block.type === "message" && (
        <textarea
          className={styles.textarea}
          value={block.text}
          onChange={(e) =>
            onChange({ text: e.target.value })
          }
          placeholder="Digite a mensagem..."
        />
      )}

      {/* BOTÕES */}
      {block.type === "buttons" && (
        <>
          {block.options.map((opt: any, index: number) => (
            <input
              key={index}
              className={styles.input}
              value={opt.text}
              onChange={(e) => {
                const newOptions = [...block.options];
                newOptions[index].text = e.target.value;
                onChange({ options: newOptions });
              }}
              placeholder="Texto do botão"
            />
          ))}

          <button
            className={styles.button}
            onClick={() =>
              onChange({
                options: [
                  ...block.options,
                  { text: "Nova opção" },
                ],
              })
            }
          >
            + Adicionar botão
          </button>
        </>
      )}

    </div>
  );
}