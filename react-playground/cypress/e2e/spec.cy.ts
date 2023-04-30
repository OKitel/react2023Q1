import '@cypress/code-coverage/support';

describe('e2e tests for react playground', () => {
  const URL = 'http://localhost:8081/';

  it('Visits react playground app pages', () => {
    cy.visit(URL);
    cy.contains('About us').click();
    cy.contains('Home Page').click();
    cy.contains('Form').click();
  });

  it('Visits 404 page', () => {
    cy.visit(`${URL}/abra-kadabra`);
    cy.contains('404');
    cy.contains('Sorry! The page you are looking for could not be found...');
  });

  it('Search input accepts text', () => {
    cy.visit(URL);
    cy.get('[placeholder="Type here..."]').type('cats');
    cy.get('[placeholder="Type here..."]').should('have.value', 'cats');
  });

  it('Check that search query is restored when user navigates back to home', () => {
    cy.visit(URL);
    cy.get('[placeholder="Type here..."]').type('cats');
    cy.get('[type="submit"]').click();
    cy.contains('About us').click();
    cy.contains('Home Page').click();
    cy.get('[placeholder="Type here..."]').should('have.value', 'cats');
  });

  it('Check if modal opens', () => {
    cy.visit(URL);
    cy.get('[alt="white and black siberian husky"]').click();
    cy.contains('Linda Kazares');
  });
});
