/* jshint strict: false */
/* global $: false, google: false */
//
// Red, White, and Blue JavaScript 
// for EECS 339 Project A at Northwestern University
//
// Originally by Peter Dinda
// Sanitized and improved by Ben Rothman
//
//
// Global state
//
// html    - the document itself ($. or $(document).)
// map     - the map object
// usermark- marks the user's position on the map
// markers - list of markers on the current map (not including the user position)
//
//

//
// When the document has finished loading, the browser
// will invoke the function supplied here.  This
// is an anonymous function that simply requests that the 
// brower determine the current position, and when it's
// done, call the "Start" function  (which is at the end
// of this file)
// 
//
$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(Start);
});

// Global variables
var map, usermark, markers = [],

// UpdateMapById draws markers of a given category (id)
// onto the map using the data for that id stashed within 
// the document.
UpdateMapById = function(id, tag) {
// the document division that contains our data is #committees
// if id=committees, and so on..
// We previously placed the data into that division as a string where
// each line is a separate data item (e.g., a committee) and
// tabs within a line separate fields (e.g., committee name, committee id, etc)
// 
// first, we slice the string into an array of strings, one per 
// line / data item
	var rows  = $("#"+id).html().split("\n");

// then, for each line / data item
	for (var i=0; i<rows.length; i++) {
// we slice it into tab-delimited chunks (the fields)
		var cols = rows[i].split("\t"),
// grab specific fields like lat and long
			lat = cols[0],
			long = cols[1];

// then add them to the map.   Here the "new google.maps.Marker"
// creates the marker and adds it to the map at the lat/long position
// and "markers.push" adds it to our list of markers so we can
// delete it later 
		markers.push(new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(lat,long),
			title: tag+"\n"+cols.join("\n")
		}));

	}
},

//
// ClearMarkers just removes the existing data markers from
// the map and from the list of markers.
//
ClearMarkers = function() {
	// clear the markers
	while (markers.length>0) {
		markers.pop().setMap(null);
	}
},

//
// UpdateMap takes data sitting in the hidden data division of 
// the document and it draws it appropriately on the map
//
UpdateMap = function() {
// We're consuming the data, so we'll reset the "color"
// division to white and to indicate that we are updating
	var color = $("#color");
	color.css("background-color", "white")
		 .html("<b><blink>Updating Display...</blink></b>");
        var colorcom1=$("#newidcom1");
        var colorcom2=$("#newidcom2");
        var colorind1=$("#newidind1");
        var colorind2=$("#newidind2");
        var colorop1=$("#newidop1");
        var colorop2=$("#newidop2");
        var colorop3=$("#newidop3");
        var colorelection=$("#newidelection");

        colorcom1.css("background-color","red");
        
       
        colorcom2.css("background-color","blue");
        
       
        colorind1.css("background-color","red");
        
      
        colorind2.css("background-color","blue");


        colorop1.css("background-color","red");


        colorop2.css("background-color","white");


        colorop3.css("background-color","blue");

        colorelection.css("background-color","white");


// Remove any existing data markers from the map
	ClearMarkers();

// Then we'll draw any new markers onto the map, by category
// Note that there additional categories here that are 
// commented out...  Those might help with the project...
//
        var datacheckbox = document.lookupcase.datacheckbox;
	if (datacheckbox[0].checked){
	   UpdateMapById("committee_data","COMMITTEE");}
	if (datacheckbox[1].checked){
	   UpdateMapById("candidate_data","CANDIDATE");}
	if (datacheckbox[2].checked){
	   UpdateMapById("individual_data", "INDIVIDUAL");}
	if (datacheckbox[3].checked){
	   UpdateMapById("opinion_data","OPINION");}
	//UpdateMapById("committee_data","COMMITTEE");
	//UpdateMapById("candidate_data","CANDIDATE");
	//UpdateMapById("individual_data", "INDIVIDUAL");
	//UpdateMapById("opinion_data","OPINION");

      

// When we're done with the map update, we mark the color division as
// Ready.
	color.html("Ready");

// The hand-out code doesn't actually set the color according to the data
// (that's the student's job), so we'll just assign it a random color for now
        if (Math.random()>0.5) { 
	    color.css("background-color","blue");
    } else {
	    color.css("background-color","red");
    }
},

//
// NewData is called by the browser after any request
// for data we have initiated completes
//
NewData = function(data) {
// All it does is copy the data that came back from the server
// into the data division of the document.   This is a hidden 
// division we use to cache it locally
	$("#data").html(data);
         $newidcom1=$("#newidcom1");
         $newidcom2=$("#newidcom2");
         $newidind1=$("#newidind1");
         $newidind2=$("#newidind2");
         $newidop1=$("#newidop1");
         $newidop2=$("#newidop2");
         $newidop3=$("#newidop3");
         $newidelection=$("#newidelection");


        if($newidcom1.length)
        {
          $newidcom1.remove();
        }
        if($newidcom2.length)
        {
          $newidcom2.remove();
        }
       if($newidind1.length)
        {
          $newidind1.remove();
        }
        if($newidind2.length)
        {
          $newidind2.remove();
        }


        if($newidop1.length)
        {
          $newidop1.remove();
        }
        if($newidop2.length)
        {
          $newidop2.remove();
        }
        if($newidop3.length)
        {
          $newidop3.remove();
        }

        if($newidelection.length)
        {
          $newidelection.remove();
        }



	if($("#colorcom1").length)
	   {
	    $newidcom1=$("#colorcom1").clone().attr('id','newidcom1');
	    $("#data").before($newidcom1);
            }
        if($("#colorcom2").length)
	   {
            $newidcom2=$("#colorcom2").clone().attr('id','newidcom2');
	    $("#data").before($newidcom2);
            }   
        if($("#colorind1").length)
	    {
             $newidind1=$("#colorind1").clone().attr('id','newidind1');
	     $("#data").before($newidind1); 
	     }
	if($("#colorind2").length)
	    {
            $newidind2=$("#colorind2").clone().attr('id','newidind2');
	    $("#data").before($newidind2);  
	    }


      	if($("#colorop1").length)
	    {
            $newidop1=$("#colorop1").clone().attr('id','newidop1');
	    $("#data").before($newidop1);  
	    }
     	if($("#colorop2").length)
	    {
            $newidop2=$("#colorop2").clone().attr('id','newidop2');
	    $("#data").before($newidop2);  
	    }
        if($("#colorop3").length)
	    {
            $newidop3=$("#colorop3").clone().attr('id','newidop3');
	    $("#data").before($newidop3);  
	    }

        if($("#colorelection").length)
	    {
            $newidelection=$("#colorelection").clone().attr('id','newidelection');
	    $("#data").before($newidelection);  
	    }

// Now that the new data is in the document, we use it to
// update the map
	UpdateMap();
},

