import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import pixabayApi from '../servicesApi/posts-api';

const Status = {
  IDLE: 'idle',
  // непрацюючий

  PENDING: 'pending',
  //  ===== очікує
  RESOLVED: 'resolved',
  //  ВИРІШИЛИ:
  REJECTED: 'rejected',
  // відхилили
};

class App extends Component {
  state = {
    images: [],
    // loading: false,
    search: '',
    status: 'idle',
    page: 1,
    largeImage: '',
  };

  componentDidUpdate(prevPops, prevState) {
    const prevName = prevState.search;
    const nextName = this.state.search;

    if (prevName !== nextName) {
      this.renderImg();
    }
  }

  renderImg = () => {
    const { search, page } = this.state;

    pixabayApi
      .fetchImages(search, page)
      .then(response =>
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => this.setState({ status: Status.RESOLVED }));
  };

  searchPosts = newSearch => {
    this.setState({ search: newSearch, images: [], page: 1 });
  };

  // loadMore = () => {
  //   this.setState(({ page }) => ({ page: page + 1 }));
  // };

  render() {
    const { status, images } = this.state;
    const { searchPosts, renderImg } = this;

    if (status === Status.IDLE) {
      return (
        <div>
          <Searchbar onSubmit={searchPosts} />
        </div>
      );
    }
    if (status === Status.PENDING) {
      return (
        <div>
          <Searchbar onSubmit={searchPosts} />
          <ImageGallery images={images} />
        </div>
      );
    }
    if (status === Status.REJECTED) {
      return (
        <div>
          <Searchbar onSubmit={searchPosts} />
          <p>something went wrong, try again</p>
        </div>
      );
    }
    if (status === Status.RESOLVED) {
      return (
        <div>
          <Searchbar onSubmit={searchPosts} />
          <ImageGallery images={images} />
          <Button onClick={renderImg} />
        </div>
      );
    }
  }
}

export default App;
