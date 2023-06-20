import { Knex}  from "knex";

export async function up(knex: Knex) {
    // criar a tabela 
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    });
}

export async function down(knex: Knex) {
    // deletar tabela
    return knex.schema.dropTable('users');
}