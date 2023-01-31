import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import pixabayApi from '../servicesApi/posts-api';
import Loader from './Loader/Loader';

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
    error: null,
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
    this.setState({ search: newSearch, page: 1, images: [] });
  };

  // loadMore = () => {
  //   this.setState(({ page }) => ({ page: page + 1 }));
  // };

  render() {
    const { status, images } = this.state;
    const { searchPosts, renderImg } = this;

    return (
      <>
        <Searchbar onSubmit={searchPosts} />

        {status === Status.IDLE && <p>Please enter your search term</p>}
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && <p>Something wrong, try later</p>}

        {status === Status.RESOLVED && (
          <>
            <ImageGallery images={images} />
            <Button onClick={renderImg} />
          </>
        )}
      </>
    );
  }
}

export default App;
