import { getRandomPhotoUrl } from '../../utils/photosUtils';

describe('tests on photoUtils', () => {
  describe('getRandomPhotoUrl', () => {
    it('should return a valid URL', () => {
      const url = getRandomPhotoUrl();
      expect(url).toMatch(/^https:\/\/via\.placeholder\.com\/600\/[0-9a-f]{6}$/);
    });

    it('should always return a 6-digit hexadecimal color', () => {
      const url = getRandomPhotoUrl();
      const color = url.split('/').pop();
      expect(color).toMatch(/^[0-9a-f]{6}$/);
    });
  });
});
