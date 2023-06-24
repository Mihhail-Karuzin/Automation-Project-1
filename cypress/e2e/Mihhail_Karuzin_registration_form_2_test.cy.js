beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/
describe('Section 1: Functional tests', () => {

    //NB! The first four test cases are numbered and in the same order as in Assesment 4

    it('1.Passwords should match in order to submit the page', () => {

        // Fill all mandatory fields on the page
        cy.get("#username").type("MihhailKaruzin");
        cy.get("#email").type("mihhailkaruzin@example.com");
        cy.get('input[name="name"]').type("Mihhail");
        cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
        cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");
        cy.get('select[name="cars"]').select("Audi");
        cy.get('select[name="animal"]').select("Dog");

        // Fill in different values in the password and confirmation password input fields
        cy.get("#password").type("123");
        cy.get("#confirm").type("321");

        //click on some other field or element on the page  to activate the assertion of the error message
        cy.get("#logo").click();

        // Assert that the corresponding error message is visible and the submit button is not enabled
        cy.get("#password_error_message").should("be.visible");
        cy.get('button[class="submit_button"]').should("be.disabled");

        // Clear incorrect passwords
        cy.get("#password").clear().should("have.value", "");
        cy.get("#confirm").clear().should("have.value", "");

        // Enter the same values in the password and confirmation password input fields
        cy.get("#password").type("123");
        cy.get("#confirm").type("123");

        //Click on some other element before the assertion

        cy.get("#applicationForm").click()

        //Assert that the error message is not visible anymore

        cy.get("#password_error_message").should("not.be.visible");

        // Assert that the submit button is enabled
        cy.get('button[class="submit_button"]').should("not.be.disabled");

    });

    it('2. User can submit form with all fields added', () => {

        // Fill all fields on the page
        cy.get("#username").type("MihhailKaruzin");
        cy.get("#email").type("mihhailkaruzin@example.com");
        cy.get('input[name="name"]').type("Mihhail");
        cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
        cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");
        cy.get('select[name="cars"]').select("Audi");
        cy.get('select[name="animal"]').select("Dog");
        cy.get('input#javascriptFavLanguage').check();
        cy.get('input#vehicle1').check();

        //  Enter values in the password field
        cy.get("#password").type("123");

        // Enter value in the confirm password field
        cy.get("#confirm").type("123");

        // Click on the Car checkbox for transport and immediately remove the selection to assert the "submit button"
        cy.get('input#vehicle2').check().uncheck();


        // Submit the form
        cy.get('button.submit_button').click();

        // Assert that the success message is displayed
        cy.contains("User successfully submitted registration").should("be.visible");

    });

    it('3.Only mandatory fields are filled in and the same validation is used as in the previous test.', () => {

        // Fill only mandatory fields on the page
        cy.get("#username").type("MihhailKaruzin");
        cy.get("#email").type("mihhailkaruzin@example.com");
        cy.get('input[name="name"]').type("Mihhail");
        cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
        cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");

        //  Enter values in the password field
        cy.get("#password").type("123");

        // Enter value in the confirm password field
        cy.get("#confirm").type("123");

        // Click on the Car checkbox for transport and immediately remove the selection to assert the "submit button"
        cy.get('input#vehicle1').check().uncheck();


        // Submit the form
        cy.get('button.submit_button').click();

        // Assert that the success message is displayed
        cy.contains("User successfully submitted registration").should("be.visible");

    });


    it('4. Submit button is disabled when a mandatory field is not filled', () => {

        // Fill all mandatory fields on the page except one
        cy.get("#username").type("MihhailKaruzin");
        cy.get('input[name="name"]').type("Mihhail");
        cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
        cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");
        cy.get("#password").type("123");
        cy.get("#confirm").type("123");

        // Assert that the submit button is disabled
        cy.get('button.submit_button').should("be.disabled");
    });

})

it(' User can submit form with valid data and only mandatory fields added', () => {

    // Fill in ONLY mandatory fields
    cy.get("#username").type("MihhailKaruzin");
    cy.get("#email").type("mihhailkaruzin@example.com");
    cy.get('input[name="name"]').type("Mihhail");
    cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
    cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");
    cy.get("#password").type("123");
    cy.get("#confirm").type("123");

    // Click on the Car checkbox for transport and immediately remove the selection to assert the "submit button"
    cy.get('input#vehicle1').check().uncheck();

    // Assert that the submit button is enabled
    cy.get('button.submit_button').should("not.be.disabled");

    // Submit the form
    cy.get('button[class="submit_button"]').click();

    // Assert that the success message is displayed
    cy.contains("User successfully submitted registration").should("be.visible");

});

it('Submit button is not enabled when confirmation password is different', () => {

    // Add test steps for filling in only mandatory fields
    cy.get("#username").type("MihhailKaruzin");
    cy.get("#email").type("mihhailkaruzin@example.com");
    cy.get('input[name="name"]').type("Mihhail");
    cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
    cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");

    // Type confirmation password which is different from the first password
    cy.get("#password").type("123");
    cy.get("#confirm").type("321");

    // Assert that the submit button is not enabled
    cy.get('button[class="submit_button"]').should("be.disabled");

    // Assert that the success message is not visible

    cy.get('#success_message').should('not.be.visible');

    //click on some other field or element on the page before in order to activate the assertion of the error message
    cy.get("#logo").click();

    // Assert that error message is visible
    cy.get("#password_error_message").should("be.visible");

});


