import React, { useEffect, useState } from "react";
import { buscarProdutos, excluirProduto } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import "../styles/produtos.css";

export default function ProdutosCadastrados() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProdutos(buscarProdutos());
  }, []);

  function apagar(id) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      excluirProduto(id);
      setProdutos(buscarProdutos());
    }
  }

  return (
    <div className="container">
      <h2>Produtos Cadastrados</h2>

      {/* Botão Voltar */}
      <button
        style={{ marginBottom: 12, background: "#64748b" }}
        onClick={() => navigate("/consulta")}
      >
        Voltar
      </button>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>Cód</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Desconto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.codigo}</td>
                <td>{p.nome}</td>
                <td>R$ {p.preco.toFixed(2)}</td>
                <td>{p.desconto ? `${p.desconto}%` : "-"}</td>
                <td>
                  <button onClick={() => navigate(`/editar/${p.id}`)}>Editar</button>
                  <button style={{ background: "#dc2626" }} onClick={() => apagar(p.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
