# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
jQuery(document).ready(function($) {
      $('a.thumbnail').colorbox({maxHeight:"550px",onComplete:function(){$('div#cboxTitle').addClass('wordwrap');},opacity:0.5});	
    });

    var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-17032623-1']);
      _gaq.push(['_trackPageview']);
    
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();  

function mygat(){
        if (typeof(_gat) == 'undefined') {
          window.setTimeout(mygat,1000);
        } else {
          var pageTracker = _gat._createTracker("UA-17032623-1");
          pageTracker._setCustomVar(1, 'user_session_id', '9e2a42e5f5e6377b254724103b756600', 2);
          pageTracker._setCustomVar(2, 'user_id', '18110', 2);
          pageTracker._setCustomVar(3, 'user_displayname', "Sudhir Singh Tomar", 2);
          pageTracker._setCustomVar(4, 'page', 'user/show', 3);
          pageTracker._trackPageview();
        }      
     }
    
     function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
          window.onload = func;
        } else {
          window.onload = function() {
            if(oldonload){oldonload();}
              func();
            }
        }
      }
      
      addLoadEvent(mygat); 
 var htt_bind = "http://172.16.57.102:3000/heartbeat/";
      //var enable_sound = "";
      var is_employee = "true";
      var app_path = "http://glo.globallogic.com/"
      var user_json_data = new Array();
      jQuery(document).ready(function(){
        initialize_utip();
          jQuery.get('/user/set_offset', 'offset='+(new Date()).getTimezoneOffset());
      });
      function dialog_check(){
        if(jQuery("#search_by").attr('value') == 'Skill'){
          $('#dialog_gallery').html('<div align="center"><img alt="Ajax-loader" class="ajax" src="../images/anim_loading_75x75.gif" /></div>');
          $('#dialog_gallery').dialog({
            position: 'top'
          });
          $('#dialog_gallery').dialog('close');  
        
          if(jQuery("#search_by").attr('value') == 'Skill'){
            $('#dialog_gallery').dialog({
              resizable: false,
              draggable: false
            }, {
              position: 'center'
            }, {
              width: $(this).attr('width')
            }, {
              height: $(this).attr('height')
            }, {
              title: $(this).attr('title')
            }, {
              modal: true
            }, {
              autoOpen: false
            });
            $('#dialog_gallery').dialog('open');
            $("div a.ui-dialog-titlebar-close").hide();
            $("div.ui-dialog-titlebar").removeClass("ui-widget-header");
            $("div.ui-widget-overlay").css("opacity","0.3");
            $("div.ui-widget-overlay").css("z-index","1001");
            $("div.ui-widget-overlay").addClass("dialog-overy-image");
            
            $("div.ui-widget-content").css("background","none");
            $("div.ui-widget-content").css("border","none");
          } 
        }
        return validate_organization();
      }

$(document).ready(function() {
        var hideDropDown = false;
        var hideSearchResults = false;
                      
        //document.onclick = function() {
        $(this).click(function() {
          hideSearchDropdowns(hideDropDown, hideSearchResults);
        });
        //commented as part of IE7 fix
        /*
                                          $("a").bind("click", function(){
                                                hideSearchDropdowns(hideDropDown, hideSearchResults);
                                          });
                      if ($.browser.msie && (jQuery.browser.version == "7.0")){
                          $(".browser_warning").removeClass("hide");
                      }
         */
        jQuery('input#search').bind('blur', function(){
          var el = jQuery(this);
          jQuery('input#search').addClass(' post_time');
          var message = jQuery("a[object='" + jQuery('input#search_by').val() + "']").attr('message');
          if(el.val() == '') {
            el.val(message);
          }
        });
					 
        jQuery('input#search').bind('focus', function(){
          var el = jQuery(this);
          jQuery('input#search').removeClass(' post_time');
          var message = jQuery("a[object='" + jQuery('input#search_by').val() + "']").attr('message');
          if(el.val() == message) {
            el.val('');
          }
        });
      });
				 
      function hideSearchDropdowns(hideDropDown, hideSearchResults){
        if (!hideDropDown){
          //$("div#dropdown").hide();
        }
        if (!hideSearchResults){
          $("div#results").hide();
        }
      }

	jQuery('a.open_search_menu').html('People');
				
	    		jQuery('input#search_by').val('User');
    $('li a.inactive').click( function(){
      glo_popup('Coming Soon', '<span style="font-size:10pt;"><p>We are currently working on this feature.</p> <p> We invite you to share your thoughts and opinions via the <a href="/communities/261"><strong>Enterprise Applications Group Community</strong></a></p></span>');
    });

$(document).ready(function(){
		    $("a#submit_crop_form",window.parent.document).live("click", function(e) {
			if (!e) e = window.event;
			e.preventDefault();
			if ($("#crop_w").val() <= 0 && $("#crop_h").val() <= 0){
				$("a#submit_crop_form").disable = false;
			}
			else{
			    //$("#crop_form").submit();
			    $.post($('#crop_form').attr('action'), $('#crop_form').serialize(), null, 'script');
			    $("a#submit_crop_form").addClass('hide');
			    $("#show_loading_image_for_crop").removeClass('hide');
			}
		    });            
		});

$(document).ready(function() {
      $("span#user_completion_bar").progressBar("40");
  });

    jQuery(document).ready(function($){
        var $tabs = $('#sec_tab').tabs({selected: -1 , cache: true, ajaxOptions: { async: false }, 
        	select: function(event, ui) { 
        		if(ui.index == 1) {
        			if($.trim($("span#skype_details").html()) == '') {
        				var skype_html = '<a href="skype:?call"><img src="http://mystatus.skype.com/smallicon/" alt="" /></a>\
								  <a href="skype:?add"><img src="/themes/default/images/skype_add.png" alt="" /></a>'
						$("span#skype_details").html(skype_html);
        			}
        			
        			if($.trim($("span#yahoo_details").html()) == '') {
        				var yahoo_html = '<a href="ymsgr:sendim?" id="yahoo_sendim">\
							          <img alt="" src="http://opi.yahoo.com/yahooonline/u=/m=g/t=5/l=us/opi.jpg" /></a>\
								  <a href="ymsgr:addfriend?"><img src="/themes/default/images/yahoo_add.png" alt="" /></a>'
						$("span#yahoo_details").html(yahoo_html);
        			}
        		}
        	}
        });
        $('#sec_tab').tabs('select','info');
    
    function not_online(){
	    $(".notice-wrap").remove();
	    jQuery.noticeAdd({
		text: 'You are logged out of Chat. Please logout and login again to enable chat.',
		stay: true
	    });
    }
    });

  