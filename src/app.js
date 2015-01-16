/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var SERVER_URL = "http://app.moovitapp.com";
var FAVORITES_URL = SERVER_URL + "/services-app/services/Favorites/GetFavoriteStopsData";

function zfill(str, min) {
    while (str.length < min) {
        str = "0" + str;
    }
    
    return str;
}

var main = new UI.Card({
  title: "Please wait...",
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

var test_stop = {
         "favoriteLines":[
            {
               "lineNumber":"9",
               "agencyId":3
            }
         ],
         "stopId":5684
      };
function get_stops_info(stops) {
    var date = new Date();
    var curr_time = zfill(date.getHours(), 2) + ":" + zfill(date.getMinutes(), 2);
    var headers = { 'USER_ID': '6974001',
                             'CLIENT_OS_VERSION': '4565',
                             'CLIENT_DEVICE': '2',
                             'CLIENT_VERSION': '3.9.0.100',
                             'App-Type': '4' };
    var request = {
        "currTime" : curr_time,
        "withRealtime" : true,
        "favoriteStops" : stops
    };
    
  ajax(
    {
      url: FAVORITES_URL,
      method: 'post',
      data: request,
      crossDomain: true,
      type: 'json',
      headers: headers
    }, 
     function(result) {
       //console.log('Success and Result is: ' + result);
       
		var stop = result['favoriteStops'][0];
		var dets = stop['routeStopDetails'][0];
		var summary = dets['routeHeaderPrefix'] + " " + dets['routeHeaderSuffix'] + " " + dets["routeCaption"];
		main.title(summary);
       //result = JSON.parse(result);
    },
    function(error) {
      main.subtitle("No :( " + error);
    } 
   );
   return "lolz";
   
}

get_stops_info([test_stop]);

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
