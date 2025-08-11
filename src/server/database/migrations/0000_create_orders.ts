import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.orders, table => {
      table.increments("id").primary();
      table.string("customer_name").notNullable();
      table.string("customer_phone").notNullable();
      table.string("customer_email").notNullable();
      table.integer("item_id").unsigned().references("id").inTable(ETableNames.item).onDelete("CASCADE");
      table.integer("item_price").notNullable();
      table.integer("quantity").notNullable();
      table.decimal("total", 10, 2).notNullable();
      table.enu("status", ["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED", "CANCELLED"]).defaultTo("PENDING");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.orders}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.orders)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.orders}`);
    });
}
