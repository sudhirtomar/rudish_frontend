function update_chars_left(max_len, target_input, display_element) {
    var text_len = target_input.value.length;
    if (text_len >= max_len) {
	target_input.value = target_input.value.substring(0, max_len); // truncate
	display_element.html("0");
    } else {
	display_element.html(max_len - text_len);
    }
}

function authParams() {
    var params = {}
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');
    params[authParam] = authToken;
    return params;
}

function merge_options(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}
  
function loading_album(){
    $.colorbox({
        transition:'none',
        onComplete:function(){
            $('div#cboxClose').hide();
        },
        opacity:"0.25",
        width:false, 
        height:false,
        inline:true,
	border:false,
	overlayClose: false,
        href:"#loading_album_message"
    });
}
  
function loading_album_complete(){
    $.fn.colorbox.close();
}
function glo_popup(title, message)
{
    $.colorbox({
        transition:'none',
        close:'OK',
        opacity:0.3,
        html:'<h2>'+title+'</h2>'+message
    });
}

$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Accept", "text/javascript");
    },
    complete: function(xhr, textStatus){
        if(xhr.responseText.indexOf("The post to which you are trying to reply is deleted") > -1)
        {
            glo_popup('GLO Alert','<div id="error_message">'+xhr.responseText+'</div>');
        }
        else if(xhr.responseText.indexOf("This post has already been undeleted") > -1)
        {
            glo_popup('GLO Alert','<div id="error_message">'+xhr.responseText+'</div>');
        }
        else if(xhr.responseText.indexOf("You have already unfollowed") > -1)
        {
            glo_popup('GLO Alert','<div id="error_message">'+xhr.responseText+'</div>');
        }
        else if(xhr.responseText.indexOf("You are already following") > -1)
        {
            glo_popup('GLO Alert','<div id="error_message">'+xhr.responseText+'</div>');
        }
        else if(xhr.responseText.indexOf("This post has already been deleted") > -1)
        {
            glo_popup('GLO Alert','<div id="error_message">'+xhr.responseText+'</div>');
        }
        else if(xhr.responseText.indexOf("Something went wrong. Please try again.") > -1)
        {
            glo_popup('GLO Alert','<div id="error_message">'+xhr.responseText+'</div>');
        }
		
    },
    error: function(xhr, statusMessage, thrownError) {
        //do not display error if request is unsent(status code 0)
        if (xhr.status != 0) {
            //alert(xhr.statusText);
            //alert(statusMessage);
            //alert(xhr.responseText);
            if(xhr.responseText.indexOf("you are trying to reply on deleted post") > -1)
            {
                glo_popup('GLO Alert','<div id="error_message">you are trying to reply on deleted post</div>');
            }
            else if(xhr.responseText.indexOf("This post is not deleted") > -1)
            {
                glo_popup('GLO Alert','<div id="error_message">This post is not deleted</div>');
            }
            else if(xhr.responseText.indexOf("You have already unfollowed") > -1)
            {
                glo_popup('GLO Alert','<div id="error_message">You have already unfollowed this person</div>');
            }
            else if(xhr.responseText.indexOf("You are already following") > -1)
            {
                glo_popup('GLO Alert','<div id="error_message">You are already following this person</div>');
            }
            else if(xhr.responseText.indexOf("this post has already been deleted by you") > -1)
            {
                glo_popup('GLO Alert','<div id="error_message">this post has already been deleted by you</div>');
            }
            else
            {
        //glo_popup('GLO Application Error','<div id="error_message">An unexpected application error occurred.<br/>Please try again or contact support for help.</div>');
        }
        }
    }
});

$(document).mousedown(function(event){	
    var $target = jQuery(event.target);
    if(!$target.hasClass('holycow')) {
        $("div#dropdown").hide();
    }
});
	
