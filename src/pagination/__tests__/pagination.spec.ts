import { createRenderer } from '../../../test/test-renderer';
import { NgCviPagination } from '../pagination';

import { bem } from '../../utils';

const cx = bem('Pagination');

const defaultState = {
  createURL: jest.fn(),
  currentRefinement: 0,
  total: 100,
  numPages: 20,
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<cvi-pagination></cvi-pagination>',
  TestedWidget: NgCviPagination,
});

describe('Pagination', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders with pages in state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('renders does not uses pagesPadding when numPages < pagesPadding * 2 + 1', () => {
    const fixture = render({ numPages: 5 });
    const pages = fixture.debugElement.nativeElement.querySelectorAll(
      `.${cx('item', 'page')}`
    );

    expect(pages.length).toBe(5);
    expect(fixture).toMatchSnapshot();
  });

  it('should refine when clicking a page', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    const el = fixture.debugElement.nativeElement;
    const [, secondPage] = el.querySelectorAll(`.${cx('item', 'page')}`);
    secondPage.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(1);

    fixture.componentInstance.testedWidget.state.currentRefinement = 3;
    fixture.detectChanges();

    const previous = el.querySelector(`.${cx('item', 'previousPage')}`);
    previous.click();

    expect(refine).toHaveBeenLastCalledWith(2);

    const next = el.querySelector(`.${cx('item', 'nextPage')}`);
    next.click();

    expect(refine).toHaveBeenLastCalledWith(4);
  });

  it('should display last page button', () => {
    const refine = jest.fn();
    const fixture = render({ refine });

    fixture.componentInstance.testedWidget.showLast = true;
    fixture.detectChanges();

    const lastPage = fixture.debugElement.nativeElement.querySelector(
      `.${cx('item', 'lastPage')}`
    );

    lastPage.click();

    expect(refine).toHaveBeenCalled();
    expect(refine).toHaveBeenCalledWith(defaultState.numPages - 1);
  });

  it("should not refine when there's no other pages", () => {
    const refine = jest.fn();
    const fixture = render({ refine, numPages: 1 });

    fixture.componentInstance.testedWidget.showLast = true;
    fixture.detectChanges();

    const firstPage = fixture.debugElement.nativeElement.querySelector(
      `.${cx('item', 'firstPage')}`
    );
    const previousPage = fixture.debugElement.nativeElement.querySelector(
      `.${cx('item', 'previousPage')}`
    );
    const nextPage = fixture.debugElement.nativeElement.querySelector(
      `.${cx('item', 'nextPage')}`
    );
    const lastPage = fixture.debugElement.nativeElement.querySelector(
      `.${cx('item', 'lastPage')}`
    );

    firstPage.click();
    previousPage.click();
    nextPage.click();
    lastPage.click();

    expect(refine).not.toHaveBeenCalled();
  });
  it('should not add cvi-Pagination--noRefinement CSS class on root when numPages > 1', () => {
    const fixture = render({ numPages: 2 });
    expect(
      fixture.debugElement.nativeElement.querySelector(
        'cvi-pagination > .cvi-Pagination--noRefinement'
      )
    ).toBeFalsy();
    expect(fixture).toMatchSnapshot();
  });
  it('should add cvi-Pagination--noRefinement CSS class on root when numPages === 1', () => {
    const fixture = render({ numPages: 1 });
    expect(
      fixture.debugElement.nativeElement.querySelector(
        'cvi-pagination > .cvi-Pagination--noRefinement'
      )
    ).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
  it('should add cvi-Pagination--noRefinement CSS class on root when numPages === 0', () => {
    const fixture = render({ numPages: 0 });
    expect(
      fixture.debugElement.nativeElement.querySelector(
        'cvi-pagination > .cvi-Pagination--noRefinement'
      )
    ).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
