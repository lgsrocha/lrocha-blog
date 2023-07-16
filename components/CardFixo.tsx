import React from 'react';

const CardFixo: React.FC = () => {
  return (
    <div className="cardFixo">
      <a href="/lucasdev">
        <strong>
          Autor
          <span className="link-text"> @lucasdev</span>
        </strong>
      </a>
      <a href="/lucasdev/bem-vindo">
        <h2>Bem Vindo!</h2>
      </a>
      <footer>
        <span>265 palavras. Leitura de ~4 minutos.</span>
        <span className="push-left">🌟</span>
      </footer>
    </div>
  );
};

export default CardFixo;
