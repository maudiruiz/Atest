var win = Ti.UI.currentWindow;


var viewMap = Ti.UI.createView( { 
	top:80,
	left:0,
	width:'100%',
	height:300,
	backgroundColor:'#CCC'
});

var view1 = Ti.UI.createView( { 
	top:80,
	left:0,
	width:'100%',
	height:300,
	backgroundColor:'red'
});
var view2 = Ti.UI.createView( { 
	top:80,
	left:0,
	width:'100%',
	height:300,
	backgroundColor:'blue'
});
var view3 = Ti.UI.createView( { 
	top:80,
	left:0,
	width:'100%',
	height:300,
	backgroundColor:'white'
});

var view4 = Ti.UI.createView( { 
	top:80,
	left:0,
	width:'100%',
	height:300,
	backgroundColor:'purple'
});

var price = Ti.UI.createSlider(
	{
		width:"200"
		
	}
)
var send = Ti.UI.createButton({
	   title: 'Send',
	   top:"20",
	   left:"20",
	   width: '50',
	   height:'35'
})
view1.add(price,send);
win.add(viewMap);



















// FOOTER

var footer = Ti.UI.createView( { 
	bottom:0,
	left:0,
	width:'100%',
	height:100,
	backgroundColor:"yellow"
});

var m1 = Ti.UI.createImageView( {
	top:0,
	left:0,
	width:'80',
	height:"100%",
	backgroundColor:"red"
});
var m2 = Ti.UI.createImageView( {
	top:0,
	left:80,
	width:'80',
	height:"100%",
	backgroundColor:"blue"
});
var m3 = Ti.UI.createImageView( {
	top:0,
	left:160,
	width:'80',
	height:"100%",
	backgroundColor:"white"
});
var m4 = Ti.UI.createImageView( {
	top:0,
	left:240,
	width:'80',
	height:"100%",
	backgroundColor:"purple"
});

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:19.365508715731032, longitude:-99.1442421547851, 
            latitudeDelta:0.1, longitudeDelta:0.1},
    animate:true,
    regionFit:true,
    userLocation:true
});
view2.add(mapview);
win.add(mapview);

footer.add(m1,m2,m3,m4);
win.add(footer);
win.add(view2);
win.add(view3);
win.add(view4);
win.add(view1);







send.addEventListener('click', function (e){
	var priceNumber = Math.round(price.value*500);

	alert(priceNumber);
var url = "http://antiturista.com/ask_row_3.php?price="+priceNumber+"&type=restaurant";
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        // this function is called when data is returned from the server and available for use
        // this.responseText holds the raw text return of the message (used for text/JSON)
var result = this.responseText;
var xml = Ti.XML.parseString(result);
var items = xml.documentElement.getElementsByTagName("marker");

var name = xml.documentElement.getElementsByTagName("name");
var value = xml.documentElement.getElementsByTagName("address");

var data = [];

for (var i=0;i<items.length;i++) {
  data.push({
        name: items.item[i].getElementsByTagName("name")[0].textContent,
        address: items.item[i].getElementsByTagName("address")[0].textContent 

   })
          	alert("ok");

 //alert(items.item(i).getElementsByTagName("name").item(0).text+items.item(i).getElementsByTagName("price").item(0).text);
}

alert(data[0].name);

        // this.responseXML holds any returned XML (including SOAP)
        // this.responseData holds any returned binary data
        Ti.API.debug(this.responseText);
    },
    onerror: function(e) {
        // this function is called when an error occurs, including a timeout
        Ti.API.debug(e.error);
        alert('error');
    },
    timeout:5000  /* in milliseconds */
});
xhr.open("GET", url);
xhr.send();  // request is actually sent with this statement
	
});



m1.addEventListener('click', function (e){
	view1.show();	
	view2.hide();	
	view3.hide();
	view4.hide();
});
m2.addEventListener('click', function (e){
	view1.hide();	
	view2.show();	
	view3.hide();
	view4.hide();
});
m3.addEventListener('click', function (e){
	view1.hide();	
	view2.hide();	
	view3.show();
	view4.hide();	
});
m4.addEventListener('click', function (e){
	view1.hide();	
	view2.hide();	
	view3.hide();
	view4.show();	
});