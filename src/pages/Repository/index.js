import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FaSpinner,
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  Filter,
  FilterItem,
  Pagination,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
    limit: 5,
    state: 'open',
  };

  async componentDidMount() {
    const { match } = this.props;

    const { page, limit, state } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      await api.get(`/repos/${repoName}`),
      await api.get(`/repos/${repoName}/issues`, {
        params: {
          page,
          state,
          per_page: limit,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async filter => {
    await this.setState({
      state: filter,
      page: 1,
    });

    this.loadIssues();
  };

  handlePagination = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'prev' ? page - 1 : page + 1,
    });

    this.loadIssues();
  };

  async loadIssues() {
    const { repository, page, state, limit } = this.state;

    this.setState({ loading: true });

    const repoName = decodeURIComponent(repository.full_name);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        page,
        state,
        per_page: limit,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading, page, limit, state } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#ebf1ed" size={60} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          <FilterItem
            selected={state === 'all'}
            type="submit"
            onClick={() => this.handleFilter('all')}
          >
            <FaInfoCircle color="#ebf1ed" size={20} /> All
          </FilterItem>

          <FilterItem
            type="submit"
            selected={state === 'open'}
            onClick={() => this.handleFilter('open')}
          >
            <FaExclamationCircle color="#ebf1ed" size={20} /> Open
          </FilterItem>

          <FilterItem
            type="submit"
            selected={state === 'closed'}
            onClick={() => this.handleFilter('closed')}
          >
            <FaCheckCircle color="#ebf1ed" size={20} /> Closed
          </FilterItem>
        </Filter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  <br />
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <a href={issue.user.html_url}>{issue.user.login}</a>
              </div>
            </li>
          ))}
        </IssueList>

        <Pagination>
          <button
            type="submit"
            disabled={page === 1}
            onClick={() => this.handlePagination('prev')}
          >
            <FaAngleLeft color="#ebf1ed" size={30} />
            PREV
          </button>

          <button
            type="submit"
            disabled={issues.length < limit}
            onClick={() => this.handlePagination('next')}
          >
            NEXT
            <FaAngleRight color="#ebf1ed" size={30} />
          </button>
        </Pagination>
      </Container>
    );
  }
}
