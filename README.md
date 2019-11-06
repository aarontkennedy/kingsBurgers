# kingsBurgers

This is a burger tracking node.js powered web application for the King's Bar & Grill.  It get a user's identity via Google oAuth2.  It stores the user's info and burger info.  See it in action at https://kingsburgers.herokuapp.com .

If you want to run this repo on your own, you will need a couple of things.  Google login is handled via react-google-login.  You will need to set up the <GoogleLogin> tag in Home.js.  

You also need a mySQL database.  The connection info is in a file called mySQLkeys.json and is in the data folder.  It should look like: 
```
{
    "host": "xxx",
    "port": 3306,
    "user": "xxx",
    "password": "xxx",
    "database": "xxx"
}
```

If you look in the code, you can also reference process.env variables to get the above connection/credentials.

When everything is set up, you can run the following commands to run it locally.

npm install
npm start

