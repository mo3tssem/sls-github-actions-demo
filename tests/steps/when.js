
'use strict';
const _ = require('lodash');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

const makeHttpRequest = async (path, method, options) => {

    let item_id = _.get(options, 'item_id', null);
    let note = _.get(options, 'note', {});
    let idToken = _.get(options, 'idToken', null);

    let root  = process.env.TEST_ROOT;

    let url = method == "POST" ? `${root}/${path}` : `${root}/${path}/${item_id}`; 
    console.log("options:::::", options)
    console.log("note:::::", note)
    console.log("url::::: ", url)
    console.log("idToken::::", idToken)
    try {

        let response = await agent(method, url)
        .set('Authorization',idToken)
        .send(note);
        return {
            statusCode: response.status,
            body: response.body
        }
    } catch (error) {
        console.log("error::::::::::::::::::", error)
        return {
            statusCode: error.status,
            body: error.response.body
        }
        
    }

}

exports.we_invoke_createNote = async (options) => {

    let response = makeHttpRequest('notes',"POST", options);
    return response;
}

exports.we_invoke_updateNote = async (options) => {

    let response = makeHttpRequest('notes',"PUT", options);
    return response;
}



exports.we_invoke_deleteNote = async (options) => {




    let response = makeHttpRequest('notes',"Delete", options);
    return response;
}