import React, { useState, useEffect } from "react";

import Api from './services/api'

import "./styles.css";

function App() {

  /* Valores dos repositorios e seu estado. */
  const [repositories, setRepositories] = useState([])

  /* Disparo de funções e retorno de infomações em tela. */
  useEffect(() => {
    Api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await Api.post('repositories', {
      title: "Bootcamp - Challenger Teste",
      url: "http://www.github.com/bootcamp-challenger-teste",
      techs: ["React", "NodeJs"]
    })

    const repositorie = response.data

    /* 
      setRepositories -> Alterando o estado.
      repositorie -> Recebenmdo o novo valor.
    */
    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    await Api.delete(`repositories/${id}`)

    /* 
      Mantendo apenas os repositorios que possui id diferente do qual
      foi removido. 
    */
    setRepositories(repositories.filter(
      repositorie => repositorie.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
