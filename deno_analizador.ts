const OPERATIONS = /(\-|\+|\/|\*).?/;
const NUMBERS = /^(?:\d+\.?\d*|\d*\.\d+)$/;

const OPERATION = 0;
const INTEGER = 1;
const ERROR = -1;

const KINDS = ["OPERATION", "INTEGER", "ERROR"];

interface ILexico {
  source: string;
}

class Lexico {
  private source: string[] = [];
  private token = "";

  constructor(args: ILexico) {
    this.source = args.source.split("").reverse();
  }

  evaluate(prevToken?: string) {
    this.token = <string>(prevToken || this.source.pop());

    let token = this.token;
    if (this.isOperation(token)) {
      return OPERATION;
    }

    if (this.isNumber(token)) {
      if (!this.source.length) {
        return INTEGER;
      }
      const next = <string>this.source.pop();
      this.evaluate((token += next));

      return INTEGER;
    }

    return ERROR;
  }

  private isOperation(val: string) {
    return val.match(OPERATIONS);
  }

  private isNumber(val: string) {
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

const lexico = new Lexico({ source: "1.0+-+2+0.0001" });

console.log("TOKEN  SYMBOL");

while (lexico.hasTokens) {
  console.log(lexico.kind);
}
