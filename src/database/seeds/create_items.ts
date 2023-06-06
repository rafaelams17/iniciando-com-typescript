import { Knex } from "knex"; // Usar como tipo do parametro do método

export async function seed(knex: Knex) { // método que vai definir a seed
  await knex('items').insert([
    { title: "Papéis e Papelão", image: "papel.png"},
    { title: "Vidros e Lâmpadas", image: "vidro.png"},
    { title: "Óleo de Cozinha", image: "oleo.png"},
    { title: "Resíduos Orgânicos", image: "organico.png"},
    { title: "Baterias e Pilhas", image: "bateria.png"},
    { title: "Eletrônicos", image: "eletronico.png"},
  ]); // definir qual tabela que vai ser trabalhada   
} 