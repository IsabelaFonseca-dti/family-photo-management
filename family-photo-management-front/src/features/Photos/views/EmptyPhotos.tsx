import { FC } from 'react';
import { PHOTOS_TEXTS } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IEmptyPhotosProps {}

const EmptyPhotos: FC<IEmptyPhotosProps> = () => {
  return (
    <>
      <h4>{PHOTOS_TEXTS.emptyPhotoList}</h4>
    </>
  );
};

export default EmptyPhotos;
