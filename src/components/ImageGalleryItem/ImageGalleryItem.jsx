import React, { Component } from 'react';
import propTypes from 'prop-types';
import Modal from '../sharedComponents/Modal';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { src, alt, largeImageUrl } = this.props;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          onClick={this.toggleModal}
          src={src}
          alt={alt}
          className={s.ImageGalleryItemImage}
        />
        {showModal && (
          <Modal onClose={this.toggleModal} src={largeImageUrl} alt={alt} />
        )}
      </li>
    );
  }

  static propTypes = {
    src: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    largeImageUrl: propTypes.string.isRequired,
  };
}

export default ImageGalleryItem;
