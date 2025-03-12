export const PHOTOS_TEXTS = {
  addNewPhoto: 'Add New Photo',
  photoTitle: 'Photo Title:',
  photoTitlePlaceholder: 'Add photo title',
  selectImage: 'Select Image:',
  addPhotoButton: 'Add Photo',
  loading: 'Loading...',
  successPhotoCreated: 'Photo was created successfully',
  errorPhotoCreated: 'Photo could not be created',
  successPhotoDeleted: 'Photo was deleted successfully',
  errorPhotoDeleted: 'Photo could not be deleted',
  addMore: 'Add More',
  userPhotos: (username?: string, email?: string) => `List of ${username}'s (${email}) Photos`,
  albumTitle: (albumTitle?: string) => `Album ${albumTitle}`,
};
