import { Knex } from "knex" // importar a tipagem do knex

export async function up(knex: Knex) {
    // criar a tabela 
    return knex.schema.createTable("locations_items", (table) => {
        table.increments('id').primary; // chave primária
        table.string('location_id').notNullable().references('id').inTable('locations'); // chave estrangeira 
        table.string('item_id').notNullable().references('id').inTable('items'); // chave estrangeira 
    });
}

export async function down(knex: Knex) {
    // deletar tabela
    return knex.schema.dropTable("locations_items");
}