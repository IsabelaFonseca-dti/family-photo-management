import { FC, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ImageContainer, SliderButton, SliderWrapper } from './ImageSlider.styled';

interface ImageSliderProps {
  images: { url: string; title: string }[];
}

const ImageSlider: FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <SliderWrapper>
      <SliderButton left onClick={prevImage}>
        <FaArrowLeft />
      </SliderButton>
      <ImageContainer>
        <img src={images[currentIndex].url} alt={images[currentIndex].title} />
        <p>{images[currentIndex].title}</p>
      </ImageContainer>
      <SliderButton onClick={nextImage}>
        <FaArrowRight />
      </SliderButton>
    </SliderWrapper>
  );
};

export default ImageSlider;
