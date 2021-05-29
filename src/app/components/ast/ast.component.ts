import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styles: [
  ]
})
export class AstComponent implements OnInit {
  public options: any;
  public data = {
    "name": "Raiz",
    "children": [
      {
        "name": "Instruccion",
        "children": [
          { "name": "Suma", "children": [] },
          { "name": "Resta" },
          { "name": "Multiplicacion" },
          { "name": "Division" }
        ]
      },
      { "name": "Instruccion" },
      { "name": "Instruccion" },
      { "name": "Instruccion" }
    ]
  };


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
          data: [this.data],
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
          initialTreeDepth: 3,

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

  ngOnInit(): void { }
}
