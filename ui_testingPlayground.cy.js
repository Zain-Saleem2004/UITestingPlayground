describe('UI Testing Playgrund', () => {

it('Dynamic ID Button', () => {
    cy.visit('http://uitestingplayground.com/dynamicid')
    // The button ID changes every time, so we use text instead of ID
    cy.contains('button', 'Button with Dynamic ID').should('be.visible').click();
  });


it('Class attribute', () => {
    cy.visit('http://uitestingplayground.com/classattr')
    cy.get('.btn-primary').click();

    cy.on('window:alert', (text) => {
      expect(text).to.include('Primary button pressed');
    })
  });

it('Hidden Layers', () => {
  cy.visit('http://uitestingplayground.com/hiddenlayers')
  cy.get('#greenButton').click();
  // The greenButton can't be hit twice because it is wrabbed by another element so to avoid error I used { Force: True } to force Cypress to click the button
  cy.get('#greenButton').click({ force : true});
})

it('Load Delay', () => {
  cy.visit('http://uitestingplayground.com')
  cy.contains('a', 'Load Delay').click()
  cy.contains('button', 'Button Appearing After Delay', { timeout: 10000 })
    .should('be.visible')
    .click();  
})

it('AJAX Data', () => {
  cy.visit('http://uitestingplayground.com/ajax');
  cy.get('#ajaxButton').click();

  cy.get('#content', { timeout: 16000 })
    .should('be.visible')            
    .and('contain.text', 'Data loaded with AJAX get request.').click();
});

it('Client Delay', () => {
  cy.visit('http://uitestingplayground.com/clientdelay');
  cy.get('#ajaxButton').click();

  cy.get('#content', { timeout: 16000 })
    .should('be.visible')            
    .and('contain.text', 'Data calculated on the client side.').click();
});

it('Click', () => {
  cy.visit('http://uitestingplayground.com/click')
  cy.get('#badButton').should('have.class','btn-primary')
  cy.get('#badButton').click()
  cy.get('#badButton').should('have.class','btn-success')
})

it('Text Input - Button name changes after input', () => {
  cy.visit('http://uitestingplayground.com/textinput');
  const label = 'Zaineddin'
  cy.get('#newButtonName').type(label);
  cy.get('#updatingButton').click();
  cy.get('#updatingButton').should('have.text', label);
});

it('Scrollbars', () => {
  cy.visit('http://uitestingplayground.com/scrollbars');
  cy.get('#hidingButton')
    .scrollIntoView().should('be.visible').click();   
});

it('Disabled Input', () => {
  cy.visit('http://uitestingplayground.com/disabledinput');
  cy.get('#enableButton').click();
  cy.get('#inputField', { timeout: 15000 }).should('be.enabled');
  cy.get('#inputField').type('Zain');
  cy.get('#inputField').should('have.value', 'Zain');
});


})