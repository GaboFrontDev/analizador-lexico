const IDENTIFIER = /([_a-zA-Z][_a-zA-Z0-9]{0,30})/;
const DIGIT = /^\d+$/;
const OPERATOR_ADD = /^(\+|\-)$/;
const OPERATOR_MULTI = /^(\*|\/)$/;
const OPERATOR_ASIGN = /(=)$/;
const OPERATOR_RELAT = /^(==|!=|>|<|>=|<=)$/;
const OPERATOR_AND = /^(&&)$/;
const OPERATOR_OR = /^(||)$/;
const OPERATOR_NOT = /^(!)$/;
const PARENTESIS = /(\(|\))$/;
const BRAKETS = /^({|})$/;
const OPERATORS = /^(\+|-|\*|\/|=|==|>|<|>=|<=|&|\||!|\^)$/;
const REAL_REGEX = /^(?:\d+\.?\d*|\d*\.\d+)$/;

interface ILexico {
  source: string;
}

export const ERROR = -1;

export const IDENTIFIER_VAL = 0;
export const INT = 1;
export const REAL = 2;
export const STRING = 3;
export const TYPE = 4;
export const ADD = 5;
export const MULTI = 6;
export const RELAT = 7;
export const OR = 8;
export const AND = 9;
export const NOT = 10;
export const EQUAL = 11;
export const SEMICOLON = 12;
export const COMMA = 13;
export const OPEN_PARENTHESIS = 14;
export const CLOSE_PARENTHESIS = 15;
export const OPEN_BRAKETS = 16;
export const CLOSE_BRAKETS = 17;
export const ASIGN = 18;
export const IF = 19;
export const WHILE = 20;
export const RETURN = 21;
const KINDS = ["OPERATION", "REAL", "NOT DEFINED"];

export class Lexico {
  private source: string[] = [];
  private token = "";

  constructor(args: ILexico) {
    this.source = args.source.split("").reverse();
  }

  evaluate() {
    this.token = <string>this.source.pop();

    if (this.token == ";") {
      return SEMICOLON;
    }

    if (this.isBrakets(this.token)) {
      return this.token == "{" ? OPEN_BRAKETS : CLOSE_BRAKETS;
    }

    if (this.isParenthesis(this.token)) {
      return this.token == "(" ? OPEN_PARENTHESIS : CLOSE_PARENTHESIS;
    }

    if (this.isDigit(this.token)) {
      return this.evaluateDigit();
    }

    if (this.isIdentifier(this.token)) {
      return this.evaluateIdentifier();
    }

    if (this.isOperator(this.token)) {
      return this.evaluateOperators();
    }

    return ERROR;
  }

  private isOperator(val: string) {
    return val.match(OPERATORS);
  }

  private isIdentifier(val: string) {
    return val.match(IDENTIFIER);
  }

  private isRelational(val: string) {
    return val.match(OPERATOR_RELAT);
  }

  private isParenthesis(val: string) {
    return val.match(PARENTESIS);
  }

  private isBrakets(val: string) {
    return val.match(BRAKETS);
  }

  private isReal(val: string) {
    return val.match(REAL_REGEX);
  }

  private isDigit(val: string) {
    return val.match(DIGIT);
  }

  private evaluateDigit() {
    while (
      this.source.length &&
      this.isDigit(this.token + this.source[this.source.length - 1])
    ) {
      this.token += this.source.pop();
    }

    if (this.isReal(this.token + this.source[this.source.length - 1])) {
      this.token += this.source.pop();
      return this.evaluateReal();
    }
    return INT;
  }

  private evaluateIdentifier() {
    while (
      this.source.length &&
      this.isIdentifier(this.token + this.source[this.source.length - 1])
    ) {
      this.token += this.source.pop();
    }
    return IDENTIFIER_VAL;
  }

  private evaluateReal() {
    while (
      this.source.length &&
      this.isReal(this.token + this.source[this.source.length - 1])
    ) {
      this.token += this.source.pop();
    }
    return REAL;
  }

  private evaluateOperators() {
    const pairOperator = this.token + this.source[this.source.length - 1];

    if (this.token.match(OPERATOR_ADD)) {
      return ADD;
    }
    if (this.token.match(OPERATOR_MULTI)) return MULTI;

    if (this.token.match(OPERATOR_NOT)) return NOT;

    if (this.token.match(OPERATOR_ASIGN)) {
      if (pairOperator.match(OPERATOR_RELAT)) {
        this.source.pop();
        return RELAT;
      }
      return ASIGN;
    }

    if (this.isRelational(this.token)) {
      if (pairOperator.match(OPERATOR_RELAT)) {
        this.source.pop();
      }
      return RELAT;
    }

    if (pairOperator.match(OPERATOR_OR)) {
      this.source.pop();
      return OR;
    }

    if (pairOperator.match(OPERATOR_AND)) {
      this.source.pop();
      return AND;
    }

    return -1;
  }

  get kind() {
    const kind = this.evaluate();
    return `${this.token} ${kind}`;
  }

  get hasTokens() {
    return this.source.length > 0;
  }
}
