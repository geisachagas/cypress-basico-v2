/// <reference types="Cypress" />
///Aula 02
///Exercício 0
describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    /// Exercício 1
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste. teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,'
        cy.get('#firstName').type('Geisa')
        cy.get('#lastName').type('Chagas')
        cy.get('#email').type('geisacm@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    /// Exercício 2
    it('exibe mensagem de erro ao submeter o formulário com email com formatação inválida', function() {
        cy.get('#firstName').type('Geisa')
        cy.get('#lastName').type('Chagas')
        cy.get('#email').type('geisacm@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    }) 

    /// Exercício 3
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    /// Exercício 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Geisa')
        cy.get('#lastName').type('Chagas')
        cy.get('#email').type('geisacm@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')  
    })

    /// Exercício 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Geisa')
          .should('have.value', 'Geisa')
          .clear()
          .should('have.value', '')

        cy.get('#lastName')
          .type('Chagas')
          .should('have.value', 'Chagas')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type('geisacm@gmail.com')
          .should('have.value', 'geisacm@gmail.com')
          .clear()
          .should('have.value', '')

        cy.get('#open-text-area')
          .type('Teste')
          .should('have.value', 'Teste')
          .clear()
          .should('have.value', '')
   
    })

    /// Exercício 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible') 
    })

    /// Exercício 7
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    /// Aula03 
    /// Exercício 0
    it('seleciona um produto (YouTube) por seu valor (YouTube)', function() {
        cy.get('#product')
        .select ('YouTube')
        .should('have.value', 'youtube')
    })

    ///Exercício 1
    it('seleciona um produto (Mentoria) por seu valor (value)',function() {
        cy.get('#product')
        .select('Mentoria')
        .should('have.value', 'mentoria')  
    })

    ///Exercício 2
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    ///Aula 04
    ///Exercício
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })
    ///Exercício Extra
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
             
        }) 
    })

    ///Aula 05
    ///Exercício
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    
    ///Aula 06
    ///Exercício 0
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')   
        .selectFile('cypress/fixtures/example.json') 
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    ///Exercício 1
    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')   
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //dreag-drop simula o arrasto de um arquivo pelo usuário
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
    })
   })

    ///Exercício 2
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
       cy.fixture('example.json').as('sampleFile') //criando um alias para o arquivo
       cy.get('input[type="file"]')
       .selectFile('@sampleFile')
       .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')  
       })
    })

    ///Aula 07
    ///Excercío 
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')  
    })

    ///Excercío extra 1 
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
       cy.get('#privacy a')
       .invoke('removeAttr', 'target')
       .click() 

       cy.contains('Talking About Testing').should('be.visible')
    })

       
})