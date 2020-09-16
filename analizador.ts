const IDENTIFIER = /([_a-zA-Z][_a-zA-Z0-9]{0,30})/;
const OPERATOR_ADD = /^(\+|\-)$/;
const OPERATOR_MULTI = /^(\*|\/)$/;
const OPERATOR_ASIGN = /(=)$/;
const OPERATOR_RELAT = /^(==|!=|>|<|>=|<=)$/;
const OPERATOR_AND = /^(&&)$/;
const OPERATOR_OR = /^(||)$/;
const OPERATOR_NOT = /^(!)$/;
const PARENTESIS = /(\(|\))$/;
const BRAKETS = /^({|})$/;
const SEMICOLON = /^(;)$/;
const OPERATORS = /^(\+|-|\*|\/|=|==|>|<|>=|<=|&|\||!|\^)$/;
const REAL_REGEX = /^(?:\d+\.?\d*|\d*\.\d+)$/;

interface ILexico {
	source: string;
}

export const IDENTIFIER_VAL = 0;
export const INT = 1;
export const REAL = 2;
export const OPERATOR = 0;
export const INTEGER = 1;
export const ERROR = 2;
export const STRING = 3;
export const TYPE = 4;
export const SUM = 5;
export const MULTI = 6;
export const RELAT = 7;
export const OR = 8;
export const NOT = 10;
export const ASIGN = 18;
const KINDS = ["OPERATION", "REAL", "NOT DEFINED"];

export class Lexico {
	private source: string[] = [];
	private token = "";

	constructor(args: ILexico) {
		this.source = args.source.split("").reverse();
	}

	evaluate() {
		this.token = <string>this.source.pop();
		if (this.isOperator(this.token)) {
			return this.evaluateOperators();
		}

		if (this.isReal(this.token)) {
			return this.evaluateReal();
		}

		return ERROR;
	}

	private isOperator(val: string) {
		return val.match(OPERATORS);
	}

	private isReal(val: string) {
		return val.match(REAL_REGEX);
	}

	private evaluateReal() {
		while (
			this.source.length &&
			this.isReal(this.token + this.source[this.source.length - 1])
		) {
			this.token += this.source.pop();
		}
		return INTEGER;
	}

	private evaluateOperators() {
		let operator_kind = 0;

		const pairOperator = this.token + this.source[this.source.length - 1];

		if (this.token.match(OPERATOR_ADD)) operator_kind = 2;
		if (this.token.match(OPERATOR_MULTI)) operator_kind = 2;
		if (this.token.match(OPERATOR_ASIGN)) operator_kind = ASIGN;
		if (this.token.match(OPERATOR_NOT)) operator_kind = NOT;
		if (this.token.match(OPERATOR_RELAT)) {
			operator_kind = RELAT;
		}

		return operator_kind;
	}

	get kind() {
		const kind = this.evaluate();
		return `${this.token}  ${KINDS[kind]}`;
	}

	get hasTokens() {
		return this.source.length > 0;
	}
}
