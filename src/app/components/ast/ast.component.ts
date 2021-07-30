import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styles: [
  ]
})
export class AstComponent implements OnInit {
  public options: any;
  public updateOptions: any;
  public autoResize: boolean;

  private data: any[];

  constructor(private _dataService: DataService) {
    this.autoResize = true;
    this.options = this.optionsAST();

    this.data = [];
  }

  ngOnInit(): void {
    this._dataService.currentAST.subscribe(ast => this.setData(ast));
  }

  private optionsAST(): Object {
    return {
      backgroundColor: '#0f111a',

      // title: {
      //   text: 'Dynamic Data AST'
      // },

      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          saveAsImage: {
            show: true,
            type: 'png',
            backgroundColor: null
          },
        },
      },

      series: [
        {
          name: 'Mocking Data',
          type: 'tree',
          data: this.data,
          orient: 'vertical',

          // width: '100%',
          // height: '100%',

          left: '1%',
          right: '1%',
          top: '5%',
          bottom: '5%',

          symbol: 'emptyCircle',
          symbolSize: 10,

          roam: true,
          initialTreeDepth: undefined,

          // edgeShape: 'polyline',
          // edgeForkPosition: '63%',

          expandAndCollapse: true,

          label: {
            position: 'top',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 13,
            color: '#E91E63'
          },
          itemStyle: {
            color: '#E91E63',
          },
          lineStyle: {
            // color: "#fff"
          },

          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },

          emphasis: {
            focus: 'descendant'
          },

          animationDuration: 550,
          animationDurationUpdate: 750
        },
      ],
    };
  }

  public setData(data: object): void {
    this.data = [data];

    this.updateOptions = {
      series: [{
        data: this.data
      }]
    };
  }
}
