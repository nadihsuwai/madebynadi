
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
      console.log(webhook_event);


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

function handleMessage(sender_psid, received_message) {
   var makebook = {
  bookingdate:false,
  bdk:false,
  };
  let response;

  
  // Checks if the message contains text
  if (received_message.text == "hi") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'hello! Welcome madebynadi Page.Thank for visiting my page.',
    }
  }
  else if (received_message.text == "Yes!") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank you',
    }
  }
   else if (received_message.text == "No!") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'OK',
    }
  }
  else if (received_message.text == "Please enter the exactly date for event" || received_message.text == "Please enter the exactly date for event") {    
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
   else if (received_message.text == "Home") {    
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
  else if (received_message.text == "Order") {    
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
   else if (received_message.text == "Yes") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": 'Thank for my customer see you again.',
    }
  } 
   else if (received_message.text == "No") {    
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
   else if (received_message.text == "Yes") {    
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

  
  else if (received_message.text == "home") {
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
  else if (received_message.text === 'Wedding') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Wedding sample photo",
            "image_url":"https://scontent.fmdl2-2.fna.fbcdn.net/v/t1.0-0/s600x600/94380120_141568330741632_6706245322764451840_n.jpg?_nc_cat=104&_nc_sid=8bfeb9&_nc_eui2=AeFZA-s8gKXJOILihvOI7lMWFaLx270weSwVovHbvTB5LBi6eaqDxqGgyS6hrtGBtT3ggycPdHpyDKrnOVug4mKo&_nc_ohc=O3zEOcxPwqEAX_j1IJ2&_nc_ht=scontent.fmdl2-2.fna&_nc_tp=7&oh=2a30277d15d6256eaa2464876b622ddc&oe=5ECC7F2F",
            "subtitle":"",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"wedding photo"
              },{
                "type":"postback",
                "title":"wedding photo",
                "payload":"sc6"
              }              
            ]      
          },
           {
            "title":"",
            "image_url":"https://scontent.fmdl2-1.fna.fbcdn.net/v/t1.0-0/s600x600/94335130_141568377408294_6689828793823002624_n.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_eui2=AeGzzUthzEUPQ4_8r0-jJ6ZQFXof09ZS_zYVeh_T1lL_Nib5JttX8K93210rOHTNKKVmki7zX7D08ey4_pGTDIFz&_nc_ohc=q_AHGKhdRkMAX8Aiczj&_nc_ht=scontent.fmdl2-1.fna&_nc_tp=7&oh=b6ec042734345691b0d96bcd0a231144&oe=5ECA9DAC",
            "subtitle":"M ",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"",
                "title":"wedding photo"
              },{
                "type":"postback",
                "title":"wedding photo",
                "payload":"sc7"
              }              
            ]      
          },
           {
            "title":"",
            "image_url":"https://scontent.fmdl2-2.fna.fbcdn.net/v/t1.0-0/p370x247/94335096_141568460741619_8633813386645209088_n.jpg?_nc_cat=110&_nc_sid=8bfeb9&_nc_eui2=AeFQqOBcfM49cO9Sggxav1ASq9ppN_Sw85Sr2mk39LDzlH23S50SC6mlziL8IVRntHt8_py0Ooe9_bERX3GmNN36&_nc_ohc=QoooDhVBRyAAX9qmKWQ&_nc_ht=scontent.fmdl2-2.fna&_nc_tp=6&oh=5f0a25e814fbb069a8c43f30e8d8f2f5&oe=5ECE2F0A",
            "subtitle":"",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"wedding photo"
              },{
                "type":"postback",
                "title":"wedding photo",
                "payload":"sc8"
              }              
            ]      
          },
          {
            "title":"",
            "image_url":"https://scontent.fmdl2-1.fna.fbcdn.net/v/t1.0-0/s600x600/94488517_141568440741621_5149587525009932288_n.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_eui2=AeF88u_6x7DXlw4lG_Q4p5zWvnHc__JR8ue-cdz_8lHy50r4QIyKxsQKZVmGbw7uefqpJX7uvYuZJecng2AyQTnn&_nc_ohc=CwOWQspYpGAAX9r5Ben&_nc_ht=scontent.fmdl2-1.fna&_nc_tp=7&oh=2bcdf84c515b796d214e86519fbc6ec6&oe=5ECD689B",
            "subtitle":"",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"wedding photo"
              },{
                "type":"postback",
                "title":"wedding photo",
                "payload":"sc9"
              }              
            ]      
          },
          {
            "title":"",
            "image_url":"https://scontent.fmdl2-2.fna.fbcdn.net/v/t1.0-9/94429932_141568397408292_70215723082842112_n.jpg?_nc_cat=102&_nc_sid=8bfeb9&_nc_eui2=AeE4_dclMP_cLaVHdUNKWMcONM9RXVHjal00z1FdUeNqXQGPd9gKsRVUYQB5qbaRgzteOpww4a2oKK2G3ANG2yUt&_nc_ohc=omhBj3hQiKEAX9EnwMM&_nc_ht=scontent.fmdl2-2.fna&oh=12c678780f6a10974ce9911e1867a3bb&oe=5ECD73F1",
            "subtitle":"",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/110838683814597/posts/141568527408279/?d=n",
                "title":"wedding photo"
              },{
                "type":"postback",
                "title":"wedding photo",
                "payload":"sc10"
              }              
            ]      
          }
        ]
      }
    }
  }
  }

 else if (received_message.text == "slide") {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          }
        ]
      }
    }
  }
  }
  else if (received_message.text == "ni hao") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `Hao Xie Xie. Ni Hao Mah!`
    }
  }
   else if (received_message.text) {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
    }
  } else if (received_message.attachments) {
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
  } 
  else if (received_message.metadata === 'cbd2') {
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
      "meta data" : "cbd2"
  }
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
    response = { "text": "All of my feedback are following",
                  "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Yes!",
                    "payload":"D"
                  },{
                    "content_type":"text",
                    "title":"No!",
                    "payload":"IWC"
                  }]
     }
  }
   else if (payload === 'wd') {
    response = { "text": " choose package price for your choose location",
                  "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Home",
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
