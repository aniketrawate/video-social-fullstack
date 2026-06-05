# This is the Backend for the video App.

## 1. Setting up Project

1. to create a project `npm init`

2. then create a file named `index.js` and `Readme.md` for nots if want.

3. Create a `public` Folder to store the images of thumbnail and in it create a `temp` folder

4. If you want to keep the empty public/temp file in the git repo then use the `.gitkeep` it allowes to store the empty folders cause now they have file in them.

5. create a .gitignore file and add the files to ignore in it by using git ignore generator for node project.

6. Now Create these files `.env, app.js, constants.js` file in `src` folder in root of project also add `index.js` in `src` too.

7. In packege.json, add this `"type": "module"`. So the we can import modules or code by `import`.

8. Install Nodemon for auto restart the server by `npm i -D nodemon`

9. create a `npm run dev` Command in `package.json` by adding `"dev": "nodemon src/index.js"` in scripts

10. create these folders in `src` `controllers, db, middlewares, models, routes, utils`

## 2. Creating DB and connection to it

1. Create A clustor in MongoDB Atlas. Create a user with Pass. Create a 0.0.0.0/0 network acceses.

2. then go to the `Clusters` and and click on connect then select the Driver Option then node.js then coply the string.

3. Pest the MongoDB string in .env and dont forgot to replace the password.

4. install mongoose and express.

5. then write the code to connect DB in db folder at dv/index.js and write code for app in app.js for express

6. For .env to load in process we have two options. 
    1. With dotenv package.
        - installing `npm i dotenv`
        - then import (in main entrypoint of app. ie index.js then it will injected to every where which code used in main index.js) by `import dotenv from 'dotenv'` and `dotenv.config({ path: '/.env' });`
        - or
        - In single line by `import 'dotenv/config'`
        - but remeber to add the `"type": "module"` in package.json
    2. In Node.js 20+
        - In Node.js 20+ we dont really need to install dotenv package just use this script with this flag `"start": "node --env-file=.env server.js"` so all env variables get inject
        - But we are using node mon command so use this script `"dev": "nodemon --env-file=.env src/index.js"`

## 3. Custom APIs response and error handling.

1. write app.listen in main index.js in .then() after the connectDB() as connectDB() is async and need to wait for it to complete for listning no need for .catch as it is handled in db/index.js

2. Then install `npm i cookie-parser cors` these two packeges

3. In app create a cors origin ie whitelisting our front end requesting connection, by `app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true }))`

4. write code for cookies-parser in app.js and other 

5. wrote 3 files apiErrorHandler.js apiResponse.js ayncHandler.js for standardizing erros responce and async funcitons.


## 4. User and Video Modle with Hooks and JWT.

1. created data model for user and video. 

2. Install package `npm install mongoose-aggregate-paginate-v2` for mongoose aggregation. And add this videoSchema.plugin(mongooseAggregatePaginate); in video.model.js before the exprot

3. now install 2 packages bcrypt for encrypting and decrypting passwords and one jsonwebtoken for JWD by `npm i bcrypt jsonwebtoken`

4. write the logic using bcrypt for hasing password before storing using middle ware pre() and logic for checking the password when loggin by comparing it with stored hash (by adding a method in userSchema) in user.model.js by adding method in userSchema.

5. for JWT create a 2 secreats or keys by `openssl rand -hex 64` and add them in .env with there expiry time.

6. write code for the JWT by adding 2 methods access token and refresh token in userSchema

## 5. File upload usiong multer and cloudinary.
1. install packages `npm i multer cloudinary` then write the code in new file cloudinary.js in utils also add all the env varialbles in .env file. 
    - this cloudinary.js is for uploading file form the server to the cloudinary.
    
2. then create a m