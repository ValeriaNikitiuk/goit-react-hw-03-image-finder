import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

function ImageGallery({ images }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          src={image.webformatURL}
          alt={image.tags}
          largeImageUrl={image.largeImageURL}
          key={image.id}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: propTypes.array,
};

export default ImageGallery;
