import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarProdutos, excluirProduto } from "../services/localStorageService";
import "../styles/produtos.css";

export default function ProdutosCadastrados() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const lista = buscarProdutos();
    setProdutos(lista);
  }, []);

  function handleExcluir(id) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      excluirProduto(id);
      setProdutos(buscarProdutos());
    }
  }

  return (
    <div className="container">
      <h2>Produtos Cadastrados</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={() => navigate(-1)} style={{ background: "#94a3b8" }}>
          ⬅ Voltar
        </button>
        <button onClick={() => navigate("/cadastro")}>
          Cadastrar Novo
        </button>
      </div>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              <strong>{produto.nome}</strong> — R$ {produto.preco.toFixed(2)}
              {produto.desconto > 0 && (
                <span style={{ color: "green" }}>
                  {" "}
                  (Desconto: {produto.desconto}%)
                </span>
              )}

              <div style={{ marginTop: "6px", display: "flex", gap: "6px" }}>
                <button onClick={() => navigate(`/editar/${produto.id}`)}>
                  Editar
                </button>
                <button
                  style={{ background: "#dc2626" }}
                  onClick={() => handleExcluir(produto.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
