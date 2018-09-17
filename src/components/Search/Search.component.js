import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitSearch } from '../../actions/search.reducer';
import { TopStoriesAPI } from '../../apis/topStories.api';

import { cardContent }  from './Search.component.css';

class ConnectedSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      labelText: 'Use the input field to search for news',
      searchTerms: '',
      topStories: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveTopFiveStories = this.retrieveTopFiveStories.bind(this);
  }

  handleChange(event) {
    this.setState({searchTerms: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitSearch(this.state.searchTerms);
    this.setState({labelText: this.state.searchTerms});
  }

  componentDidMount() {
    this.retrieveTopFiveStories();
  }

  retrieveTopFiveStories()  {
    TopStoriesAPI.topStories().then(topStories => {
      const topFiveStories = topStories.slice(0, 5);
      this.setState({topStories: topFiveStories});
    });
  }

  render() {
    return (
      <div className={`Search ${cardContent}`}>
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.searchTerms} onChange={this.handleChange} />
          <button type="submit" disabled={!this.state.searchTerms}>Search</button>
          <label>{this.state.labelText}</label>
        </form>
        <div id="top-stories">
          <h3>Top Stories</h3>
          <ul>
            {this.state.topStories.map(id =>  <li key={id}>{id}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      searchTerms: state.searchTerms
  }
};

const mapDispatchToProps = dispatch => {
  return { 
    submitSearch: searchTerms => dispatch(submitSearch(searchTerms))
  };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);

export default Search;
