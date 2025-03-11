import { CreateAlbumDTOResponse } from './create-album.dto';

export class UpdateAlbumDTOResponse extends CreateAlbumDTOResponse {}

export type UpdateAlbumDTORequest = Omit<UpdateAlbumDTOResponse, 'id'>;
