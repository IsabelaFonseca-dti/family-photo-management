import { CreateAlbumDTOResponse } from './create-album.dto';
export declare class UpdateAlbumDTOResponse extends CreateAlbumDTOResponse {
}
export type UpdateAlbumDTORequest = Omit<UpdateAlbumDTOResponse, 'id'>;
