const OPERATIONS_REGEX = /(\-|\+|\/|\*).?/;
const NUMBERS_REGEX = /^(?:\d+\.?\d*|\d*\.\d+)$/;

interface ILexico {
  source: string;
}

export const OPERATION = 0;
export const INTEGER = 1;
export const ERROR = 2;
const KINDS = ["OPERATION", "REAL", "NOT DEFINED"];

export class Lexico {
  private source: string[] = [];
  private token = "";

  constructor(args: ILexico) {
    this.source = args.source.split("").reverse();
  }

  evaluate() {
    this.token = <string>this.source.pop();

    this.token;
    if (this.isOperation(this.token)) {
      return OPERATION;
    }

    if (this.isReal(this.token)) {
      while (
        this.source.length &&
        this.isReal(this.token + this.source[this.source.length - 1])
      ) {
        this.token += this.source.pop();
      }
      return INTEGER;
    }

    return ERROR;
  }

  private isOperation(val: string) {
    return val.match(OPERATIONS_REGEX);
  }

  private isReal(val: string) {
    return val.match(NUMBERS_REGEX);
  }

  get kind() {
    const kind = this.evaluate();
    return `${this.token}  ${KINDS[kind]}`;
  }

  get hasTokens() {
    return this.source.length > 0;
  }
}
