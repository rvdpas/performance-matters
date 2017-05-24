# Performance Matters Funda application

## Introduction
In this repository, you will find code to optimize the Funda Web Application. Funda is the largest real estate platform for Consumers and entrepreneurs. The company has a huge database with all the houses that are available for sale in the Netherlands. Through the uses of multiple techniques, I'll improve the speed of the application. I've learned a few of these techniques during the class Performance Matters at the HvA during the Minor Web Development.

## Funda api
To use this application u need 4 keys in the .env file. If you have you keys, you can call them in je app.js (server-side) like this:
```
var apiUrl = process.env.API_URL;
var apiKey = process.env.API_KEY;
var searchKey = process.env.API_SEARCH_KEY;
var searchKeyExtended = process.env.API_SEARCH_EXTENDED;
```

## Optimalisations

### Compression
Compression is a npm package that g-zips the whole application.

[compression](https://www.npmjs.com/package/compression)

### Critical CSS
Normally a web browser renders the whole document from top to bottom. This means that it can take a long time before the whole file is loaded. With the introduction of critical css we can optimize the delivery of our css.

[Critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/)

### Lazy loading
I've added a way of lazy loading the images in the application. When a user with slow internet tries to load the application, there will be placeholders so the page won't jump by loading the images. 

![lazy loading](https://github.com/rvdpas/performance-matters/blob/master/public/img/lazy-loading.png)

[lazy-loading](http://andmag.se/2012/10/responsive-images-how-to-prevent-reflow/)

### spinner
The spinner i've added will show on the first time loading. This way the user gets feedback that the page is getting the data instead of looking at an empty screen, waiting for it to load.

### Service worker
The service worker is added so all the pages the user visits will be cached. This gives the user the ability to check the pages again, even when he's offline.

### How to install the application

Clone or download the repository  
```
https://github.com/rvdpas/performance-matters.git
```     

Install the dependencies   
```
npm install
```   

Start the server  
```
npm start
```  

### Wishlist
* Compare multiple houses
