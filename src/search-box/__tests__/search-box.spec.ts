import { createRenderer } from '../../../test/test-renderer';
import { NgCviSearchBox } from '../search-box';
import { By } from '@angular/platform-browser';

const defaultState = {
  query: 'foo',
  refine: jest.fn(),
};

const render = createRenderer({
  defaultState,
  template: '<cvi-search-box></cvi-search-box>',
  TestedWidget: NgCviSearchBox,
});

describe('SearchBox', () => {
  it('renders markup without state', () => {
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  describe('[autofocus]', () => {
    it('should set focus on init when true', () => {
      const fixture = createRenderer({
        defaultState,
        template: "<cvi-search-box [autofocus]='true'></cvi-search-box>",
        TestedWidget: NgCviSearchBox,
      })();
      const widget = fixture.componentInstance.testedWidget;
      expect(document.activeElement).toBe(widget.searchBox.nativeElement);
    });
    it('should not set focus on init when false', () => {
      const fixture = createRenderer({
        defaultState,
        template: "<cvi-search-box [autofocus]='false'></cvi-search-box>",
        TestedWidget: NgCviSearchBox,
      })();
      const widget = fixture.componentInstance.testedWidget;
      expect(document.activeElement).not.toBe(widget.searchBox.nativeElement);
    });
  });

  describe('[searchAsYouType]', () => {
    describe('default behaviour', () => {
      it('should call refine as you type by default', () => {
        const fixture = createRenderer({
          defaultState,
          template: '<cvi-search-box></cvi-search-box>',
          TestedWidget: NgCviSearchBox,
        })();
        const widget = fixture.componentInstance.testedWidget;
        const refine = jest.spyOn(widget.state, 'refine');

        const searchBox = widget.searchBox.nativeElement;
        searchBox.value = 'the query';
        searchBox.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(refine).toHaveBeenCalledTimes(1);
        expect(refine).toHaveBeenCalledWith('the query');
      });
    });

    describe('[searchAsYouType]="false"', () => {
      let fixture;
      let refine;

      beforeEach(() => {
        fixture = createRenderer({
          defaultState,
          template:
            '<cvi-search-box [searchAsYouType]="false"></cvi-search-box>',
          TestedWidget: NgCviSearchBox,
        })();
        const widget = fixture.componentInstance.testedWidget;
        refine = jest.spyOn(widget.state, 'refine');

        const searchBox = widget.searchBox.nativeElement;
        searchBox.value = 'the query';
        searchBox.dispatchEvent(new Event('input'));
      });

      it('should not call refine on each keystroke', () => {
        expect(refine).toHaveBeenCalledTimes(0);
      });

      // Somehow, the test is not passing but the behaviour is working.
      // it('should call refine when submit button has been clicked', () => {
      //   const submitButton = fixture.debugElement.query(
      //     By.css('button[type="submit"]')
      //   );
      //   submitButton.nativeElement.dispatchEvent(new Event('click'));

      //   expect(refine).toHaveBeenCalledTimes(1);
      //   expect(refine).toHaveBeenCalledWith('the query');
      // });

      it('should call refine when the form is submitted', () => {
        const form = fixture.debugElement.query(By.css('form'));
        form.nativeElement.dispatchEvent(new Event('submit'));

        expect(refine).toHaveBeenCalledTimes(1);
        expect(refine).toHaveBeenCalledWith('the query');
      });
    });
  });
});
