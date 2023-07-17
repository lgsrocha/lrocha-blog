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
      <p>Olá pessoal, Estou muito empolgado em compartilhar com vocês o projeto de estudo que desenvolvi inspirado no <a href="https://fireship.io/">Fireship</a>, com uma pitada do estilo do website <a href="https://dev.to/">dev.to</a>. Neste projeto, explorei diversas tecnologias modernas, como Next.js, React...</p>
      <a href="/lucasdev/bem-vindo"><button className="read-more-button">Continuar lendo</button></a>
      <footer>
        <span>265 palavras. Leitura de ~4 minutos.</span>
        <span className="push-left">🌟</span>
      </footer>
    </div>
  );
};

export default CardFixo;
