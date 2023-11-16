import React, { useState, useEffect } from 'react';
import './App.css'

function ListaDeItens() {
  const [itens, setItens] = useState([]);
  const [textoDeEntrada, setTextoDeEntrada] = useState('');
  const [edicaoDetalhes, setEdicaoDetalhes] = useState({ indice: null });

  // Carregar dados salvos do localStorage ao iniciar
  useEffect(() => {
    const savedItens = JSON.parse(localStorage.getItem('itens'));
    if (savedItens) {
      setItens(savedItens);
    }
  }, []);

  const salvarDetalhesNoLocalStorage = (itensAtualizados) => {
    localStorage.setItem('itens', JSON.stringify(itensAtualizados));
  };

  const adicionarItem = () => {
    if (textoDeEntrada.trim() !== '') {
      const novoItem = {
        titulo: textoDeEntrada,
        status: '',
        resumo: '',
        autor: '',
        classificacao: 0,
      };
      setItens([...itens, novoItem]);
      setTextoDeEntrada('');
      salvarDetalhesNoLocalStorage([...itens, novoItem]);
    }
  };

  const alternarStatusParaLido = (indice) => {
    const itensAtualizados = [...itens];
    // Verifica se o status é vazio antes de marcar como lido
    if (itensAtualizados[indice].status === '') {
      itensAtualizados[indice].status = 'Lido';
      setItens(itensAtualizados);
      salvarDetalhesNoLocalStorage(itensAtualizados);
    }
  };

  const alternarDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].detalhesVisiveis = !itensAtualizados[indice].detalhesVisiveis;
    setItens(itensAtualizados);
  };

  const iniciarEdicaoDetalhes = (indice) => {
    setEdicaoDetalhes({ indice });
  };

  const salvarEdicaoDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    setEdicaoDetalhes({ indice: null });
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  const fecharDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].detalhesVisiveis = false;
    setItens(itensAtualizados);
    setEdicaoDetalhes({ indice: null });
  };

  const excluirItem = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados.splice(indice, 1);
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  const limparItens = () => {
    setItens([]); // Limpa a lista de itens
    localStorage.removeItem('itens'); // Remove os itens do localStorage
  };

  // Contador para itens na lista
  const contadorItensNaLista = itens.length;

  // Contador para itens marcados como Lidos
  const contadorItensLidos = itens.filter((item) => item.status === 'Lido').length;

  return (
    <div>
      <h2 className='titulo1'>~ Acervo ~</h2>
      <div className='subtitulo'>
        <p className='titulos'>Títulos: {contadorItensNaLista}</p>
        <p className='titulos'>Lidos: {contadorItensLidos}</p>
      </div>
      <ul className='UL'>
        {itens.map((item, indice) => (
          <li className='item' key={indice}>
            <hr></hr>
            <div className='divNomeLivro'>
              {item.titulo} - {item.status}

              <button className='buttonDetalhes' onClick={() => alternarDetalhes(indice)}>Detalhes</button>
              <button className='buttonExcluir' onClick={() => excluirItem(indice)}>Excluir</button>
            </div>

            {item.detalhesVisiveis && (
              <div>
                {edicaoDetalhes.indice === indice ? (
                  <div>
                    <div className='InputInfo'>
                      <div className="form">
                        <input
                          className='input2'
                          type="text"
                          placeholder="Resumo"
                          value={item.resumo}
                          onChange={(e) => {
                            const itensAtualizados = [...itens];
                            itensAtualizados[indice].resumo = e.target.value;
                            setItens(itensAtualizados);
                          }}
                        />
                      </div>

                      <div className="form">
                        <input
                          className='input2'
                          type="text"
                          placeholder="Autor"
                          value={item.autor}
                          onChange={(e) => {
                            const itensAtualizados = [...itens];
                            itensAtualizados[indice].autor = e.target.value;
                            setItens(itensAtualizados);
                          }}
                        />
                      </div>
                    </div>
                    <div className='classi'>
                      Estrelas:
                      <select className='selcionar'
                        value={item.classificacao}
                        onChange={(e) => {
                          const itensAtualizados = [...itens];
                          itensAtualizados[indice].classificacao = parseInt(e.target.value);
                          setItens(itensAtualizados);
                        }}
                      >
                        <option className='selecione' value="0">Selecione</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>
                    <button className='marcarLido' onClick={() => salvarEdicaoDetalhes(indice)}>Salvar</button>
                  </div>
                ) : (
                  <div className='txDetalhes'>
                    <p className='detalhe'>Resumo: {item.resumo}</p>
                    <p className='detalhe'>Autor: {item.autor}</p>
                    <p className='detalhe'>Classificação: {item.classificacao}</p>
                    <div className='GrupoBotoes'>
                      {item.status === '' && (
                        <button className='ButtonmarcarLido' onClick={() => alternarStatusParaLido(indice)}>Marcar como Lido</button>
                      )}
                      <button className='buttonEditar' onClick={() => iniciarEdicaoDetalhes(indice)}>Editar</button>
                      <button className='buttonEditar' onClick={() => fecharDetalhes(indice)}>Ver menos</button>
                    </div>
                  </div>
                )}

              </div>
            )}
          </li>
        ))}
      </ul>
      <div className='div-parte-texto'>
        <div className="form">
          <input
            className="input"
            type="text"
            placeholder="Nome do Livro"
            value={textoDeEntrada}
            onChange={(e) => setTextoDeEntrada(e.target.value)}
          />
          <span className="input-border"></span>
        </div>
        <button className='btAdicionarLivro' onClick={adicionarItem}>Adicionar título</button>
        <button className='btAdicionarLivro' onClick={limparItens}>Limpar acervo</button>
      </div>
    </div>
  );
}

export default ListaDeItens;