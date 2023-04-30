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
    cy.visit(`${URL}abra-kadabra`);
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

  it('Check form validation', () => {
    cy.visit(`${URL}form`);
    cy.get('[name="firstName"]').type('John');
    cy.get('[name="lastName"]').type('Doe');
    cy.get('[role="form"]').submit();
    cy.contains('Birth date is required');
    cy.contains('Country is required');
    cy.contains('Gender is required');
    cy.contains('Image is required');
    cy.contains('Agree with privacy policy');
  });

  it('Create card on form submit', () => {
    cy.visit(`${URL}form`);
    cy.get('[name="firstName"]').type('John');
    cy.get('[name="lastName"]').type('Doe');
    cy.get('[name="birthDate"]').type('1978-03-21');
    cy.get('[name="country"]').select('Poland');
    cy.get('[for="radio-one"]').click();
    cy.get('input[type=file]').selectFile('cypress/fixtures/deer.png', { force: true });
    cy.get('[name="agree"]').click();
    cy.get('[role="form"]').submit();
    cy.contains('Name: John');
    cy.contains('Surname: Doe');
    cy.contains('Birthdate: 1978-03-21');
    cy.contains('Country: Poland');
    cy.contains('Gender: male');
  });
});
