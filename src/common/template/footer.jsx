import React from "react";

export default (props) => {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="pull-right hidden-xs">
        <b>Version</b> 1.1.001
      </div>
      <strong>
        Copyright © 2020-{anoAtual} <a href="#">Meu Dinheiro APP</a>.
      </strong>{" "}
      Todos os direitos reservados.
    </footer>
  );
};
