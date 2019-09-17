const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/home.html')))
app.post('/submit', (req, res) => {

	//console.log(req.body.exampleInputEmail1)

    const request = require("request");

		const options = { method: 'POST',
			url: 'https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/',
			qs: { hapikey: 'API KEY' },
			headers:
			 {  'Content-Type': 'application/json' },
			body:
			 { properties:
					[ { property: 'firstname', value: req.body.firstname },
						{ property: 'lastname', value: req.body.lastname },
						{ property: 'email', value: req.body.exampleInputEmail1 } ]},
						//{ property: 'website', value: 'http://hubspot.com' },
						//{ property: 'company', value: 'HubSpot' },
						//{ property: 'phone', value: '555-122-2323' },
						//{ property: 'address', value: '25 First Street' },
						//{ property: 'city', value: 'Cambridge' },
						//{ property: 'state', value: 'MA' },
						//{ property: 'zip', value: '02139' } ] },
			json: true };

		console.log(options.body.properties);

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			//console.log(body);
		});

  res.send('data submitted!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
