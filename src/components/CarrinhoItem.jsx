import React from "react";

/**
 * Props:
 * - item: { id, nome, preco, desconto, quantidade }
 * - aoIncrementar(id)
 * - aoDecrementar(id)
 * - aoRemover(id)
 */
export default function CarrinhoItem({ item, aoIncrementar, aoDecrementar, aoRemover }) {
  const precoComDesconto = item.desconto
    ? item.preco - (item.preco * item.desconto) / 100
    : item.preco;

  return (
    <div className="item-carrinho">
      <div>
        <strong>{item.nome}</strong>
        <div style={{ fontSize: 13, color: "#555" }}>{item.descricao}</div>
        <div style={{ marginTop: 6 }}>
          Preço unit: R$ {item.preco.toFixed(2)}{" "}
          {item.desconto > 0 && (
            <span style={{ color: "green" }}>
              → R$ {precoComDesconto.toFixed(2)} c/desconto
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => aoDecrementar(item.id)}>-</button>
        <div style={{ minWidth: 26, textAlign: "center" }}>{item.quantidade}</div>
        <button onClick={() => aoIncrementar(item.id)}>+</button>

        <button
          onClick={() => aoRemover(item.id)}
          style={{ marginLeft: 8, background: "#ef4444" }}
        >
          Remover
        </button>
      </div>
    </div>
  );
}
