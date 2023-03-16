
'use strict';
const _ = require('lodash');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

const makeHttpRequest = async (path, method, options) => {
    let root  = process.env.TEST_ROOT;

    let url = method == "POST" ? `${root}/${path}` : `${root}/${path}/${options.noteId}`; 
    let idToken = _.get(options, 'idToken', null);

    console.log("url", url)
    console.log("idToken", idToken)
    delete options.idToken;
    try {

        let response = await agent(method, url)
        .set('Authorization',idToken)
        .send(options);
        return {
            statusCode: response.status,
            body: response.body
        }
    } catch (error) {
        return {
            statusCode: error.status,
            body: error.response.body
        }
        
    }

}

exports.we_invoke_createNote = async (options) => {
    console.log('we_invoke_createNote');
    console.log("options", options)

    let response = makeHttpRequest('notes',"POST", options);
    return response;
}

exports.we_invoke_updateNote = async (options) => {

    console.log('we_invoke_updateNote');
    console.log("options", options)


    let response = makeHttpRequest('notes',"PUT", options);
    return response;
}
