var no = 10;
var time = 0; // nombre de secondes(0=la pluie ne s'arrête jamais)
var speed = 30;
var i, dwidth = 900, dheight =500; 
var nht = dheight;
var toppos = 0;

if(document.all){
		var ie4up = 1;
}else{
		var ie4up = 0;
}

if(document.getElementById && !document.all){
		var ns6up = 1;
}else{
		var ns6up = 0;
}

function getScrollXY() {
  var scrOfX = 10, scrOfY = 10;
  if( typeof( window.pageYOffset ) == 'number' ) {
	//Netscape compliant
	scrOfY =window.pageYOffset;
	scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	//DOM compliant
	scrOfY = document.body.scrollTop;
	scrOfX = document.body.scrollLeft;
  } else if( document.documentElement &&
	  ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	//IE6 standards compliant mode
   scrOfY = document.documentElement.scrollTop;
   scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

var timer;

function ranrot()
{

var a = getScrollXY();
if(timer)
{
		clearTimeout(timer);
}
toppos = a[1];
dheight = nht+a[1];


timer = setTimeout('ranrot()',2000);
}
		
ranrot();
		
function iecompattest()
{
		if(document.compatMode && document.compatMode!="BackCompat")
		{
				return document.documentElement;
		}else{
				return document.body;
		}
		
}
if (ns6up) {
		dwidth = window.innerWidth;
		dheight = window.innerHeight;
} 
else if (ie4up) {
		dwidth = iecompattest().clientWidth;
		dheight = iecompattest().clientHeight;
}

nht = dheight;

var cv = new Array();
var px = new Array();
var py = new Array();
var am = new Array();
var sx = new Array();
var sy = new Array();

var img_ind = 0;

for (i = 0; i < no; ++ i) {  
		cv[i] = 0;
		px[i] = Math.random()*(dwidth-100);
		py[i] = Math.random()*dheight;
		am[i] = Math.random()*20;
		sx[i] = 0.02 + Math.random()/10;
		sy[i] = 0.7 + Math.random();

		img_ind = Math.floor(Math.random() * (image.length));
		document.write("<div id=\"dot"+ i +"\" style=\"position: absolute; z-index "+ i +"; visibility: visible; top: 15px; left: 15px;\"><img src='"+image[img_ind]+"' border=\"0\"><\/div>");
}

function animation() {  // animation function
		for (i = 0; i < no; ++ i) {  // iterate for every dot
				py[i] += sy[i];
				if (py[i] > dheight-50) {
						px[i] = Math.random()*(dwidth-am[i]-100);
						py[i] = toppos;
						sx[i] = 0.02 + Math.random()/10;
						sy[i] = 0.7 + Math.random();
				}
				cv[i] += sx[i];
				document.getElementById("dot"+i).style.top=py[i]+"px";
				document.getElementById("dot"+i).style.left=px[i] + am[i]*Math.sin(cv[i])+"px";  
		}
		atime=setTimeout("animation()", speed);

}

function hideimage(){
		if (window.atime) clearTimeout(atime)
				for (i=0; i<no; i++) 
						document.getElementById("dot"+i).style.visibility="hidden";
}
if (ie4up||ns6up){
animation();
if (time>0)
		setTimeout("hideimage()", time*1000);
}
animation();