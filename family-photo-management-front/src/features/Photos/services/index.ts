import apiInstance from '../../../shared/api/Api';
import PhotosManager from './PhotosManager';
import PhotosRepository from './PhotosRepository';

const photosRepositoryInstance = new PhotosRepository(apiInstance);
const photosManagerInstance = new PhotosManager(photosRepositoryInstance);

export default photosManagerInstance;
