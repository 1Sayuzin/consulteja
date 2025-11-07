import React from "react";

function ProdutoCard({ produto, aoAdicionar }) {
  if (!produto) return null;

  return (
    <div className="produto-card">
      <h3>{produto.nome}</h3>
      <p style={{ color: "#444" }}>{produto.descricao}</p>
      <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => aoAdicionar(produto)}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
}

export default ProdutoCard;
