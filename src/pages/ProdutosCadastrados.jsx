import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalSenha from "../components/ModalSenha.jsx";
import { buscarProdutos, excluirProduto } from "../services/localStorageService";
import "../styles/produtos.css";

export default function ProdutosCadastrados() {
  const [produtos, setProdutos] = useState([]);
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (acessoLiberado) {
      setProdutos(buscarProdutos());
    }
  }, [acessoLiberado]);

  function abrirEditar(id) {
    navigate("/editar/" + id);
  }

  function deletar(id) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    excluirProduto(id);
    setProdutos(buscarProdutos());
  }

  return (
    <div className="container">
      <h2>Produtos Cadastrados</h2>

      {!acessoLiberado ? (
        <ModalSenha fechar={() => setAcessoLiberado(true)} />
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <button onClick={() => navigate("/cadastrar")}>Cadastrar Novo</button>
          </div>

          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado.</p>
          ) : (
            <ul className="lista-produtos">
              {produtos.map((p) => (
                <li key={p.id}>
                  <div>
                    <strong>{p.nome}</strong> — R$ {p.preco.toFixed(2)}
                    {p.desconto > 0 && <span className="desconto"> ({p.desconto}% off)</span>}
                    <div style={{ color: "#666", fontSize: 12 }}>{p.descricao}</div>
                    <div style={{ color: "#666", fontSize: 12 }}>Código: {p.codigo}</div>
                  </div>

                  <div>
                    <button onClick={() => abrirEditar(p.id)}>Editar</button>
                    <button onClick={() => deletar(p.id)} className="excluir">
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
