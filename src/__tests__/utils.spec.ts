import { bem } from '../utils';

describe('Utils', () => {
  const cx = bem('testWidget');

  describe('bem', () => {
    it('generates className for root', () => {
      expect(cx()).toBe('cvi-testWidget');
      expect(cx('')).toBe('cvi-testWidget');
    });

    it('generates className for an element', () => {
      expect(cx('input')).toBe('cvi-testWidget-input');
    });

    it('generates className for subElement', () => {
      expect(cx('input', 'min')).toBe('cvi-testWidget-input--min');
      expect(cx('', 'min')).toBe('cvi-testWidget--min');
    });
  });
});
