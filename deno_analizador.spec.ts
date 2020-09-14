import { Lexico, INTEGER, OPERATION } from "./analizador.ts";
import { expect } from "https://deno.land/x/expect@v0.2.1/mod.ts";

Deno.test("should evaluate as integer", () => {
  const lexico = new Lexico({ source: "10" });

  expect(lexico.evaluate()).toEqual(INTEGER);
});

Deno.test("should evaluate as operation", () => {
  const lexico = new Lexico({ source: "+" });

  expect(lexico.evaluate()).toEqual(OPERATION);
});

Deno.test("should not evaluate as operation", () => {
  const lexico = new Lexico({ source: "10+10" });

  expect(lexico.evaluate()).toEqual(INTEGER);
});
