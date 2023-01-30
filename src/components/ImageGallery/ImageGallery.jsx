import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <div>
      <ul className={s.gallery}>
        {items.map(item => (
          
        )
          return (
            <li
              className={s.galleryItem}
              key={id}
              largeImage={largeImageURL}
              preview={webformatURL}
            ></li>
          );
        )}
      </ul>
    </div>
  );
};

export default ImageGallery;

ImageGallery.defaultPros = {
  items: [],
};
