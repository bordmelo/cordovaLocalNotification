/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      cordova.plugins.firebase.messaging.getToken().then(function(token) {
        console.log("Got device token: ", token);
    });

    cordova.plugins.firebase.messaging.onMessage(function(payload) {
      console.log("New foreground FCM message: ", payload);
      cordova.plugins.notification.local.schedule({
        title: payload.gcm.title,
        text: payload.gcm.body,
        foreground: true
    });
  });

  cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
    console.log("New background FCM message: ", payload);
})

        document.getElementById("notify").addEventListener("click",
          function () {
            cordova.plugins.notification.local.schedule({
                title: 'Notificação teste',
                text: 'Apenas um teste...',
                foreground: true
            });
          }
        );
    }
};

app.initialize();