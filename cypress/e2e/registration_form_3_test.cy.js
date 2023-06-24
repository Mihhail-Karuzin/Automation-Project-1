beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */
describe('Section 1: visual tests', () => {
    
        it('Verify radio buttons are visible', () => {
            cy.get('input[type="radio"][name="freq"]').should('be.visible').and('have.length', 4);
        });

        it('Verify radio button content', () => {
            cy.get('input[type="radio"][name="freq"]').next().eq(0).should('have.text', 'Daily');
            cy.get('input[type="radio"][name="freq"]').next().eq(1).should('have.text', 'Weekly');
            cy.get('input[type="radio"][name="freq"]').next().eq(2).should('have.text', 'Monthly');
            cy.get('input[type="radio"][name="freq"]').next().eq(3).should('have.text', 'Never');
        });
    });



    it('Verify Country dropdown options', () => {
        // Select 'Spain' from the Country dropdown
        cy.get('select#country').should('be.visible').select('Spain');

        // Assert that the selected value is 'Spain'
        cy.get('select#country').should('have.value', 'Spain');

        // Select 'Malaga' from the City dropdown (dependent on the selected country)
        cy.get('select#city').should('be.visible').select('Malaga');

        // Assert that the selected value is 'Malaga'
        cy.get('select#city').should('have.value', 'Malaga');
    });

    it('Verify City dropdown options', () => {
        // Select 'Estonia' from the Country dropdown
        cy.get('select#country').should('be.visible').select('Estonia');

        // Assert that the selected value is 'Estonia'
        cy.get('select#country').should('have.value', 'Estonia');

        // Select 'Tallinn' from the City dropdown (dependent on the selected country)
        cy.get('select#city').should('be.visible').select('Tallinn');

        // Assert that the selected value is 'Tallinn'
        cy.get('select#city').should('have.value', 'Tallinn');
    });

it('should display checkboxes, their content, and links', () => {
    // Verify the checkboxes
    cy.get('input[type="checkbox"]').should('have.length', 2); // Assuming there are 2 checkboxes
    cy.get('input[type="checkbox"]').eq(0).should('be.visible'); // First checkbox
    cy.get('input[type="checkbox"]').eq(1).should('be.visible'); // Second checkbox

    // Verify the checkbox labels
    cy.contains('Accept our privacy policy').should('be.visible');
    cy.contains('Accept our cookie policy').should('be.visible');

    // Verify the link
    cy.contains('Accept our cookie policy').should('have.attr', 'href', 'cookiePolicy.html');

    // Check the checkboxes
    cy.get('input[type="checkbox"]').eq(0).check(); // Check the first checkbox
    cy.get('input[type="checkbox"]').eq(1).check(); // Check the second checkbox

    // Verify that the checkboxes are checked
    cy.get('input[type="checkbox"]').eq(0).should('be.checked');
    cy.get('input[type="checkbox"]').eq(1).should('be.checked');
});


    it('should validate the email format', () => {
        // Enter an invalid email address
        cy.get('input[name="email"]').type('invalidemail')
        cy.get('#emailAlert').contains('Invalid email address.').should('be.visible');

        // Enter a valid email address
        cy.get('input[name="email"]').clear().type('validemail@example.com');
        cy.get('#emailAlert').contains('Invalid email address.').should('not.be.visible');
    });


describe('Section 1: visual tests', () => {
    it('This isempty my first test', () => {
        // This is  template
    });
})

//BONUS TASK: add functional tests for registration form 3

/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
describe('Functional Tests', () => {
    
    it('should fill in all fields and validate', () => {
      // Fill in all fields
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('#country').select('Spain');
      cy.get('#city').select('Malaga');
      cy.get('input[name="birthday"]').type('1990-01-01');
      cy.get('input[type="radio"][value="Weekly"]').check();
      cy.get('input[name="checkbox"]').check();
      cy.get('input[type="file"]').attachFile('testfile.txt');
  
      // Submit the form
      cy.get('input[type="submit"]').click();
  
      // Verify success message or any other validation logic
      cy.contains('Successful registration').should('be.visible');
    });
  
    it('should fill in only mandatory fields and validate', () => {
      // Fill in only mandatory fields
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('#country').select('Spain');
  
      // Submit the form
      cy.get('input[type="submit"]').click();
  
      // Verify success message or any other validation logic
      cy.contains('Successful registration').should('be.visible');
    });
  
    it('should leave out mandatory fields and validate', () => {
      // Do not fill in any mandatory fields
  
      // Submit the form
      cy.get('input[type="submit"]').click();
  
      // Verify error messages or any other validation logic
      cy.contains('Name is required.').should('be.visible');
      cy.contains('Email is required.').should('be.visible');
      cy.contains('Country is required.').should('be.visible');
    });
  
    it('should remove city choice if country is updated', () => {
      // Select a city
      cy.get('#country').select('Spain');
      cy.get('#city').select('Malaga');
  
      // Change the country selection
      cy.get('#country').select('Estonia');
  
      // Verify that city choice is removed
      cy.get('#city').should('have.value', '');
    });
  
    it('should add a file', () => {
      // Attach a file to the file input
      cy.get('input[type="file"]').attachFile('testfile.txt');
  
      // Verify that the file has been attached
      cy.get('input[type="file"]').should('have.attr', 'value', 'testfile.txt');
    });
  });
  