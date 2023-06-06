import { Knex } from "knex" // importar a tipagem do knex

export async function up(knex: Knex) {
    // criar a tabela 
    return knex.schema.createTable("items", (table) => {
        table.increments('id').primary; // chave primária
        table.string('title').notNullable();
        table.string('image').notNullable();
    });
}

export async function down(knex: Knex) {
    // deletar tabela
    return knex.schema.dropTable("items");
}