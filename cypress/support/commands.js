Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Geisa')
    cy.get('#lastName').type('Chagas')
    cy.get('#email').type('geisacm@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()  
})