$(document).ready(function() {    
    $("img").live("contextmenu", function(){
        return false;
    });
    $("div.pagination a").live("contextmenu", function(){
        return false;
    });
    $("a.view_all_comments_posts_section").live("contextmenu", function(){
        return false;
    });
    $("a.view_older_posts").live("contextmenu", function(){
        return false;
    });
    $("a.comment_link_in_post_section").live("contextmenu", function(){
        return false;
    });
    $("a.button_main_small").live("contextmenu", function(){
        return false;
    });
    $("a.button_negative_small").live("contextmenu", function(){
        return false;
    });
    $("a.editthumbnail").live("contextmenu", function(){
        return false;
    });
    $("a.link_to_followers_followings").live("contextmenu", function(){
        return false;
    });
    $("a.counts").live("contextmenu", function(){
        return false;
    });	
    $("div#awards_box a").live("contextmenu", function(){
        return false;
    });	
    $("a.delete_link_post_section").live("contextmenu", function(){
        return false;
    });
    $("a.undo_link").live("contextmenu", function(){
        return false;
    });
    $("a.delete_link").live("contextmenu", function(){
        return false;
    });
    $("a.comment_link").live("contextmenu", function(){
        return false;
    });
    $("a.comment_link_in_post_section").live("contextmenu", function(){
        return false;
    });
    $("a.positive_link").live("contextmenu", function(){
        return false;
    });
    $("a#submit_pref_form").live("contextmenu", function(){
        return false;
    });
    jQuery("a.join_comm_link").live("click", function(e) {
        $(this).html("<img style='height: 10px;' src='/images/ajaxindicator-dark.gif' />"); 
        return false;
    });
    //empty the teams filter input box on refresh
    $('input#search_name').val('Search team name');

    $('a#submit_advanced_search').click(function(e) {
        if (!e) e = window.event;
        e.preventDefault();
        if (ValidateAdvancedSearchForm()) {
            jQuery('form#advanced_search').submit();
        }
    });

    $('a#reset_advanced_search').click(function(e) {
        if (!e) e = window.event;
        e.preventDefault();
        jQuery('input.textbox').each(function() {
            $(this).val("");
        });
        jQuery('select#project_name').val("");
        jQuery('select#band').val("");
    });

    //set up status update form submit
    $("#status_update_form").unbind("submit").bind("submit", function() {
        var update_text = $(".update_text_box").val();
        if ($.trim(update_text).length > 0) {
            $(".update_text_box").attr('rows', 1);
            //calls back setupFriendsFeedActions in activity.js after form post
            $.post($(this).attr("action"), $(this).serialize(), statusUpdateCallback, "script");
        }
        return false;
    });

    //update counter on keypress
    $(".update_text_box").unbind("keyup keypress keydown").bind("keyup keypress keydown", function() {
        updateTextCount($(this), $(".counter_text"));
    });

    $(".update_text_box").bind("paste", function() {
        setTimeout(function() {
            updateTextCount($("textarea.update_text_box"), $(".counter_text"));
        }, 100);
    });

    bindStatusUpdateClick();

    $("a#submit_edit_form").unbind("click").bind("click", function(e) {
        if (!e) e = window.event;
        e.preventDefault();
    //$("#edit_profile").submit();
    });
	
    $("a#submit_pref_form").unbind("click").bind("click", function(e) {
        if (!e) e = window.event;
        e.preventDefault();
        $('.child').each(function(){
            $(this).attr('disabled',false);
        });
        $("#edit_preferences").submit();
    });

    $('a.comment_link_for_document').live("click", function(e) {
        if (!e) e = window.event;
        e.preventDefault();
        activity_id = $(this).attr('id');
        $('div#document_comment_write_section_' + activity_id).toggleClass("hide");
        var reply_text_area = $('textarea#reply_text_posts_section_' + activity_id)
        reply_text_area.focus();
        var counter = $('div#counter_' + activity_id);
        reply_text_area.unbind("keyup keypress keydown").bind("keyup keypress keydown", function() {
            reply_text_area.removeClass("overlay_text");
            updateTextCount(reply_text_area, counter);
        });
        reply_text_area.bind("paste", function() {
            $(this).removeClass("overlay_text");
            setTimeout(function() {
                updateTextCount(reply_text_area, counter);
            }, 100);
        });
        reply_text_area.unbind("blur").bind("blur", function() {
            if($.trim($(this).val())==""){
                $(this).val('Write your comment here');
                $(this).addClass("overlay_text");
            }

        });
    });
    
    $('a#button_main_small_document_reply').live("click", function(e) {
        activity_id = $(this).attr('name');
        e.preventDefault();
        
        if (($('textarea#reply_text_posts_section_' + activity_id).val() != 'Write your comment here') &&
            ($.trim($('textarea#reply_text_posts_section_' + activity_id).val()) != ''))
            {
            $(this).addClass('hide');
            $.post($('form#reply_form_posts_section_' + activity_id).attr("action"), $('form#reply_form_posts_section_' + activity_id).serialize(), null, "script");
        //reload_posts_after_reply(activity_id, user_id);
        }
        return false;
    });
    
    jQuery(".all_community").click(function(e) {
        jQuery('.com_small').hide();
        jQuery('.com_large').show();
        jQuery('div.lfcom_footer').hide();    
    });

    if(jQuery('#search').length > 0) {
        //Search field delayed observer
        jQuery('#search').delayedObserver(function() {
            var el = $(this);
            var length_limit;

            if(jQuery("#search_by").attr('value') == 'Skill'){
                length_limit = 2;
            }else{
                length_limit = 3;
            }
            
            if(el.val().length < length_limit) {
                jQuery('div#results').addClass('hide');
                return false;
            } 
            else {
                jQuery('div#results').removeClass('hide');
            }; 
			
            jQuery.ajax({
                beforeSend:function(request){
                    if(jQuery.trim(el.val()) == '') {
                        return false;
                    } 
		    jQuery('#results').html('<div style="height: 20px; padding-left: 5px; padding-top: 5px;"><img alt="Ajaxindicator" src="/images/ajaxindicator.gif?1327398438" tite="Ajaxindicator" /></div>').show();
                }, 
                complete:function(request){
                    show_results_div()
                }, 
                data:'query=' + encodeURIComponent(el.val()) + '&class=' + jQuery('input#search_by').val(),
                success:function(request){
                    jQuery('#results').html(request);
                }, 
                type:'get', 
                url:'/search/live_search'
            })
        });
    }
});


