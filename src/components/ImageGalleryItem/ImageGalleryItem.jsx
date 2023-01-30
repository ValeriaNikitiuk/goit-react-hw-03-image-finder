import { Component } from 'react';
import propTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <li className={s.galleryItem}>
        <img src={webformatURL} alt="img" />
      </li>
    );
  }
}

ImageGalleryItem.proPtypes = {
  item: propTypes.object.isRequired,
};

export default ImageGalleryItem;
