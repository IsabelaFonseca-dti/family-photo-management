export declare class CreateAlbumDTOResponse {
    userId: number;
    id: number;
    title: string;
}
export type CreateAlbumDTORequest = Omit<CreateAlbumDTOResponse, 'id'>;
