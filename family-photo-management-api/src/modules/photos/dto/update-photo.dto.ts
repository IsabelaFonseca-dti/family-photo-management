import { CreatePhotoDTOResponse } from './create-photo.dto';

export class UpdatePhotoDTOResponse extends CreatePhotoDTOResponse {}

export type UpdatePhotoDTORequest = Omit<UpdatePhotoDTOResponse, 'id'>;
