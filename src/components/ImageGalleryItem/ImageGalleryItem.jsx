import propTypes from 'prop-types';
// import s from './ImageGalleryItem.module.css';
import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    src: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    largeImageUrl: propTypes.string.isRequired,
  };

  render() {
    const { src, alt } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img src={src} alt={alt} className="ImageGalleryItemImage" />
      </li>
    );
  }
}

export default ImageGalleryItem;
