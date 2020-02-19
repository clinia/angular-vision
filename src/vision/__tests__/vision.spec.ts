import { NgCviVisionModule } from '../vision.module';
import { Component, VERSION as AngularVersion } from '@angular/core';
import { VERSION } from '../../version';
import { TestBed } from '@angular/core/testing';

jest.mock('@clinia/vision/es', () => ({
  default: () => {
    return {
      on: jest.fn(),
      start: jest.fn(),
      removeListener: jest.fn(),
      dispose: jest.fn(),
    };
  },
}));

jest.mock('../../../src/base-widget');

describe('Vision', () => {
  it('should add user agent when the client is provided to the config', () => {
    const searchClient = {
      addCliniaAgent: jest.fn(),
      search: jest.fn(),
    };

    @Component({
      template: `<cvi-vision [config]="config"> </cvi-vision>`,
    })
    class TestContainer {
      public config = {
        indexName: 'theIndexName',
        searchClient,
      };
    }

    TestBed.configureCompiler({ preserveWhitespaces: true } as any)
      .configureTestingModule({
        imports: [NgCviVisionModule.forRoot()],
        declarations: [TestContainer],
      })
      .compileComponents();

    const fixture = TestBed.createComponent(TestContainer);
    fixture.detectChanges();

    expect(searchClient.addCliniaAgent).toHaveBeenCalledTimes(2);
    expect(searchClient.addCliniaAgent).toHaveBeenCalledWith(
      `angular (${AngularVersion.full})`
    );
    expect(searchClient.addCliniaAgent).toHaveBeenCalledWith(
      `angular-vision (${VERSION})`
    );
  });

  it('should not add a user agent when addCliniaAgent is not provided in the client', () => {
    const searchClient = {
      addCliniaAgent: jest.fn(),
      search: jest.fn(),
    };

    @Component({
      template: `<cvi-vision [config]="config"> </cvi-vision>`,
    })
    class TestContainer {
      public config = {
        indexName: 'theIndexName',
        searchClient,
      };
    }

    TestBed.configureCompiler({ preserveWhitespaces: true } as any)
      .configureTestingModule({
        imports: [NgCviVisionModule.forRoot()],
        declarations: [TestContainer],
      })
      .compileComponents();

    expect(() => {
      const fixture = TestBed.createComponent(TestContainer);
      fixture.detectChanges();
    }).not.toThrowError();
  });
});
