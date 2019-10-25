const badSecret = `
----------------------------

*** WARNING ***
Your application is not very secure.
You need to set SERVER_SESSION_SECRET to a better secret
Please follow the README and add a .env file

It should be
- longer than 8 characters
- not "superDuperSecret"

If this warning is showing on Heroku,
add or change your SERVER_SESSION_SECRET environment variable!

----------------------------`;

const exampleBadSecret = 'superDuperSecret';

module.exports = {
  badSecret,
  exampleBadSecret,
};

//this is just an error log in the server that will show if you have no .env file setup with a SERVER_SESSION_SECRET key. check the readme
