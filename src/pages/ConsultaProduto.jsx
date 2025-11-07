import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarProdutoPorCodigo } from "../services/localStorageService";
import ProdutoCard from "../components/ProdutoCard.jsx";
import "../styles/consulta.css";

export default function ConsultaProduto() {
  const [codigo, setCodigo] = useState("");
  const [produto, setProduto] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  function handleConsultar() {
    setMensagem("");
    setProduto(null);
    if (!codigo.trim()) {
      setMensagem("Digite um código de barras.");
      return;
    }

    const encontrado = buscarProdutoPorCodigo(codigo.trim());
    if (encontrado) {
      setProduto(encontrado);
    } else {
      setMensagem("Produto não encontrado. Deseja cadastrar?");
    }
  }

  function irParaCadastro() {
    navigate("/cadastrar", { state: { codigoDigitado: codigo } });
  }

  function aoAdicionar(produto) {
    // redireciona ao caixa passando o produto pelo state
    navigate("/caixa", { state: { produto } });
  }

  return (
    <div className="container consulta-container">
      <h2>ConsulteJá: Consulta</h2>

      <input
        type="text"
        placeholder="Digite ou escaneie o código de barras"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleConsultar(); }}
        autoFocus
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={handleConsultar}>Consultar</button>
        <button onClick={() => { setCodigo(""); setMensagem(""); setProduto(null); }}>Limpar</button>
        <button onClick={() => navigate("/produtos")}>Produtos Cadastrados</button>
        <button onClick={() => navigate("/caixa")}>Ir ao Caixa</button>
      </div>

      {mensagem && (
        <div className="aviso">
          <p>{mensagem}</p>
          <button onClick={irParaCadastro}>Cadastrar Produto</button>
        </div>
      )}

      {produto && <ProdutoCard produto={produto} aoAdicionar={aoAdicionar} />}
    </div>
  );
}
