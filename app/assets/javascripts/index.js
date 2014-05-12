$(document).ready(function() {
    //setup status update textbox
    $('textarea.update_text_box').val('What are you doing?');
    $('textarea.update_text_box').bind("focus", function() {
        $("div#results").hide();
        $("div#dropdown").hide();
        $(this).attr('rows', 2);
        if ($(this).val() == 'What are you doing?') {
            $(this).val('');
        }
    });

    //load widgets
    if ($("#col2").length) {
        if(myWidget_1['visibilty'] && myWidget_1['status'])
	{
	    $.ajax({
		url: '/activity/bday_and_anniversary',
		type:'GET',
		dataType: 'html',
		beforeSend: function() {
		    loading('col2', 'Employee Birthdays', 'col2'); //in application.js
		},
		success: function(data) {
		    
		    $("#col2 #widget_"+myWidget_1['position']).append(data);
		},
		complete: function() {
		    end_loading('col2'); //in application.js
		}
	    });
	}
	    
	if(myWidget_5['visibilty'] && myWidget_5['status'])
	{    
	    $.ajax({
		url: '/glo/new_joinees',
		dataType:'html',
		type:'GET',
		beforeSend: function() {
		    loading('new_joinees', 'New Joinees', 'col2'); //in application.js
		},
		success: function(data) {
		    $("#col2 #widget_"+myWidget_5['position']).append(data);
		},
		complete: function() {
		    end_loading('new_joinees'); //in application.js
		}
	    });
	}    
        
    if(myWidget_3['visibilty'] && myWidget_3['status'])
	{ 
	    $.ajax({
		url: '/awards/index',
		type:'GET',
		dataType: 'html',
		beforeSend: function() {
		    loading('col2', 'Rewards & Recognitions', 'col2'); //in application.js
		},
		success: function(data) {
		    $("#col2 #widget_"+myWidget_3['position']).append(data);
		},
		complete: function() {
		    end_loading('col2'); //in application.js
		}
	    });
	}    
    }

    if ($("#col2").length) {
	    if(myWidget_6['visibilty'] && myWidget_6['status'])
	    {
		$.ajax({
			url: 'glo/featured_posts',
			dataType: 'html',
			type: 'GET',
			beforeSend: function(){
				loading('featured_posts', 'Featured Posts', 'col2'); //in application.js
			},
			success: function(data){
				$("#col2 #widget_"+myWidget_6['position']).append(data);
			},
			complete: function(){
				end_loading('featured_posts'); //in application.js
			}
		});
	    }   	
	    if(myWidget_4['visibilty'] && myWidget_4['status'])
	    {	
		$.ajax({
			url: 'glo/popular_posts',
			dataType: 'html',
			type: 'GET',
			beforeSend: function(){
				loading('popular_posts', 'Popular Posts', 'col2'); //in application.js
			},
			success: function(data){
				$("#col2 #widget_"+myWidget_4['position']).append(data);
			},
			complete: function(){
				end_loading('popular_posts'); //in application.js
			}
		});
	    }	
	    if(myWidget_2['visibilty'] && myWidget_2['status'])
	    { 	
		$.ajax({
			url: '/media_items/recent_uploads',
			dataType: 'html',
			type: 'GET',
			beforeSend: function(){
				loading('recent_images', 'Recent images', 'col2'); //in application.js
			},
			success: function(data){
				$("#col2 #widget_"+myWidget_2['position']).append(data);
				enable_recent_uploads(); //in application.js
			},
			complete: function(){
				end_loading('recent_images'); //in application.js
			}
		});
	    }
	    if(myWidget_7['visibilty'] && myWidget_7['status'])
	    { 	
		$.ajax({
			url: '/glo/get_profile_completion',
			dataType: 'html',
			type: 'GET',
			beforeSend: function(){
				loading('profile_completion', 'Profile Completion', 'col2'); //in application.js
			},
			success: function(data){
				$("#col2 #widget_"+myWidget_7['position']).append(data);
				enable_recent_uploads(); //in application.js
			},
			complete: function(){
				end_loading('profile_completion'); //in application.js
			}
		});
	    }
	    
	    if(myWidget_8['visibilty'] && myWidget_8['status'])
	    { 	
		$.ajax({
			url: '/glo/get_recommend_users',
			dataType: 'html',
			type: 'GET',
			beforeSend: function(){
				loading('get_connect', 'People You May Know', 'col2'); //in application.js
			},
			success: function(data){
				$("#col2 #widget_"+myWidget_8['position']).append(data);
				enable_recent_uploads(); //in application.js
			},
			complete: function(){
				end_loading('get_connect'); //in application.js
			}
		});
	    }
	}

    if ($("#col1").length) {
//	$.ajax({
//            url: '/user/featured_feed',
//            dataType:'html',
//            type:'GET',
//            beforeSend: function() {
//                loading('featured_feeds', 'Featured feed', 'loding_content'); //in application.js
//            },
//            success: function(data) {
//                $("#col1").find("div#featured_feeds").append(data);
//            },
//            complete: function() {
//                end_loading('featured_feeds'); //in application.js
//            }
//        });
	
        //$.ajax({
        //    url: '/user/friends_feed',
        //    dataType:'html',
        //    type:'GET',
        //    beforeSend: function() {
        //        loading('friends_feed', 'Activity feed', 'loding_content'); //in application.js
        //    },
        //    success: function(data) {
        //        $("#col1").find("div#friends_feed").append(data);
        //    },
        //    complete: function() {
        //        end_loading('friends_feed'); //in application.js
        //    }
        //});
    }
    
    $('.dragbox') //Drag Drop Code
	$('.right_column').sortable({
	    connectWith: '.right_column',
	    handle: 'h2',
	    cursor: 'move',
	    placeholder: 'placeholder',
	    forcePlaceholderSize: true,
	    opacity: 0.4,
	    stop: function(event, ui){
		    $(ui.item).find('h2').click();
		    var sortorder='';
		    $('.right_column').each(function(){
			    var itemorder=$(this).sortable('toArray');
			    var columnId=$(this).attr('id');
			    sortorder+='widget='+itemorder.toString();
		    });
		    $('.dragbox').each(function(index){
			$(this).attr('id', 'widget_'+(index+1));
			//alert('Test');
		    });
		    //alert('SortOrder: '+sortorder);
		    /*Pass sortorder variable to server using ajax to save state*/
		    $.ajax({
			url: '/activity/update_widget_position',
			type:'GET',
			dataType: 'html',
			data: sortorder
		    });
	    }
	})
	.disableSelection();
	
	$.fn.colorbox.settings.initialWidth  = "494px"; //defining default colorbox width
	$.fn.colorbox.settings.initialHeight = "225px"; //defining default colorbox height
	$("a#show_widget_status").colorbox(); // calling for colorbox
	
	$("#collapse_expand").click(function(e){
	    if($("#collapse_expand").html() == 'Collapse All'){
		$("#collapse_expand").html('Expand All');
		$('.minimize').each(function(event){
		    $(this).removeClass('minimize');
		    $(this).addClass('maximize');
		    $(this).attr('title','Maximize');
		    $(this).html('Maximize');
		})    
	    }else {
		$("#collapse_expand").html('Collapse All')
		$('.maximize').each(function(event){
		    $(this).removeClass('maximize');
		    $(this).addClass('minimize');
		    $(this).attr('title','Minimize');
		    $(this).html('Minimize');	  
		})   
	    }
	    $('.widget_body_wrapper').each(function(event){
		if($("#collapse_expand").html() == 'Collapse All'){
		    $(this).show(500);
		}else{
		    $(this).hide(500);   
		}
	    })			    
	});
    
    
    $('a#view_more_link_activity_feed').bind('ajax:beforeSend', function() {
    	$(this).html("<img  src='/images/ajaxindicator.gif'>");
    });
});

    //It's a callback method when removing the widget from user Home Page interface
    function remove_widget(resp)
    {
      response = resp.split('&');
      if(response[0])
      {
		$("#"+response[1]).slideUp();	
      }
    }
    
    //code for showing loader when removing the widget
    function show_loader(id)
    {
      $("#"+id).parent().html("<span><img  src='/images/ajaxindicator.gif'></span>");	
      return true	
    }
    
    //Used for toggling the widget container
    function toggle_widget(link_id,widget_container)
    {
		if($('#'+widget_container).css('display') == 'none') {
		    $('#'+link_id).removeClass('maximize');
		    $('#'+link_id).addClass('minimize');
		    $('#'+link_id).attr('title','Minimize');
		    $('#'+link_id).html('Minimize');
		} 
		else {
		    $('#'+link_id).removeClass('minimize');
		    $('#'+link_id).addClass('maximize');
		    $('#'+link_id).attr('title','Maximize');
		    $('#'+link_id).html('Maximize');
		}
		$('#'+widget_container).toggle(500)
    }