it('User can use only the same passwords for both password fields', () => {

    // Add test steps for filling in only mandatory fields
    cy.get("#username").type("MihhailKaruzin");
    cy.get("#email").type("mihhailkaruzin@example.com");
    cy.get('input[name="name"]').type("Mihhail");
    cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
    cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");

    // Type confirmation password which is different from the first password
    cy.get("#password").type("123");
    cy.get("#confirm").type("123");

    // Click on the Car checkbox for transport and immediately remove the selection to assert the "submit button"
    cy.get('input#vehicle1').check().uncheck();

    // Assert that the submit button is enabled
    cy.get('button[class="submit_button"]').should("not.be.disabled");

    // Submit the form
    cy.get('button[class="submit_button"]').click();

    // Assert that the success message is visible
    cy.get('#success_message').should('be.visible');

    // Assert that the error message does do not visible
    cy.get("#password_error_message").should("not.be.visible");

});


it('Input valid data to the page', () => {
    inputValidData('john.doe')

    function inputValidData(username) {
        // Fill all mandatory fields on the page
        cy.get("#username").type(username);
        cy.get("#email").type("johndoe@example.com");
        cy.get('input[name="name"]').type("John");
        cy.get('input[data-testid="lastNameTestId"]').type("Doe");
        cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");

        // Enter the same password for both password fields
        cy.get("#password").type("123");
        cy.get("#confirm").type("123");

        // Click on the Car checkbox for transport and immediately remove the selection to assert the "submit button"
        cy.get('input#vehicle1').check().uncheck();

        // Assert that the submit button is enabled
        cy.get('button[class="submit_button"]').should("not.be.disabled");

        // Submit the form
        cy.get('button[class="submit_button"]').click();

        // Assert that the success message is displayed
        cy.contains("User successfully submitted registration").should("be.visible");

    }

})

// You can add more similar tests for checking other mandatory field's absence

it('Check absence of email field', () => {

    // Fill all mandatory fields on the page except for the specified field
    cy.get("#username").type("MihhailKaruzin");
    cy.get("#email").clear(); // Clear the email field
    cy.get('input[name="name"]').type("Mihhail");
    cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
    cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");
    cy.get("#password").type("123");
    cy.get("#confirm").type("123");

    // Assert that the submit button is disabled
    cy.get('button[class="submit_button"]').should("be.disabled");

    // Assert that the success message is not displayed
    cy.get('div#success_message').should('not.be.visible');

    // If not entered,email field has red outline
    cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

});


it('Check absence of name field', () => {

    // Fill all mandatory fields on the page except for the specified field
    cy.get("#username").type("MihhailKaruzin");
    cy.get("#email").type("mihhailkaruzin@example.com");
    cy.get('input[name="name"]').clear(); // Clear the "name" field
    cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
    cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");
    cy.get("#password").type("123");
    cy.get("#confirm").type("123");

    // Assert that the submit button is disabled
    cy.get('button[class="submit_button"]').should("be.disabled");

    // Assert that the success message is not displayed
    cy.get('div#success_message').should('not.be.visible');

    // If not entered,name field has red outline
    cy.get('input[name="name"]').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

});


it('Check absence of last name field', () => {
    // Fill all mandatory fields on the page except for the specified field
    cy.get("#username").type("MihhailKaruzin");
    cy.get("#email").type("mihhailkaruzin@example.com");
    cy.get('input[name="name"]').type("Mihhail");
    cy.get('input[data-testid="lastNameTestId"]').clear(); // Clear the "last name" field
    cy.get('input[data-testid="phoneNumberTestId"]').type("8775048423");
    cy.get("#password").type("123");
    cy.get("#confirm").type("123");

    // Assert that the submit button is disabled
    cy.get('button[class="submit_button"]').should("be.disabled");

    // Assert that the success message is not displayed
    cy.get('div#success_message').should('not.be.visible');

    // If not entered,last name field has red outline
    cy.get('input[data-testid="lastNameTestId"]').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

});


it('Check absence of phone number field', () => {
    // Fill all mandatory fields on the page except for the specified field
    cy.get("#username").type("MihhailKaruzin");
    cy.get("#email").type("mihhailkaruzin@example.com");
    cy.get('input[name="name"]').type("Mihhail");
    cy.get('input[data-testid="lastNameTestId"]').type("Karuzin");
    cy.get('input[data-testid="phoneNumberTestId"]').clear(); // Clear the "phone number" field
    cy.get("#password").type("123");
    cy.get("#confirm").type("123");

    // Assert that the submit button is disabled
    cy.get('button[class="submit_button"]').should("be.disabled");

    // Assert that the success message is not displayed
    cy.get('div#success_message').should('not.be.visible');

    // If not entered,phone number field has red outline
    cy.get('input[data-testid="phoneNumberTestId"]').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

});


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Create similar test for checking second picture

    it('Check that the logo is correct and has the correct size', () => {
        cy.log('Will check logo source and size');

        // Check the src attribute of the logo image
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src', 'cypress_logo.png');

        // get element and check its parameter height, to be equal 88
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 80)


    })


    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    // Check that URL to Cerebrum Hub page is correct and clickable
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one
    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')

        // Wait for the dropdown to update before taking the screenshot
        cy.viewport(1280, 720)

        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one
    it(' dropdown of favorite animals is correct', () => {
        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('Animals drop-down')

        // Wait for the dropdown to update before taking the screenshot
        cy.viewport(1280, 720)

        // Capture a screenshot of the full page
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in favorite animals dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)

        //Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        // Advanced level how to check the content of favorite animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
    })


})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')

}

