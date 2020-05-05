describe('Application', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('div', 'Vue Skeleton App');
  });
});
