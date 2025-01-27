/* global describe it cy beforeEach require expect afterEach*/

var helper = require('../../common/helper');

describe('Clipboard operations.', function() {
	var origTestFileName = 'copy_paste.odt';
	var testFileName;

	beforeEach(function() {
		testFileName = helper.beforeAll(origTestFileName, 'writer');
	});

	afterEach(function() {
		helper.afterAll(testFileName, this.currentTest.state);
	});

	it('Copy and Paste text.', function() {
		// Select some text
		helper.selectAllText();

		cy.get('.leaflet-marker-icon')
			.then(function(marker) {
				expect(marker).to.have.lengthOf(2);
				var XPos =  (marker[0].getBoundingClientRect().right + marker[1].getBoundingClientRect().left) / 2;
				var YPos = marker[0].getBoundingClientRect().top - 5;

				cy.get('body').rightclick(XPos, YPos);
			});

		cy.contains('.context-menu-link', 'Copy')
			.click();

		cy.get('#copy_paste_warning-box').should('exist');
	});
});
