%{
  const { Arbol } = require('src/app/models/arbol.model')
  const { Excepcion } = require('src/app/models/excepcion.model');
  const { Tipo } = require('src/app/models/tipo.model');

  const { Primitivo } = require('src/app/controllers/expresiones/primitivo.controller');

  const { NodoGrafico } = require('src/app/utils/reports/nodoGrafico');

  var excepciones = [];
%}

/* Análisis Lexico */
%lex
%options case-sensitive
comentarios       (\/\*[\s\S]*?\*\/|\/\/.*)
identificador     (([a-zA-Z_])[a-zA-Z0-9_]*)
digito            ([0-9]+)
decimal           ({digito}"."{digito}+)
comillaSimple     ("'")
comillaDoble      ("\"")
comillas          ({comillaDoble}|{comillaSimple})
cadena            ({comillas}((?:\\{comillas}|(?:(?!{comillas}).))*){comillas})

%%
\s+               /* ignorar espacios en blanco */
{comentarios}     /* ignorar comentarios */

"{"                     return '{'
"}"                     return '}'
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
","                     return ','
"."                     return '.'
":"                     return ':'
";"                     return ';'

"integer"               return 'integer'
"string"                return 'string'
"boolean"               return 'boolean'
"double"                return 'double'
"void"                  return 'void'

"false"                 return 'false'
"true"                  return 'true'
"null"                  return 'null'


