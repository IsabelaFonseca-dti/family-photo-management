import { FC, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTrash } from 'react-icons/fa';
import { DeleteButton, ImageContainer, ImageNotFound, SliderButton, SliderWrapper } from './ImageSlider.styled';

interface ImageSliderProps {
  images: { url: string; title: string }[];
  onDelete: (index: number, callback: () => void) => void;
}

const ImageSlider: FC<ImageSliderProps> = ({ images, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (images.length === 0) return null;

  const nextImage = () => {
    setImageError(false);
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setImageError(false);
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDelete = () => {
    onDelete(currentIndex, () => {
      const isFirst = currentIndex === 0;
      const isLast = currentIndex === images.length - 1;

      if (!isFirst) {
        prevImage();
      } else if (!isLast) {
        nextImage();
      }
    });
  };
  return (
    <SliderWrapper>
      <SliderButton left onClick={prevImage}>
        <FaArrowLeft />
      </SliderButton>
      <ImageContainer id="image-container">
        <DeleteButton onClick={handleDelete}>
          <FaTrash />
        </DeleteButton>
        {imageError ? (
          <ImageNotFound>
            <p>{`${images[currentIndex].url} was not found`}</p>
          </ImageNotFound>
        ) : (
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            onError={handleImageError} // The via.placeholder api did not work as expected, so i just treated to show an empty container instead
          />
        )}
        <p>{images[currentIndex].title}</p>
      </ImageContainer>
      <SliderButton onClick={nextImage}>
        <FaArrowRight />
      </SliderButton>
    </SliderWrapper>
  );
};

export default ImageSlider;
