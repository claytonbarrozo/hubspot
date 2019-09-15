// This example displays how to get all contacts from a HubID and paginate through them using the 'offset' parameter.
// The end result is an array containing all parsed contacts.

var request = require("request");
const returnedContacts = [];
const API_KEY = 'a2565642-1a58-4a0e-a53a-4d83e4998ba3&userId=8813519';
const count = 5;


function getContacts(offset) {
    if (typeof offset == 'undefined') {
        offsetParam = null;
    } else {
        offsetParam = `vidOffset=${offset}`;
    }
    const hapikeyParam = `hapikey=${API_KEY}`;
    const paramsString = `?count=${count}&${hapikeyParam}&${offsetParam}`;

    const finalUrl = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all${paramsString}`;
    request(finalUrl, (error, response, body) => {
        if (error) {
            console.log('error', error);
            throw new Error
        }
        const parsedBody = JSON.parse(body);
        parsedBody.contacts.forEach(contact => {
            returnedContacts.push(contact);
        });
        if (parsedBody['has-more']) {
            getContacts(parsedBody['vid-offset'])
        } else {
            //print out all contacts
            console.log(returnedContacts)
        }
    })
}

getContacts();