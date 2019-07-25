import React, { Component } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  // load localStorage data
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // save data to localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
      error: false,
    });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();

      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      const response = await api.get(`/repos/${newRepo}`);

      const duplicatedRepository = repositories.findIndex(
        repository => response.data.full_name === repository.name
      );

      if (duplicatedRepository !== -1) {
        throw String('Duplicated repository');
      }

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  handleDelete = repository => {
    const { repositories } = this.state;

    const newRepositories = [...repositories];

    const index = newRepositories.findIndex(r => r.name === repository);

    if (index !== -1) {
      newRepositories.splice(index, 1);
      this.setState({ repositories: newRepositories });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithub color="#eee" />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#ebf1ed" size={14} />
            ) : (
              <FaPlus color="#ebf1ed" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                <span>{repository.name}</span>
              </Link>
              <FaTrashAlt
                color="#ebf1ed"
                size={16}
                onClick={() => this.handleDelete(repository.name)}
              />
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
