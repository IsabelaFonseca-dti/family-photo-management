import { CreatePhotoDTOResponse } from './create-photo.dto';
export declare class UpdatePhotoDTOResponse extends CreatePhotoDTOResponse {
}
export type UpdatePhotoDTORequest = Omit<UpdatePhotoDTOResponse, 'id'>;
