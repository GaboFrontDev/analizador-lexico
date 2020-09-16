import {
  Lexico,
  INT,
  ADD,
  SEMICOLON,
  ASIGN,
  REAL,
  IDENTIFIER_VAL,
  RELAT,
} from "./analizador.ts";
import { expect } from "https://deno.land/x/expect@v0.2.1/mod.ts";

Deno.test("should evaluate as integer", () => {
  const lexico = new Lexico({ source: "10" });

  expect(lexico.evaluate()).toEqual(INT);
});

Deno.test("should evaluate as add operator", () => {
  const lexico = new Lexico({ source: "+" });

  expect(lexico.evaluate()).toEqual(ADD);
});

Deno.test("should evaluate as integer", () => {
  const lexico = new Lexico({ source: "10+10" });

  expect(lexico.evaluate()).toEqual(INT);
});

Deno.test("should evaluate as semicolon", () => {
  const lexico = new Lexico({ source: ";" });

  expect(lexico.evaluate()).toEqual(SEMICOLON);
});

Deno.test("should evaluate as asign", () => {
  const lexico = new Lexico({ source: "=" });

  expect(lexico.evaluate()).toEqual(ASIGN);
});

Deno.test("should evaluate as real", () => {
  const lexico = new Lexico({ source: "10.000001" });

  expect(lexico.evaluate()).toEqual(REAL);
});

Deno.test("should evaluate as identifier", () => {
  const lexico = new Lexico({ source: "abc2" });

  expect(lexico.evaluate()).toEqual(IDENTIFIER_VAL);
});

Deno.test("should evaluate as relational", () => {
  const lexico = new Lexico({ source: ">=" });

  expect(lexico.evaluate()).toEqual(RELAT);
});

Deno.test("should evaluate as relational", () => {
  const lexico = new Lexico({ source: "==" });

  expect(lexico.evaluate()).toEqual(RELAT);
});

Deno.test("should evaluate as int", () => {
  const lexico = new Lexico({ source: "2abc2" });

  expect(lexico.evaluate()).toEqual(INT);
});