function start_following(uid, current)
{
    $.ajax({
        url: jQuery('a#utip_follow_link_'+uid).attr('url'),
        dataType: 'js',
        type: 'GET',
        beforeSend: function(){
            jQuery(current).html('Following...');
            //jQuery('a#utip_follow_link_'+uid).html("Following...");
            user_json_data[uid].follow = 'hide';
        },
        complete: function(data){
            jQuery(current).addClass('hide') // for IE7
            jQuery('a#utip_follow_link_'+uid).addClass('hide');
        }   
    });
}

//set up click for status update link button
function bindStatusUpdateClick() {
    $("#update_status_message").unbind("click").bind("click", function(e) {
        var status_text = $(".update_text_box").val();
        if (($.trim(status_text).length > 0) && (status_text != "What are you doing?")) {
            if (!e) e = window.event;
            e.preventDefault();
            $(this).unbind("click");
            $("#status_update_form").submit();
            $(".update_text_box").height('23px');
        }
    });
}

function statusUpdateCallback() {
    //setupFriendsFeedActions();
    bindStatusUpdateClick();
}

function updateTextCount(textbox, counter_div){
    //var y = $(textbox).val().length;    
    var y = textbox.val().length;
    if (y > 500) {// if too long...trim it!
        //$(textbox).val($(textbox).val().substring(0, 200));
        textbox.val(textbox.val().substring(0, 500));
    }
    if (500 - y < 0) {
        //$(counter_div).html("0 characters left");
        counter_div.html("0 characters left");
    }
    else {
        //$(counter_div).html(200 - y + " characters left");
        counter_div.html(500 - y + " characters left");
    }
}

function ValidateAdvancedSearchForm() {
    var bool = false;

    $('input.textbox').each(function() {
        if ($.trim($(this).val()) != "") {
            bool = true;
        }
    });

    if ($('select#project_name').val() != "")
    {
        bool = true
    }
    if ($('select#band').val() != "")
    {
        bool = true
    }

    if (!bool)
    {
        $('div.warning').html("All fields can't be blank.");
        $('div.warning').removeClass('hide');
        $('input.textbox:first').focus();
    }
    return bool;
}


function loading(id, text, elem){
    var indicator = $('#loading').clone();
    indicator.append('Loading <b>' + text + '...</b>');
    indicator.removeClass("hide");
    $('#' + elem).prepend(indicator);
    indicator.attr("id", 'loading_' + id);
}

function end_loading(id){
    var indicator = $('#loading_' + id);
    indicator.remove();
}

function enable_recent_uploads(){
    $('a.thumbnail').colorbox({
        maxHeight:"550px",
        onComplete:function() {
            $('div#cboxTitle').addClass('wordwrap');
        },
        opacity:0.5,
        title: function() {
            var url = $(this).attr('href');
            var image_title = $(this).attr('image_title');
            var system_image = $(this).attr('system_image');
            var image_title_limit = $(this).attr('image_title_limit');
            var user_name = $(this).attr('user_name');
            var upload_time = $(this).attr('upload_time');
            var uid = $(this).attr('userid');

            var title_str = '';
            if (system_image == '1')
                title_str = '<a href="/user/show/' + uid + '?tab=pictures"> ' + user_name + ' </a><br/>Uploaded ' + upload_time;
            else
            {
                if (image_title == 'Untitled') {
                    title_str = 'Uploaded by <a href="/user/show/' + uid + '?tab=pictures"> ' + user_name + ' </a> ' + upload_time;
                }
                else if(image_title == 'Post Attachment') {
                    title_str = 'Uploaded by <a href="/user/show/' + uid + '?tab=posts"> ' + user_name + ' </a></b> ' + upload_time;
                }
                else {
                    title_str = '"' + image_title + '"<br/>Uploaded by <a href="/user/show/' + uid + '?tab=pictures"> ' + user_name + ' </a></b> ' + upload_time;
                }
            }

            return title_str;
        }
    });
    return false;
}

