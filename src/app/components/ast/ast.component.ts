import { Component, OnInit } from '@angular/core';
import { Arbol } from 'src/app/models/arbol.model';

import { parser } from 'src/app/utils/gramatica/gramatica.js';

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styles: [
  ]
})
export class AstComponent implements OnInit {
  public options: any;
  public autoResize: boolean;

  constructor() {
    this.autoResize = true;

    this.options = {
      backgroundColor: '#0f111a',

      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },

      series: [
        {
          type: 'tree',
          data: [],
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
          initialTreeDepth: 5,

          // edgeShape: 'polyline',
          // edgeForkPosition: '63%',

          expandAndCollapse: true,

          label: {
            position: 'top',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12,
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

  ngOnInit(): void {
    this.setData(<Arbol>parser.parse('2*3+10<30*3 && (true || false);2+4;').getAST());
  }

  public setData(data: any): void {
    this.options.series[0].data = [data];
    this.options.series[0].initialTreeDepth = 25;
  }
}
