import { Component } from '@angular/core';
import clinia from 'clinia/lite';

interface Helper {
  search: Function;
}

interface WrapWithRecordsParams {
  template: string;
  styles?: string[];
  searchParameters?: {};
  methods?: {};
  searchFunction?: (helper: Helper) => void;
  searchClient?: {};
  // TODO: update with Vision.js types
  insightsClient?: (method: string, payload: object) => void;
  indexName?: string;
  appId?: string;
  apiKey?: string;
  records?: string;
  routing?: boolean | {};
}

const defaultRecords = `
<ng-template let-records="records">
  <ol class="playground-records">
    <li
      *ngFor="let record of records"
      class="record playground-records-item"
      id="record-{{record.id}}"
    >
      {{record.name}}
    </li>
  </ol>
</ng-template>
`;

export default ({
  template,
  styles = [],
  searchParameters = {},
  methods = {},
  searchFunction,
  insightsClient,
  indexName = 'health_facility',
  appId = 'demo-pharmacies',
  apiKey = 'KcLxBhVFP8ooPgQODlAxWqfNg657fTz9',
  records = defaultRecords,
  routing,
}: WrapWithRecordsParams) => {
  @Component({
    selector: 'cvi-app',
    styles,
    template: `
      <cvi-vision [config]="config">
        <div class="cvi-container cvi-container-preview">
          ${template}
        </div>
        <div class="cvi-container cvi-container-playground">
          <div class="panel-left">
          </div>
          <div class="panel-right">
            <cvi-search-box placeholder="Search into pharmacies"></cvi-search-box>
            <cvi-records>
              ${records}
            </cvi-records>
            <cvi-pagination [totalPages]="20"></cvi-pagination>
          </div>
        </div>
      </cvi-vision>
    `,
  })
  class AppComponent {
    config = {
      searchClient: clinia(appId, apiKey),
      insightsClient,
      indexName,
      searchFunction,
      searchParameters: {
        perPage: 3,
        ...searchParameters,
      },
      routing,
    };

    constructor() {
      Object.keys(methods).forEach(methodName => {
        this[methodName] = methods[methodName];
      });
    }
  }

  return AppComponent;
};
