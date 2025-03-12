import apiInstance from '../../../shared/api/Api';
import AlbumsManager from './AlbumsManager';
import AlbumsRepository from './AlbumsRepository';

const albumsRepositoryInstance = new AlbumsRepository(apiInstance);
const albumsManagerInstance = new AlbumsManager(albumsRepositoryInstance);

export default albumsManagerInstance;
