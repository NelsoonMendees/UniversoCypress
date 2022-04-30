///<reference types="Cypress" />

describe("Cadastro com Faker", function () {
  it("Gerando dados aleatorios", function () {
    const faker = require("faker-br");

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = `${firstName} ${lastName}`;
    const password = "pwd123";

    cy.visit("/signup");

    cy.get('input[placeholder="Nome completo"]').type(name);
    cy.get('input[placeholder="Seu melhor email"]').type(firstName + "@samuraibs.com");
    cy.get('input[placeholder="Sua senha secreta"]').type(password);
  });
});