"<="                    return '<='
"<"                     return '<'
"=="                    return '=='
">="                    return '>='
">"                     return '>'
"!="                    return '!='
"||"                    return '||'
"&&"                    return '&&'
"!"                     return '!'
"="                     return '='
"++"                    return '++'
"+"                     return '+'
"--"                    return '--'
"-"                     return '-'
"**"                    return '**'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
{identificador}         return 'identificador'
{decimal}               return 'decimal'
{digito}                return 'digito'
{cadena}                { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
<<EOF>>                 return 'EOF';

.                       {
                          excepciones.push(new Excepcion('Léxico', yylloc.first_line, yylloc.first_column, `Patrón desconocido ${yytext}`));
                          console.error(`Error Léxico: ${yytext} en la linea ${yylloc.first_line} y columna ${yylloc.first_column}`);
                        }
/lex

/* Asociación y precedencia de operadores */
%right '='
%right '?'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/' '%'
%left '**'
%right '!'
%left UMINUS
%right '++' '--'

%start START
%% /* Gramática */

START : SENTENCIAS_GLOBALES EOF      {
                                      const arbol = new Arbol($1.instrucciones, new NodoGrafico('RAIZ', [$1.grafica]));
                                      if (excepciones.length > 0) {
                                        arbol.excepciones.concat(excepciones);
                                        excepciones = [];
                                      }
                                      return arbol;
                                    }
      | EOF                         { return new Arbol([], new NodoGrafico('', [])); }
      ;

SENTENCIAS_GLOBALES : SENTENCIAS_GLOBALES SENTENCIA_GLOBAL    {
                                                                $$ = {
                                                                  instrucciones: $1.instrucciones,
                                                                  grafica: new NodoGrafico('SENTENCIAS_GLOBALES',
                                                                    [$1.grafica, $2.grafica]
                                                                  )
                                                                }
                                                              }
                    | SENTENCIA_GLOBAL                        {
                                                                $$ = {
                                                                  instrucciones: $1.instrucciones,
                                                                  grafica: new NodoGrafico('SENTENCIAS_GLOBALES', [$1.grafica])
                                                                }
                                                              }
                    ;

SENTENCIA_GLOBAL : EXPRESION ';'  {
                                    $$ = {
                                      instrucciones: $1.instrucciones,
                                      grafica: new NodoGrafico('SENTENCIA_GLOBAL', [
                                        $1.grafica,
                                        new NodoGrafico(';', [])
                                      ])
                                    }
                                  }
                 ;

EXPRESION
          // LOGICA
          :  EXPRESION '&&' EXPRESION   {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('&&', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          | EXPRESION '||' EXPRESION    {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('||', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          | '!' EXPRESION               {
                                          $$ = {
                                            instrucciones: $2.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              new NodoGrafico('!', [$2.grafica])
                                            ])
                                          }
                                        }
          // RELACIONAL
          | EXPRESION '<' EXPRESION     {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('<', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          | EXPRESION '>' EXPRESION     {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('>', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          | EXPRESION '<=' EXPRESION    {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('<=', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          | EXPRESION '>=' EXPRESION    {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('>=', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          | EXPRESION '==' EXPRESION    {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('==', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          | EXPRESION '!=' EXPRESION    {
                                          $$ = {
                                            instrucciones: $1.instrucciones,
                                            grafica: new NodoGrafico('EXPRESION', [
                                              $1.grafica,
                                              new NodoGrafico('!=', []),
                                              $3.grafica
                                            ])
                                          }
                                        }
          // ARITMETICA
          | EXPRESION '+' EXPRESION       {
                                            $$ = {
                                              instrucciones: $1.instrucciones,
                                              grafica: new NodoGrafico('EXPRESION', [
                                                $1.grafica,
                                                new NodoGrafico('+', []),
                                                $3.grafica
                                              ])
                                            }
                                          }
          | EXPRESION '-' EXPRESION       {
                                            $$ = {
                                              instrucciones: $1.instrucciones,
                                              grafica: new NodoGrafico('EXPRESION', [
                                                $1.grafica,
                                                new NodoGrafico('-', []),
                                                $3.grafica
                                              ])
                                            }
                                          }
          | EXPRESION '*' EXPRESION       {
                                            $$ = {
                                              instrucciones: $1.instrucciones,
                                              grafica: new NodoGrafico('EXPRESION', [
                                                $1.grafica,
                                                new NodoGrafico('*', []),
                                                $3.grafica
                                              ])
                                            }
                                          }
          | EXPRESION '/' EXPRESION       {
                                            $$ = {
                                              instrucciones: $1.instrucciones,
                                              grafica: new NodoGrafico('EXPRESION', [
                                                $1.grafica,
                                                new NodoGrafico('/', []),
                                                $3.grafica
                                              ])
                                            }
                                          }
          | '(' EXPRESION ')'             {
                                            $$ = {
                                              instrucciones: $2.instrucciones,
                                              grafica: new NodoGrafico('EXPRESION', [
                                                new NodoGrafico('(', []),
                                                $2.grafica,
                                                new NodoGrafico(')', [])
                                              ])
                                            }
                                          }
          | '-' EXPRESION %prec UMINUS    {
                                            $$ = {
                                              instrucciones: $2.instrucciones,
                                              grafica: new NodoGrafico('EXPRESION', [
                                                new NodoGrafico('-', [$2.grafica])
                                              ])
                                            }
                                          }
          | VALOR                         {
                                            $$ = {
                                              instrucciones: $1.instrucciones,
                                              grafica: new NodoGrafico('EXPRESION', [$1.grafica])
                                            }
                                          }
          ;

VALOR : 'digito'          {
                            $$ = {
                              instrucciones: new Primitivo(Tipo.PRIMITIVO, Tipo.INTEGER, $1,
                                this._$.first_line, this._$.first_column),

                              grafica: new NodoGrafico('VALOR', [
                                new NodoGrafico($1, [])
                              ])
                            }
                          }
      | 'decimal'         {
                            $$ = {
                              instrucciones: new Primitivo(Tipo.PRIMITIVO, Tipo.DOUBLE, $1,
                                this._$.first_line, this._$.first_column),

                              grafica: new NodoGrafico('VALOR', [
                                new NodoGrafico($1, [])
                              ])
                            }
                          }
      | 'cadena'          {
                            $$ = {
                              instrucciones: new Primitivo(Tipo.PRIMITIVO, Tipo.STRING, $1,
                                this._$.first_line, this._$.first_column),

                              grafica: new NodoGrafico('VALOR', [
                                new NodoGrafico($1, [])
                              ])
                            }
                          }
      | 'false'           {
                            $$ = {
                              instrucciones: new Primitivo(Tipo.PRIMITIVO, Tipo.BOOLEAN, false,
                                this._$.first_line, this._$.first_column),

                              grafica: new NodoGrafico('VALOR', [
                                new NodoGrafico('false', [])
                              ])
                            }
                          }
      | 'true'            {
                            $$ = {
                              instrucciones: new Primitivo(Tipo.PRIMITIVO, Tipo.BOOLEAN, true,
                                this._$.first_line, this._$.first_column),

                              grafica: new NodoGrafico('VALOR', [
                                new NodoGrafico('true', [])
                              ])
                            }
                          }
      ;
