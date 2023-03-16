'use strict';
let init = require('./steps/init');
let {an_authenticated_user} = require('./steps/given');
let idToken

describe('Given an authenticated user', () => {
    beforeAll(async () => {

    init();

    let user = await an_authenticated_user();
    idToken = user.AuthenticationResult.IdToken;
    });


    test('When I create a note', async () => {
        expect(idToken).toBeDefined();
    }
    );
    

});