import React, { useEffect, useState } from "react";
import api from 'services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ${new Date()}`,
      url: 'https://github/jonathanfrosto/conceitos-node',
      techs: ['Nodejs', 'Reactjs']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(repositorie => repositorie.id === id);

    let toRepositories = [...repositories];
    toRepositories.splice(index, 1);

    console.log(toRepositories);
    setRepositories(toRepositories);

    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
      
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )})}
      </ul>
    
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
