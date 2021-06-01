import { Component, OnInit } from '@angular/core';
import { Arbol } from 'src/app/models/arbol.model';
import { Tabla } from 'src/app/models/tabla.model';

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

  ngOnInit(): void {
    const arbol: Arbol = <Arbol>parser.parse(`
    7 - (5 + 10 * (2 + 4 * (5 + 2 * 3)) - 8 * 3 * 3) + 50 * (6 * 2);
    (2 * 2 * 2 * 2) - 9 - (8 - 6 + (3 * 3 - 6 * 5 - 7 - (9 + 7 * 7 * 7) + 10) - 5) + 8 - (6 - 5 * (2 * 3));
    214 + ((2 + 412 * 3) + 1 - ((2 * 2 * 2) - 2) * 2) - 2;
    ((100 == (50 + 50 + (214 - 214))) && ! !!!!!!! !false);
    (false || (100 > 50)) && ((100 != 100) && !!!!! true);
    `);
    const tabla: Tabla = new Tabla('Global', undefined);

    arbol.instrucciones.forEach(instruccion => {
      console.log(instruccion.ejecutar(tabla, arbol));
    });

    this.setData(arbol.getAST());
  }

  public setData(data: object): void {
    this.options.series[0].data = [data];
    // this.options.series[0].initialTreeDepth = 25;
  }
}
