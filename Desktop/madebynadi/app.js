
/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  
  let body = req.body;


  

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log("webhook_event:" ,webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);   

      

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


app.get('/setgsbutton',function(req,res){
    setupGetStartedButton(res);    
});

app.get('/setpersistentmenu',function(req,res){
    setupPersistentMenu(res);    
});

app.get('/clear',function(req,res){    
    removePersistentMenu(res);
});


// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  
    
  // Check if a token and mode were sent
  if (mode && token) {
    
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});
var make = {
  bookingdate:false,
  bdk:false,
  };
function handleMessage(sender_psid, received_message) {
   
  let response;

  
  // Checks if the message contains text
  if (received_message.text == "hi") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'hello! Welcome madebynadi Page.Thank for visiting my page.',
    }
  }
 else if(make.bookingdate === "waiting") {
    response = { 
      "attachment": {
                  "type": "template",
                  "payload": {
                   "template_type": "generic",
                    "elements": [{
                      "title": "OK",
                      "subtitle": "Please enter the exactly date",
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "wedding",
                          "payload": "wd",
                        },
                        {
                          "type": "postback",
                          "title": "graduation",
                          "payload": "wd",
                        },
                        {
                          "type": "postback",
                          "title": "donation",
                          "payload": "wd",
                        }
                      ]
                    }]
                  }
                }
    }
make.bookingdate=false;
  }
   else if (received_message.text === 'Wedding') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/W7mnfY3.jpg",
            "subtitle":"wedding",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }              
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/1xhM25m.jpg",
            "subtitle":"wedding",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }            
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/tMhNzdv.jpg",
            "subtitle":"wedding",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/9S4xzIU.jpg",
            "subtitle":"wedding",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }              
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/EcHonAz.jpg",
            "subtitle":"wedding",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }              
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/VipOVYw.jpg",
            "subtitle":"wedding",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          }
        ]
      }
    }
  }
}
 else if (received_message.text === 'Donation') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/VspQd36.jpg",
            "subtitle":"donation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/UwQTD5Y.jpg",
            "subtitle":"donation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/5a4Ti2D.jpg",
            "subtitle":"donation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/t38KmhQ.jpg",
            "subtitle":"donation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }            
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/DLV29Hr.jpg?1",
            "subtitle":"donation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/KNPzRB8.jpg",
            "subtitle":"donation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }            
            ]      
          }
        ]
      }
    }
  }
}




 else if (received_message.text === 'Graduation') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/ZZj3eZB.jpg",
            "subtitle":"graduation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }              
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/gUGy90c.jpg?1",
            "subtitle":"graduation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/3XrG7Kw.jpg",
            "subtitle":"graduation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }           
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/obeiK5j.jpg",
            "subtitle":"graduation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }            
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/wsRYf4u.jpg",
            "subtitle":"graduation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }            
            ]      
          },
          {
            "title":"Customer sample photo",
            "image_url":"https://i.imgur.com/yFRMHBR.jpg",
            "subtitle":"graduation",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }            
            ]      
          }
        ]
      }
    }
  }
}
  else if (received_message.text == "Yes!") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank you',
    }
  }
 else  if (received_message.text == "No!") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'OK',
    }
  }
 else  if (received_message.text == "Please enter the exactly date for event" || received_message.text == "Please enter the exactly date for event") {    
    response = {
      "text": `write the date.`
    }
    make.bookingdate = true;
  }else if (received_message.text && make.bookingdate == true) {   
    userEnteredmake.bookingdate =  received_message.text;
    response = {
      "text": `Please fill the date.`
    }
   make.bookingdate = false;
   make.bdk= true;
 }
 else if (received_message.text && make.bdk == true) {
   userEnteredmake.bdk =  received_message.text;
    response = { 
      "attachment": {
                  "type": "template",
                  "payload": {
                   "template_type": "generic",
                    "elements": [{
                      "title": "OK",
                      "subtitle": "Please enter the exactly date",
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "wedding",
                          "payload": "wd",
                        },
                        {
                          "type": "postback",
                          "title": "graduation",
                          "payload": "wd",
                        },
                        {
                          "type": "postback",
                          "title": "donation",
                          "payload": "wd",
                        }
                      ],
                    }]
                  }
                }
    }
    make.bdk= false;
  }
 else   if (received_message.text == "Customer Home") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": '50000 kyats and will you make the order',
       "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Order",
                    "payload":"D"
                  },{
                    "content_type":"text",
                    "title":"Cancle",
                    "payload":"IWC"
                  }]
    }
  }
 else  if (received_message.text == "Order") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Are you sure your order?',
      "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Yes",
                    "payload":"D"
                  },{
                    "content_type":"text",
                    "title":"No",
                    "payload":"IWC"
                  }]
    }
  }
 else   if (received_message.text == "Yes") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank for my customer see you again.',
    }
  } 
 else  if (received_message.text == "No") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank for visiting by my page madebynadi.',
    }
  } 
 else if (received_message.text == "Cancle") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank for visiting mypage.',
    }
  } 
   else if (received_message.text == "Shop") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": '45000 kyats and will you make the order',
      "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Order",
                    "payload":"D"
                  },{
                    "content_type":"text",
                    "title":"Cancle",
                    "payload":"IWC"
                  }]

    }
  }

