import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.item, table => {
      table.bigIncrements("id").primary().index();
      table.string("name", 150).notNullable();
      table.decimal("price", 10, 2).notNullable();

      table.comment("Tabela usada para armazenar os itens do cardápio");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.item}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.item)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.item}`);
    });
}
