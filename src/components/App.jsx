import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchPost } from '../servicesApi/posts-api';
import { Button } from './Button/Button';
import axios from 'axios';

class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
  };

  componentDidUdate(prevPops, prevState) {
    const { search } = this.state;
    if (prevState.search !== search) {
      this.setState({ loading: true });
      searchPost(search)
        .then(data => this.setState({ items: data }))
        .catch(error => this.setState({ error: error.message }))
        .finaly(() => this.setState({ loading: false }));
    }
  }

  searchPost = ({ search }) => {
    this.setState({ search });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  render() {
    const { items, loading, error } = this.state;
    const { searchPost, loadMore } = this;
    return (
      <>
        <Searchbar onSubmit={searchPost} />
        <ImageGallery items={items} />
        <Button onClick={loadMore} />
      </>
    );
  }
}

export default App;
