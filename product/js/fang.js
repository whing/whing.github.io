/*! Copyright (c) www.qiqibk.com. All Rights Reserved. 
//@ Mask the left and right mouse button, prohibit f12
*/

document.oncontextmenu=new Function("return false") 
document.onselectstart=new Function("return false") 

this.top.location !== this.location && (this.top.location = this.location);

//禁止F1-F12
function testKeyDown(event) 
 {   
  if ((event.keyCode == 112)  || //屏蔽 F1 
   (event.keyCode == 113)  || //屏蔽 F2 
   (event.keyCode == 114)  || //屏蔽 F3 
   (event.keyCode == 115)  || //屏蔽 F4 
   (event.keyCode == 116)  || //屏蔽 F5
   (event.keyCode == 117)  || //屏蔽 F6 
   (event.keyCode == 118)  || //屏蔽 F7 
   (event.keyCode == 119)  || //屏蔽 F8 
   (event.keyCode == 120)  || //屏蔽 F9 
   (event.keyCode == 121)  || //屏蔽 F10 
   (event.keyCode == 122)  || //屏蔽 F11 
   (event.keyCode == 123))    //屏蔽 F12 
  { 
   event.keyCode = 0;   
   event.returnValue = false; 
  } 
 } 
 document.onkeydown = function(){testKeyDown(event);} 
 window.onhelp = function(){return false;} 
 
 
//禁止右键 
$(document).ready(function() {  
$(document).bind("contextmenu",function(e) {   
//alert("禁止使用右键"); 
return false;  
});  
});  


//禁止回车
window.onload = function () 
{ 
     document.body.onkeydown=function(event) 
    { 
        if(event.keyCode==13) 
        { 
//            alert("不允许按回车键"); 
        } 
    } 
} 
 
 
//禁止ctrl组合键


$(function(){  
  
    document.addEventListener('keydown', function(e){  
         e = window.event || e;  
         var keycode = e.keyCode || e.which;       
  
         if(e.ctrlKey && keycode == 87){   //屏蔽Ctrl+w    
            e.preventDefault();  
            window.event.returnValue = false;    
         }  
  
         if(e.ctrlKey && keycode == 82){   //Ctrl + R   
            e.preventDefault();   
            window.event.returnValue= false;   
         }                     
         if(e.ctrlKey && keycode== 83){ //Ctrl + S    
            e.preventDefault();  
            window.event.returnValue= false;       
         }  
		 
         if(e.ctrlKey && keycode== 85){ //Ctrl + u    
            e.preventDefault();  
            window.event.returnValue= false;       
         }  
		 
         if(e.ctrlKey && keycode== 65){ //Ctrl + A    
            e.preventDefault();  
            window.event.returnValue= false;       
         } 
		 
         if(e.ctrlKey && keycode== 70){ //Ctrl + F    
            e.preventDefault();  
            window.event.returnValue= false;       
         } 
		 
         if(e.ctrlKey && keycode== 74){ //Ctrl + G    
            e.preventDefault();  
            window.event.returnValue= false;       
         } 
  
         if(e.ctrlKey && keycode == 72){   //Ctrl + H   
            e.preventDefault();  
            window.event.returnValue= false;   
         }  
         if(e.ctrlKey && keycode == 74){   //Ctrl + J  
            e.preventDefault();   
            window.event.returnValue= false;   
         }  
         if(e.ctrlKey && keycode == 75){   //Ctrl + K   
            e.preventDefault();  
            window.event.returnValue= false;   
         }  
         if(e.ctrlKey && keycode == 78){   //Ctrl + N  
            e.preventDefault();  
            window.event.returnValue= false;   
         }          
    });  
});  
if(url.Referrer.indexOf("www.qqshabi.cn")<0) 	return;

