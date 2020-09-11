const OPERATIONS = /(\-|\+|\/|\*).?/;
const NUMBERS = /^(?:\d+\.?\d*|\d*\.\d+)$/;

const OPERATION = 0;
const INTEGER = 1;
const ERROR = 2;

const KINDS = ["OPERATION", "INTEGER", "NOT DEFINED"];

interface ILexico {
  source: string;
}

class Lexico {
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
    return val.match(OPERATIONS);
  }

  private isReal(val: string) {
    return val.match(NUMBERS);
  }

  get kind() {
    const kind = this.evaluate();
    return `${this.token}  ${KINDS[kind]}`;
  }

  get hasTokens() {
    return this.source.length > 0;
  }
}

const lexico = new Lexico({ source: "201.000001+-/*10.0.0" });

console.log("TOKEN  SYMBOL");

while (lexico.hasTokens) {
  console.log(lexico.kind);
}
