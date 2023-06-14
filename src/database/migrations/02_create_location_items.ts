import { Knex } from "knex" // importar a tipagem do knex

export async function up(knex: Knex) {
    // criar a tabela 
    return knex.schema.createTable("location_items", (table) => {
        table.increments('id').primary; // chave primária
        table.integer('location_id').notNullable().references('id').inTable('locations'); // chave estrangeira 
        table.integer('item_id').notNullable().references('id').inTable('items'); // chave estrangeira 
    });
}

export async function down(knex: Knex) {
    // deletar tabela
    return knex.schema.dropTable("location_items");
}