else if (received_message.text == "Order") {   

    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
       "text": 'Are you sure your order',
      "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Yes",
                    "payload":"D"
                  },{
                    "content_type":"text",
                    "title":"No",
                    "payload":"IWC"
                  }]

    }
  }
else   if (received_message.text == "Yes") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank for my customer see you again.',
    }
  }  else if (received_message.text == "No") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank for visiting by my page madebynadi.',
    }
  } 
  else if (received_message.text == "Cancle") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank for visiting mypage.',
    }
  } 

  
 else  if (received_message.text == "home") {
    response = {
      "text":'please send me details address'
    }
  }else if (received_message.text == "shop") {
    response = {
      "text": 'building(1315) room(13) is my address ok! see you.'
    }
  }
  else if (received_message.text == "No") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'OK. Thank you!',
    }
  }
   
  

  else if (received_message.text == "ni hao") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `Hao Xie Xie. Ni Hao Mah!`
    }
  }
    /*if (received_message.text) {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
    }
  }  if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  } */
   
  // Send the response message
  callSendAPI(sender_psid, response);    
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }else if (payload === 'get_started') {
    response = { "attachment": {
                  "type": "template",
                  "payload": {
                   "template_type": "generic",
                    "elements": [{
                      "title": "welcome my page mady by nadi",
                      "subtitle": "what can i help for u?",
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "view feedback",
                          "payload": "vf",
                        },
                        {
                          "type": "postback",
                          "title": "choose booking date",
                          "payload": "cbd",
                        },
                        {
                          "type": "postback",
                          "title": "view sample photo",
                          "payload": "cl",
                        }
                      ],
                    }]
                  }
                }
    }
  }
  else if (payload === 'cbd') {
    response = { 
      "text":"Please enter the exactly date", 
      "metadata" : "cbd2"
  }
  make.bookingdate="waiting"
}

 else if (payload === 'cbd2') {
    response = { 
      "attachment": {
                  "type": "template",
                  "payload": {
                   "template_type": "generic",
                    "elements": [{
                      "title": "OK",
                      "subtitle": "Please enter the exactly date",
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "wedding",
                          "payload": "wd",
                        },
                        {
                          "type": "postback",
                          "title": "graduation",
                          "payload": "wd",
                        },
                        {
                          "type": "postback",
                          "title": "donation",
                          "payload": "wd",
                        }
                      ]
                    }]
                  }
                }
    }
  }

  
 else if (payload === 'cl') {
    response = { "text": " ok which event of image want to view",
                  "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Wedding",
                    "payload":"WD"
                  },{
                    "content_type":"text",
                    "title":"Graduation",
                    "payload":"GD"
                  },{
                    "content_type":"text",
                    "title":"Donation",
                    "payload":"DA"
                  }]
                  
     }
  }

   else if (payload === 'vf') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"my customer feedback",
            "image_url":"https://i.imgur.com/kX1qZdV.jpg",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"my customer feedback",
            "image_url":"https://i.imgur.com/bKvmY8y.jpg",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"my customer feedback",
            "image_url":"https://i.imgur.com/Qfij8Dy.jpg",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          },
          {
            "title":"my customer feedback",
            "image_url":"https://i.imgur.com/24kKTQF.jpg",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }              
            ]      
          },
          {
            "title":" my customer feedback ",
            "image_url":"https://i.imgur.com/2f8azjC.jpg",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }              
            ]      
          },
          {
            "title":"my customer feedback ",
            "image_url":"https://i.imgur.com/kX1qZdV.jpg",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"More Information"
              }             
            ]      
          }
        ]
      }
    }
  }
}






   else if (payload === 'wd') {
    response = { "text": " choose package price for your choose location",
                  "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Customer Home",
                    "payload":"wd"
                  },{
                    "content_type":"text",
                    "title":"Shop",
                    "payload":"wd"
                  }]
     }
  }
  

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}


function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}


function setupGetStartedButton(res){
        var messageData = {
                "get_started":{"payload":"get_started"}                
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    } 



function setupPersistentMenu(res){
        var messageData = { 
            "persistent_menu":[
                {
                  "locale":"default",
                  "composer_input_disabled":false,
                  "call_to_actions":[
                      {
                        "title":"Info",
                        "type":"nested",
                        "call_to_actions":[
                            {
                              "title":"Help",
                              "type":"postback",
                              "payload":"HELP_PAYLOAD"
                            },
                            {
                              "title":"Contact Me",
                              "type":"postback",
                              "payload":"CONTACT_INFO_PAYLOAD"
                            }
                        ]
                      },
                      {
                        "type":"web_url",
                        "title":"Visit website ",
                        "url":"http://www.google.com",
                        "webview_height_ratio":"full"
                    }
                ]
            },
            {
              "locale":"zh_CN",
              "composer_input_disabled":false
            }
          ]          
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    } 



function removePersistentMenu(res){
        var messageData = {
                "fields": [
                   "persistent_menu" ,
                   "get_started"                 
                ]               
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    } 
