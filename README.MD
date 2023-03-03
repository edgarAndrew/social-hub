
# Social Hub

## Project Demo
https://candid-faun-b0307e.netlify.app/

Test login credentials:

email - tesla@gmail.com

password - tesla123

## Local Setup

### Backend

```
cd server
npm install
npm test
```

### Frontend
```
cd client
npm install
npm start
```
### Environment Variables
##### Note: Create a collection on mongodb and note down the mongo uri, also create an account on cloudinary and note down your cloudinary name, key and secret.
#### Create .env file
```
MONGO_URI=[Your mongo uri]
JWT_SECRET=[your jwt secret]
JWT_LIFETIME=10d
CLOUDINARY_NAME=[]
CLOUDINARY_KEY=[]
CLOUDINARY_SECRET=[]
```
### API Endpoints
Import the JSON file social-hub-postman-collection in postman