//
// The Google Map calls us back at ViewShift when some aspect
// of the map changes (for example its bounds, zoom, etc)
//
ViewShift = function() {
// We determine the new bounds of the map
	var bounds = map.getBounds(),
		ne = bounds.getNorthEast(),
		sw = bounds.getSouthWest();

// Now we need to update our data based on those bounds
// first step is to mark the color division as white and to say "Querying"
	$("#color").css("background-color","white")
		.html("<b><blink>Querying...("+ne.lat()+","+ne.lng()+") to ("+sw.lat()+","+sw.lng()+")</blink></b>");

// Now we make a web request.   Here we are invoking rwb.pl on the 
// server, passing it the act, latne, etc, parameters for the current
// map info, requested data, etc.
// the browser will also automatically send back the cookie so we keep
// any authentication state
// 
// This *initiates* the request back to the server.  When it is done,
// the browser will call us back at the function NewData (given above)
   var cyclecheckbox = document.lookupcase.cyclecheckbox;
   var resultlist = "";
   var choosecycle;
   var choosedata;
   var i;
   for (i = 0; i < cyclecheckbox.length; i++){
	if (cyclecheckbox[i].checked){
	    resultlist +=cyclecheckbox[i].value +",";
	}
    }
   if(resultlist.length==0) choosecycle=undefined;
   if(resultlist.length>0)  choosecycle=resultlist.substring(0,resultlist.length-1);
   
    var datacheckbox1 = document.lookupcase.datacheckbox;
    var resultlist1= "";
    var j;
    for(j = 0; j< datacheckbox1.length; j++){
        if(datacheckbox1[j].checked){
           resultlist1 +=datacheckbox1[j].value+",";
        }
    }
    
  if(resultlist1.length==0) choosedata=undefined;
  if(resultlist1.length>0)  choosedata=resultlist1.substring(0,resultlist1.length-1);

	$.get("rwb.pl",
		{
			act:	"near",
			latne:	ne.lat(),
			longne:	ne.lng(),
			latsw:	sw.lat(),
			longsw:	sw.lng(),
			format:	"raw",
			what:	choosedata,
                        cycle:  choosecycle
		}, NewData);
},


  

//
// If the browser determines the current location has changed, it 
// will call us back via this function, giving us the new location
//
Reposition = function(pos) {
// We parse the new location into latitude and longitude
	var lat = pos.coords.latitude,
		long = pos.coords.longitude;

// ... and scroll the map to be centered at that position
// this should trigger the map to call us back at ViewShift()
	map.setCenter(new google.maps.LatLng(lat,long));
// ... and set our user's marker on the map to the new position
	usermark.setPosition(new google.maps.LatLng(lat,long));
	document.cookie = 'Location=' + lat + '/' + long;
},


//
// The start function is called back once the document has 
// been loaded and the browser has determined the current location
//
Start = function(location) {
// Parse the current location into latitude and longitude        
	var lat = location.coords.latitude,
	    long = location.coords.longitude,
	    acc = location.coords.accuracy,
// Get a pointer to the "map" division of the document
// We will put a google map into that division
	    mapc = $("#map");

// Create a new google map centered at the current location
// and place it into the map division of the document
	map = new google.maps.Map(mapc[0],
		{
			zoom: 16,
			center: new google.maps.LatLng(lat,long),
			mapTypeId: google.maps.MapTypeId.HYBRID
		});

// create a marker for the user's location and place it on the map
	usermark = new google.maps.Marker({ map:map,
		position: new google.maps.LatLng(lat,long),
		title: "You are here"});
//cookie
	document.cookie = 'Location=' + lat + '/' + long;
// clear list of markers we added to map (none yet)
// these markers are committees, candidates, etc
	markers = [];

// set the color for "color" division of the document to white
// And change it to read "waiting for first position"
	$("#color").css("background-color", "white")
		.html("<b><blink>Waiting for first position</blink></b>");

//
// These lines register callbacks.   If the user scrolls the map, 
// zooms the map, etc, then our function "ViewShift" (defined above
// will be called after the map is redrawn
//
	google.maps.event.addListener(map,"bounds_changed",ViewShift);
	google.maps.event.addListener(map,"center_changed",ViewShift);
	google.maps.event.addListener(map,"zoom_changed",ViewShift);

//
// Finally, tell the browser that if the current location changes, it
// should call back to our "Reposition" function (defined above)
//
	navigator.geolocation.watchPosition(Reposition);
};




