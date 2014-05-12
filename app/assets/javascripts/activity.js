//setup show/hide for comment link button
$(document).ready(function() {
    //set up show/hide for Comment link
    //must use class selector in place of ID selector for this to work with IE7
    var widget_container = $("div.user_dashboard");


    $('#friends_feed').jscroll({
        loadingHtml: '<div class="widget_footer_left"><div class="widget_footer_right"><div class="feed_comment_see_all"><div id="activities_pagination" class="pagination"><img  src="/images/ajaxindicator.gif"/></div></div></div></div>',
        debug: true,
        nextSelector: '.jscroll-next-parent:last a',
        autoTrigger: true,
        padding : 0,
        callback: function(data){
            $('a.thumbnail').colorbox({
                maxHeight:"550px",
                onComplete:function() {
                    $('div#cboxTitle').addClass('wordwrap');
                },
                opacity:0.5
            });
        }
    });


    widget_container.find("a.comment_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).parent().parent().find("div#comments_form").toggleClass("hide");
        $(this).parent().parent().find("#reply_text").focus();
        e.stopPropagation();
        return false;
    });

    widget_container.find("a#feed_positive_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).parent().parent().find("div#comments_form").toggleClass("hide");
        $(this).parent().parent().find("#reply_text").focus();
        e.stopPropagation();
        return false;
    });
    
    widget_container.find("a#feed_positive_link_widget").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).parent().parent().find("div#comments_form").toggleClass("hide");
        $(this).parent().parent().find("#reply_text").focus();
        e.stopPropagation();
        return false;
    });
    
    widget_container.find("a#cancel_reply").live("click", function(e) {
        if(e.isPropagationStopped()) return;
    	
        $(this).parent().parent().find("div#comments_form").toggleClass("hide");
        return false;
    });

    widget_container.find("form#reply_form").live("submit", function(e) {
        if(e.isPropagationStopped()) return;
        $.post($(this).attr("action"), $(this).serialize(), null, "script");
        return false;
    });

    //var reply_text_area = widget_container.find("#reply_text");
    //empty on focus
    widget_container.find("#reply_text").live("focus", function(e) {
        if(e.isPropagationStopped()) return;
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
            //$(this).removeClass('feed_comment_text_box');
            $(this).removeClass('overlay_text');
        }
    });
    //write overlay text if post content is empty
    widget_container.find("#reply_text").live("blur", function(e) {
        if(e.isPropagationStopped()) return;
        if ($(this).val() == '') {
            $(this).val('Write your comment here');
            //$(this).removeClass('feed_comment_text_box');
            $(this).addClass('overlay_text');
        }
    });
    //clear overlay text on click
    widget_container.find("#reply_text").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
            $(this).removeClass('overlay_text');
        //$(this).addClass('feed_comment_text_box');
        }
    });

    widget_container.find("#reply_text").live("keyup keypress keydown", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).removeClass("overlay_text");
        updateTextCount($(this), $(this).parent().find("div.counter"));
    });

    widget_container.find("#reply_text").live("paste", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).removeClass("overlay_text");
        setTimeout(function() {
            updateTextCount($(this), $(this).parent().find("div.counter"));
        }, 100);
    });

    //set up click for posting a reply to an activity
    widget_container.find("a#post_reply").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        var reply_text = $(this).closest("form").find("#reply_text").val();
        if (($.trim(reply_text).length > 0) &&
            (reply_text != "Write your comment here")) {
            $(this).addClass("hide");
            //$(this).attr('disabled', 'disabled');
            $(this).closest("form").submit();
            return false;
        }
        
        e.stopPropagation();
    });

    //set up click for posting a reply to an activity
    widget_container.find("a.button_negative_small").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        if (!e) e = window.event;
        e.preventDefault();
        var reply_text = $(this).closest("form").find("#reply_text");
        reply_text.addClass("overlay_text");
        reply_text.val('Write your comment here');
        reply_text.addClass("overlay_text");
        $(this).closest("div#comments_form").toggleClass("hide");
        return false;
    });

    //set up pagination
    widget_container.find(".pagination a").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $("div#dropdown").hide();
        $("div#results").hide();
        $(this).parent().html("<img style='height: 10px;' src='/images/ajaxindicator-dark.gif' />");        
        $.get(this.href, null, null, "script");
        return false;
    });

    //set up view all replies
    widget_container.find(".view_all").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $("div.user_dashboard").find("div#" + this.id).find(".comment_container.hide").each(function() {
            $(this).toggleClass("hide");
        });
        $(this).parent().hide();
        $(this).parent().parent().parent().find("div#comments_form").toggleClass("hide");
        $(this).parent().parent().parent().find("#reply_text").focus();
        return;
    });

    widget_container.find(".reply_count").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).addClass("hide");
        $(this).closest(".widget_row.feed").find(".reply_users.hide").removeClass("hide");
    });

    //setup delete
    widget_container.find("a.delete_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).hide();
        $.post(this.href, authParams(), null, "script");
        return false;
    });

    //setup undo
    widget_container.find("a.undo_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).hide();
        $.post(this.href, authParams(), null, "script");
        return false;
    });
});
