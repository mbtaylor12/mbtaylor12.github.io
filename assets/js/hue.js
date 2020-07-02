var rootUrl = "https://mbtaylor.ngrok.io";

function tooManyRequestsErrorMessage()
{
	return "The website is currently experiencing high amounts of traffic and some commands may not go through. Please come back later.";
}

function brightness(brightness)
{
	$.ajax({
	    type: "POST",
	    data:{csrfmiddlewaretoken: window.CSRF_TOKEN, 'brightness':brightness},
	    url: rootUrl + "/brightness", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}

function brightnessUp()
{
	$.ajax({
	    type: "POST",
	    data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
	    url: rootUrl + "/brightnessUp", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}

function brightnessDown()
{
	$.ajax({
	    type: "POST",
	    data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
	    url: rootUrl + "/brightnessDown", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}

function lightsOff()
{
	$.ajax({
	    type: "POST",
	    data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
	    url: rootUrl + "/lightsOff", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}

function lightsOn()
{
	$.ajax({
	    type: "POST",
	    data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
	    url: rootUrl + "/lightsOn", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}

function randomColor()
{
	$.ajax({
	    type: "POST",
	    data: {},
	    url: rootUrl + "/randomColor", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}

function changeColor(red, green, blue)
{
	var xy = rgb_to_cie(red, green, blue);
	var x = xy[0];
	var y = xy[1];

	$.ajax({
	    type: "POST",
	    data:{'x':x, 'y':y, csrfmiddlewaretoken: window.CSRF_TOKEN, },
	    url: rootUrl + "/changeColor", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}

function changeWhite()
{
	$.ajax({
	    type: "POST",
	    data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
	    url: rootUrl + "/changeWhite", 
	    success : function(data) {

	     },
	     statusCode: {
	      429: function() {
	        alert(tooManyRequestsErrorMessage());
	      }
	    }
	});
}





/*
With these functions you can convert the CIE color space to the RGB color space and vice versa.
The developer documentation for Philips Hue provides the formulas used in the code below:
https://developers.meethue.com/documentation/color-conversions-rgb-xy
I've used the formulas and Objective-C example code and transfered it to JavaScript.
Examples:
var rgb = cie_to_rgb(0.6611, 0.2936)
var cie = rgb_to_cie(255, 39, 60)
------------------------------------------------------------------------------------
The MIT License (MIT)
Copyright (c) 2017 www.usolved.net
Published under https://github.com/usolved/cie-rgb-converter
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * Converts RGB color space to CIE color space
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @return {Array} Array that contains the CIE color values for x and y
 */
function rgb_to_cie(red, green, blue)
{
	//Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
	var red 	= (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
	var green 	= (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
	var blue 	= (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92); 

	//RGB values to XYZ using the Wide RGB D65 conversion formula
	var X 		= red * 0.664511 + green * 0.154324 + blue * 0.162028;
	var Y 		= red * 0.283881 + green * 0.668433 + blue * 0.047685;
	var Z 		= red * 0.000088 + green * 0.072310 + blue * 0.986039;

	//Calculate the xy values from the XYZ values
	var x 		= (X / (X + Y + Z)).toFixed(4);
	var y 		= (Y / (X + Y + Z)).toFixed(4);

	if (isNaN(x))
		x = 0;

	if (isNaN(y))
		y = 0;	 


	return [x, y];
}