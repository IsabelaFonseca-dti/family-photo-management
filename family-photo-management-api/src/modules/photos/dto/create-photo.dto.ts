import { ListPhotosDTOResponse } from './list-photos.dto';

export class CreatePhotoDTOResponse extends ListPhotosDTOResponse {}

export type CreatePhotoDTOPostRequest = Omit<CreatePhotoDTOResponse, 'id'>;
