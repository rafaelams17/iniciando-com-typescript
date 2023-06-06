import { Knex } from "knex" // importar a tipagem do knex

export async function up(knex: Knex) {
    // criar a tabela 
    return knex.schema.createTable("locations", (table) => {
        table.increments('id').primary; // chave primária
        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
    });
}

export async function down(knex: Knex) {
    // deletar tabela
    return knex.schema.dropTable("locations");
}