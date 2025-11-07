import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
 * - senha fixa: 'sayu123'
 * - 3 tentativas
 * - bloqueio de 2 minutos quando excede
 */
export default function ModalSenha({ fechar }) {
  const [senha, setSenha] = useState("");
  const [tentativas, setTentativas] = useState(3);
  const [bloqueadoAte, setBloqueadoAte] = useState(null);
  const navigate = useNavigate();
  const SENHA_CORRETA = "sayu123";

  useEffect(() => {
    const bloqueio = localStorage.getItem("consulteja_bloqueio_senha");
    if (bloqueio) {
      const hora = new Date(bloqueio);
      if (hora > new Date()) setBloqueadoAte(hora);
      else localStorage.removeItem("consulteja_bloqueio_senha");
    }
  }, []);

  function confirmar() {
    if (bloqueadoAte && new Date() < bloqueadoAte) return;

    if (senha === SENHA_CORRETA) {
      setSenha("");
      setTentativas(3);
      fechar();
    } else {
      const novas = tentativas - 1;
      setTentativas(novas);
      if (novas <= 0) {
        const bloqueio = new Date(new Date().getTime() + 2 * 60 * 1000);
        setBloqueadoAte(bloqueio);
        localStorage.setItem("consulteja_bloqueio_senha", bloqueio.toString());
      }
    }
  }

  function cancelar() {
    navigate("/");
  }

  function segundosRestantes() {
    if (!bloqueadoAte) return 0;
    const diff = Math.max(0, Math.floor((bloqueadoAte - new Date()) / 1000));
    return diff;
  }

  return (
    <div className="modal-fundo">
      <div className="modal">
        <h3>Acesso restrito</h3>

        {bloqueadoAte && new Date() < bloqueadoAte ? (
          <p>Bloqueado. Tente novamente em {segundosRestantes()} segundos.</p>
        ) : (
          <>
            <input
              type="password"
              placeholder="Digite a senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {tentativas < 3 && <p className="erro">Senha incorreta. {tentativas} tentativas restantes.</p>}

            <div className="botoes-modal" style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={confirmar}>Entrar</button>
              <button style={{ background: "#94a3b8" }} onClick={cancelar}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
