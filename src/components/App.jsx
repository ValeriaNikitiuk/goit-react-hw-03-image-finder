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
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: Status.PENDING });
      this.renderImg();
    }
  }

  renderImg = () => {
    // this.setState({ status: Status.PENDING });
    const { search, page } = this.state;

    pixabayApi
      .fetchImages(search, page)
      .then(response =>
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          // page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => this.setState({ status: Status.RESOLVED }));
  };

  searchPosts = newSearch => {
    this.setState({ search: newSearch, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // плюсує сторінки , але не рендерить фото

  render() {
    const { status, images } = this.state;
    const { searchPosts, loadMore } = this;

    return (
      <>
        <Searchbar onSubmit={searchPosts} />

        {status === Status.IDLE && <p>Please enter your search term</p>}
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && <p>Something wrong, try later</p>}

        {images.length > 0 && (
          <>
            <ImageGallery images={images} />
            <Button onClick={loadMore}>
              <Loader />
            </Button>
          </>
        )}
      </>
    );
  }
}

export default App;
