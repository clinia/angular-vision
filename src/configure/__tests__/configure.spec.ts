import { createRenderer } from '../../../test/test-renderer';
import { NgCviConfigure } from '../configure';

describe('Configure', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState: {},
      TestedWidget: NgCviConfigure,
      template: '<cvi-configure></cvi-configure>',
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('applies updates', () => {
    const render = createRenderer({
      TestedWidget: NgCviConfigure,
      template: '<cvi-configure></cvi-configure>',
    });
    const fixture = render();
    const refineSpy = jest.spyOn(
      fixture.componentInstance.testedWidget.state,
      'refine'
    );
    fixture.componentInstance.testedWidget.searchParameters = { hi: 'there' };
    fixture.detectChanges();
    // does not work because `searchParameters` is undefined, but works in real life
    // fixture.componentInstance.testedWidget.searchParameters.hi = "where?";
    const searchParams: any = {};
    fixture.componentInstance.testedWidget.searchParameters = searchParams;
    searchParams.hi = 'where?';
    fixture.detectChanges();

    expect(refineSpy).toHaveBeenCalledWith({ hi: 'there' });
    expect(refineSpy).toHaveBeenCalledWith({ hi: 'where?' });
  });
});
