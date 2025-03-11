import { ListPhotosDTOResponse } from './list-photos.dto';
export declare class CreatePhotoDTOResponse extends ListPhotosDTOResponse {
}
export type CreatePhotoDTOPostRequest = Omit<CreatePhotoDTOResponse, 'id'>;
