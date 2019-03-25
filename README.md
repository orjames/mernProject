# mernProject

## Full MERN stack project

#### Developers:

Owen R. James,
Mickey Cowan,
Kenneth Hong

## About the App

Complement is an app that recommends complimentary colors for your outfit. Users can upload an image, and receive a collection of complimentary colors to add to that outfit.

### User Stories

- Ken can't decide what to decide to wear to an upcoming event. He knows he wants to wear his favorite blue shirt. However, he has no idea what goes well with it. Stylistically challenged, Ken decides to use Complement to get complementary colors for potential outfits. He goes to the event, receives many compliments.

- Karen is an interior designer. She see's a room and knows she wants to add accents to the curtains and other part of it. She takes a picture of the room, and using Complement's intelligent algorithm she receives a variety of different color options. The room is vivacious, the client gives her many compliments.

- Carlo is working on his car. He's more of a nuts and bolts guy, but wants to work on the interior. He snaps a photo of his car's interior, and uses Complement to find a spectrum of colors that shifts his design to a higher gear. Carlo now has the perfect color for his stitching accents, his wife is pleased, and pays him many compliments.

### Under the Hood

#### Key Technologies Used:

- React
- React Router
- mongoDB
- node.js
- mongoose
- axios
- bcrypt
- dotenv
- express
- express-jwt
- express-rate-limit
- helmet
- jsonwebtoken
- react-bootstrap
- react-vis


## Project Timeline

### Planning

- Discussed app ideas
- Researched API's
- [Trello Board](https://trello.com/b/KzDYzqsH/project-3-wdi)
- [Wireframing](link.com)

## WireFraming

We created wireframes in AdobeXD and made an interactive UI.

Login Page:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')
Signup Page:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')
Home Page:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')
Home Page Scrolled(1):
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')
Home Page Scrolled(2):
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')
Profile Page:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')

## API

We decided to use The Color API which gives you options of colors to output given an input color in either hex or rgb format. The options were:
*monochrome
*monochrome-dark
*monochrome-light
*analogic
*complement
*analogic-complement
*triad
*quad
We decided that allowing the user to select between these would be perfect.

## Back-end Planning

### Entity Relationship Diagram

- Link to the Entity Relationship Diagram made with <a href="https://www.draw.io/?libs=general;uml"> Draw.io </a>.

- Screenshot of the Entity Relationship Diagram:
  ![](./images/ERD.png)

###  Routes 

| Method | Route | 
|--------|-------|
| POST   | /login | 
| POST   | /signup | 
| POST   | /index | 
| GET    | /index/result | 
| GET    | /profile |
| PUT    | /profile | 
| POST   | /profile/upload |
| DELETE | /profile/upload/delete | 

### Getting the Cloudinary API to Jive

We found a useful method in the cloudinary API that would analyze photos for colors. However, getting this API to function was a non-trivial task. I set out to create a test app with the sole purpose of attaining color information from a given picture. I made an express app using mongoose as the (Object Document Mapper) ODM for MongoDB.

I required the packages necessary to use the most basic functionality of this test app.

```javascript
const express = require('express');
const app = express();
const cloudinary = require('cloudinary');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
app.use(express.urlencoded({ extended: false }));
```

Next, I had to configure the cloudinary package needed to access cloudinary to my specific API key and API secret which I stored in my .env file.

```javascript
cloudinary.config({
  cloud_name: 'orjames',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});
```

next I added a get simple GET route to access the cloudinary API analysis tools and set colors to true to output the color data from the image. The resulting JSON object would oupput the picture color information we needed. Success!

```javascript
//creating the test route
app.get('/cloudinary-data', function(req, res) {
  console.log('in get route');
  cloudinary.v2.api.resource('Owen_-_City_-_Small', { colors: true }, function(
    error,
    result
  ) {
    res.json(result);
  });
});
```


## Front-end Planning

### Components

- Screenshot of the components:
  ![](./images/Components.png)

## App Development

### Data Visualization 
React-vis is a React visualization library created by Uber. With it you can easily create common charts, such as line, area, bar charts, pie and donut charts, tree maps and many more. We are using React-vis to display the color hex data from the image and also the percentage of promienence it holds. From here the user can see the color data. 

- Code Snippet:
![](./images/dataVisCode.png)

- React Vis Example:
![](./images/dataVisRadialChart.png)



#### Image Attribution


Link to spectrum image
<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by starline - www.freepik.com</a>

Link to 2nd spectrum image
<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by pinnacleanimates - www.freepik.com</a>
