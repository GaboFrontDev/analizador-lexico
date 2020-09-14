/**
 * Editar esta constante para poder
 * hacer pruebas con distintas cadenas.
 */

import { readLines } from "https://deno.land/std/io/bufio.ts";
import { Lexico } from "./analizador.ts";

async function question(question: string) {
  console.log(question);
  // Listen to stdin input, once a new line is entered return
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
}
const TEST_VAL = <string>await question("String a evaluar ");

const lexico = new Lexico({ source: TEST_VAL });

while (lexico.hasTokens) {
  console.log(lexico.kind);
}
