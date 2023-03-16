'use strict';
let init = require('./steps/init');
let {an_authenticated_user} = require('./steps/given');
let {we_invoke_createNote, we_invoke_updateNote} = require('./steps/when');
let item_id = '0001'
let idToken = null;

describe('Given an authenticated user', () => {
    beforeAll(async () => {
    init();
    let user = await an_authenticated_user();

    idToken = user.AuthenticationResult.IdToken;
    });

    console.log("idToken", idToken)


    describe('And I create a note', () => {

        it('should create a new note', async () => {
            const note = {
                'id': item_id,
                'title': 'Hello World',
                'body': 'hello this is a test note',
                'idToken': idToken
            };
            let response = await we_invoke_createNote(note);
            expect(response.statusCode).toEqual(201);
            expect(response.body).not.toBeNull();
        
        });


    });

    describe('And I update a note', () => {

            it('should update  a new note', async () => {
                const note = {
                    'noteId': item_id,
                    'title': 'updated title',
                    'body': 'updated notes body this is a test note',
                    'idToken': idToken
                };
                let response = await we_invoke_updateNote(note, item_id);
                expect(response.statusCode).toEqual(200);
                expect(response.body).not.toBeNull();
            
        
    

    });

});
});