function initialize_utip()
{
    //$('.utip').bind('mouseover', function() {
    jQuery('.utip').each(function(){
        var uid = jQuery(this).attr('uid');
        if(!$(this).data('qtip') ) {
            jQuery(this).qtip({
                content:  jQuery("#utip_popup"),
                position: {
                    adjust:{
                        y : 5	  
                    },
                    corner: {
                        target: 'topMiddle',
                        tooltip: 'bottomMiddle'
                    }
                },
                show: {
                    //solo: true,
                    when: "mouseover", // Don't specify a show event
                    ready: false // Show the tooltip when ready
                },
                hide: {
                    fixed: true,
                    when: {
                        event: 'mouseleave'
                    }
                }, // Don't specify a hide event
         
                api: {
                    beforeContentUpdate: function(content) {
                        content.find('.utip_user_linking').each(function(){
                            jQuery(this).attr('href',user_json_data[uid].profile)
                        });
                
                        content.find('#utip_displayname').html(user_json_data[uid].displayname); 
                        content.find('#utip_user_image').attr('src',user_json_data[uid].pic);
                        content.find('#utip_designation').html(user_json_data[uid].designation);
                        content.find('#utip_phone').html(user_json_data[uid].phone);
                        content.find('#utip_email').html(user_json_data[uid].email);
                        content.find('#add_follow_link').html('');
                        if(user_json_data[uid].follow == 'show'){
                            url  = '/user/follow_user_from_feed/'+uid+'?from_page=utip'
                            follow_link_id = 'utip_follow_link_'+uid
                            html = '<a href="javascript:void(0);" class="down_link down_pad down_sep" uid= "'+uid+'" id="'+follow_link_id+'" url="'+url+'" onclick="start_following('+uid+',this)">Follow</a>'
                            content.find('#add_follow_link').html(html); 
                        }    
                        return content;
                    },
                    beforeShow: function() {
                        jQuery('.qtip:visible').not(this.elements.tooltip).qtip('hide');
                    },
                    beforeHide: function() {
                        jQuery('.qtip:visible').not(this.elements.tooltip).qtip('enable');
                    }
                },  
                style: {
                    background: 'none',
                    color: '#ffffff',
                    border: { 
                        width:0,
                        radius:0,
                        color: '#000'
                    },
                    padding: '0px 0px 15px 0px', 
                    textAlign: 'left',
                    tip: false // Give it a speech bubble tip with automatic corner detection
                //name: 'black' // Style it according to the preset 'cream' style
                }
            });
        } 
    });
//});
      
}



function initialize_qtip_of_post(popup_id)
{
    jQuery(document).ready(function(){
        //jQuery("div#my_post_title_"+popup_id).qtip("destroy").remove(); // Destroys the tooltip
        if (jQuery("div#my_post_popup_"+popup_id).length <= 1){
            display_popup = jQuery("div#my_post_popup_"+popup_id)
        }else {
            display_popup = jQuery("div#my_post_popup_"+popup_id).first();
        }
        if(!$("div#my_post_title_"+popup_id).data('qtip') ) {
            jQuery("a#my_post_title_"+popup_id).qtip({
                content:  display_popup,
                show: {
                    when: "mouseover", // Don't specify a show event
                    ready: false, // Show the tooltip when ready
                    effect: {
                        type: 'grow', 
                        length: 500
                    },
                    solo: true
                },
                hide: {
                    when: 'inactive', 
                    delay: 10
                },
                position: {
                    target: 'mouse',
                    adjust: {
                        mouse: true,
                        x: 13,
                        y: 0 
                    }
                },
                hide: {
                    fixed: true, 
                    delay: 0
                }, // Don't specify a hide event
                style: {
                    width: 310 ,
                    background: 'none',
                    color: '#ffffff',
                    border: { 
                        width:0,
                        radius:0,
                        color: '#000'
                    },
                    padding: '0px 0px 15px 0px', 
                    textAlign: 'left',
                    tip: false // Give it a speech bubble tip with automatic corner detection
                //name: 'black' // Style it according to the preset 'cream' style
                }
            });
        }
    });
}


function initialize_drag_drop_my_communities(){
    $('.column').sortable({
        connectWith: '.column',
        handle: 'h2',
        cursor: 'move',
        placeholder: 'placeholder',
        forcePlaceholderSize: true,
        opacity: 0.4,
        stop: function(event, ui){
            $(ui.item).find('h2').click();
            var sortorder='';
            var authenticity_token = authParams();
            $('.column').each(function(){
                var itemorder=$(this).sortable('toArray');
                var columnId=$(this).attr('id');
                sortorder+=columnId+'='+itemorder.toString()+'&';
            });
            /*Pass sortorder variable to server using ajax to save state*/
            $.ajax({
                url: '/my_communities/update_community_box_position?'+sortorder,
                type:'POST',
                dataType: 'html',
                data: authenticity_token
            });
        }
    });
}

