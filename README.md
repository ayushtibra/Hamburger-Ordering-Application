# Haumburger Ordering Application

Project hosted on Firebase-
[See Demo](https://burger-create-63d20.firebaseapp.com/)

This is a <b>responsive</b> web app(ReactJS) initially retrives the initail ingredients from firebase. You can modify ingredients as per
your taste and price changes accordingly.<br /> 
To Order you have to Log In, Without Authentication you can't modify or order the burger and also can't access the orders page.<br />
You will automatically redirected to SignUp page if you try to access the orders page.<br />
After log in you can now add ingredients to the burger and order it.<br />
All the details of burger appear on modal and you can now order it or cancel it.<br />
Your burger appears on screen and there is form to submit your personal details like Name, Phone number, Address to deliver burger at
your location. <br />
After submitting form your order placed succesfully and you can see it on orders page.<br />
 
Activities in App:-

## 1. Main Page
This page shows your initial burger with no ingredients added, the burger data is fetched from firebase. You have to Log IN to place a
burger or to modify a burger.
<div>
 <img scr="/Screenshot/burgerMain.PNG">
</div>

## 2. Authentication Page
First you have to register to the system then to use the app you have to login with the credintials.
<div>
<img src="/Screenshot/Login.PNG">
</div>
 
## 3. Modal 
After succesfull authentication now you modify ingredients accordingly and by clicking on Order Now button, a modal appears with
all the details of Burger including Price,number of ingredients,etc.
<div>
<img scr="/Screenshot/modal.PNG"/>
</div>
 
## 4. Form
You have to fill all the personal details so that burger deliever at your location. Form validation also handled here like-
Zipcode- only numeric and of 5 digits and so on.
<div>
<img src="/Screemshot/form.PNG/>
</div>

## 5. Orders Page
Here you can see your previous orders and upcoming orders.
<div>
<img src="/Screenshot/orderspage.PNG">
</div>

### Any Queries and feedback regarding this project would be appreciable-
Queries - 
1) How to install this project on your local machine?

Feedback -
1) Find any errors please let me know
2) Method to improve any component
3) Anything you would like to say

### Mail me on - aayushtibra1997@gmail.com

### To run this Prject on your system-
1. npm install on your system.
2. node install on your system.

### How to run Project on your system-
- Install node modules where you downloaded the project.
- npm start to run the project

#### On Browser type-
localhost:3000 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


