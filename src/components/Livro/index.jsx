import React, { useState, useEffect } from 'react';
import './livro.css'

function Livro() {

  // Estado para armazenar a lista de itens
  const [itens, setItens] = useState([]);

  // Estado para controlar o texto de entrada
  const [textoDeEntrada, setTextoDeEntrada] = useState('');

  // Estado para controlar a edição dos detalhes de um item
  const [edicaoDetalhes, setEdicaoDetalhes] = useState({ indice: null });

  // Efeito colateral para carregar dados salvos do localStorage ao iniciar
  useEffect(() => {
    const savedItens = JSON.parse(localStorage.getItem('itens'));
    if (savedItens) {
      setItens(savedItens);
    }
  }, []);

  // Função para salvar os detalhes no localStorage
  const salvarDetalhesNoLocalStorage = (itensAtualizados) => {
    localStorage.setItem('itens', JSON.stringify(itensAtualizados));
  };

  // Função para adicionar um novo item à lista
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

  // Função para alternar o status de um item para "Lido"
  const alternarStatusParaLido = (indice) => {
    const itensAtualizados = [...itens];
    if (itensAtualizados[indice].status === '') {
      itensAtualizados[indice].status = 'Lido';
      setItens(itensAtualizados);
      salvarDetalhesNoLocalStorage(itensAtualizados);
    }
  };

  // Função para alternar a visibilidade dos detalhes de um item
  const alternarDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].detalhesVisiveis = !itensAtualizados[indice].detalhesVisiveis;
    setItens(itensAtualizados);
  };

  // Função para iniciar a edição dos detalhes de um item
  const iniciarEdicaoDetalhes = (indice) => {
    setEdicaoDetalhes({ indice });
  };

  // Função para salvar as edições dos detalhes de um item
  const salvarEdicaoDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].detalhesVisiveis = false;
    setEdicaoDetalhes({ indice: null });
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  // Função para fechar os detalhes de um item
  const fecharDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].detalhesVisiveis = false;
    setItens(itensAtualizados);
    setEdicaoDetalhes({ indice: null });
  };

  // Função para excluir um item da lista
  const excluirItem = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados.splice(indice, 1);
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  // Função para limpar a lista de itens
  const limparItens = () => {
    setItens([]);
    localStorage.removeItem('itens');
  };

  // Contador para itens na lista
  const contadorItensNaLista = itens.length;

  // Contador para itens marcados como "Lidos"
  const contadorItensLidos = itens.filter((item) => item.status === 'Lido').length;

  return (
    <div className='DivPrincipalLivro'>
      <h2 className='titulo1'>~ Livros ~</h2>
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
                        <option className='selecione' value="1">⭐</option>
                        <option className='selecione' value="2">⭐⭐</option>
                        <option className='selecione' value="3">⭐⭐⭐</option>
                        <option className='selecione' value="4">⭐⭐⭐⭐</option>
                        <option className='selecione' value="5">⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>
                    <button className='SalvarAlteracao' onClick={() => salvarEdicaoDetalhes(indice)}>Salvar</button>
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
        <div className="forma">
          <input
            className="inputNomeLivro"
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

export default Livro;
