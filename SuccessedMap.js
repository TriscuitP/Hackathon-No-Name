var http = require("http");
http.createServer(function(request, response) {  
    response.writeHead(200, {'Content-Type': 'text/html'});  
    response.write(
+    "<!DOCTYPE html>"
+    "<html>"
+    "<body>"
+    "<h1>My First Google Map</h1>"
+    '<div id="googleMap" style="width:100%;height:400px;"></div>'
+    "<script>"
+    "function myMap() {"
+    "var mapProp= {"
+    "center:new google.maps.LatLng(37.7749, -122.4194),"
+    "zoom:5,"
+    "};"
+    'var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);'
+    "}"
+    "</script>"
+    '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIwS7Dy2-MfyxPJ0aXbwj6AxqejPY4vLo&callback=myMap"></script>'
+    "</body>"
+    "</html>"
 );
    response.end('----Team NoName----');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
