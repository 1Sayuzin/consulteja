import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarProdutos, editarProduto } from "../services/localStorageService";
import "../styles/editar.css";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [desconto, setDesconto] = useState(0);

  useEffect(() => {
    const produtos = buscarProdutos();
    const encontrado = produtos.find((p) => String(p.id) === String(id));
    if (encontrado) {
      setProduto(encontrado);
      setNome(encontrado.nome);
      setDescricao(encontrado.descricao);
      setPreco(encontrado.preco);
      setDesconto(encontrado.desconto || 0);
    }
  }, [id]);

  function salvar() {
    if (!nome || !preco) {
      alert("Nome e preço são obrigatórios.");
      return;
    }

    const atualizado = {
      ...produto,
      nome,
      descricao,
      preco: parseFloat(preco),
      desconto: Number(desconto),
    };

    editarProduto(atualizado);
    alert("Produto atualizado.");
    navigate("/produtos");
  }

  return (
    <div className="container">
      <h2>Editar Produto</h2>

      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
      <input type="number" value={desconto} onChange={(e) => setDesconto(e.target.value)} placeholder="Desconto (%)" />

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={salvar}>Salvar Alterações</button>
        <button onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </div>
  );
}
