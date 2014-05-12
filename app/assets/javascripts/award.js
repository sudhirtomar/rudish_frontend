//setup show/hide for comment link button
$(document).ready(function() {
    //set up show/hide for Comment link
    //must use class selector in place of ID selector for this to work with IE7
    //var widget_container = $("div.widget_header_left.reward").parent();
    var widget_awards = $("div#col2").find("#awards");

    widget_awards.find("a.positive_link").live("click", function(e) {
    	if(e.isPropagationStopped()) return;
        $(this).parent().parent().find("div#comments_form").toggleClass("hide");
        return false;
    });
    
    widget_awards.find("a#cancel_reply").live("click", function(e) {
    	if(e.isPropagationStopped()) return;
        $(this).parent().parent().find("div#comments_form").toggleClass("hide");
        return false;
    });

    widget_awards.find("form#reply_form").live("submit", function(e) {
    	if(e.isPropagationStopped()) return;
        $.post($(this).attr("action"), $(this).serialize(), null, "script");
        $(this).removeClass("hide");
        return false;
    });

    var reply_text_area = widget_awards.find("#reply_text");
    //empty on focus
    reply_text_area.live("focus", function() {
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
            //$(this).removeClass('feed_comment_text_box');
            $(this).removeClass('overlay_text');
        }
    });

    //write overlay text if post content is empty
    reply_text_area.live("blur", function(e) {
	if(e.isPropagationStopped()) return;
        if ($(this).val() == '') {
            $(this).val('Write your comment here');
            //$(this).removeClass('feed_comment_text_box');
            $(this).addClass('overlay_text');
        }
    });

    //clear overlay text on click
    reply_text_area.live("click", function(e) {
	if(e.isPropagationStopped()) return;
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
            $(this).removeClass('overlay_text');
            //$(this).addClass('feed_comment_text_box');
        }
    });

    var counter = $(this).find(".counter");
    reply_text_area.live("keyup keypress keydown", function() {
        $(this).removeClass("overlay_text");
        updateTextCount($(this), $(this).parent().find("div.counter"));
    });

    reply_text_area.bind("paste", function(e) {
	if(e.isPropagationStopped()) return;
        $(this).removeClass("overlay_text");
        setTimeout(function() {
            updateTextCount($(reply_text_area), $(counter));
        }, 100);
    });

    //set up click for posting a reply to an activity
    widget_awards.find("a#post_reply").live("click", function(e) {
    	if(e.isPropagationStopped()) return;
    	
        var reply_text = $(this).closest("form").find("#reply_text").val();
        if (($.trim(reply_text).length > 0) &&
            (reply_text != "Write your comment here")) {
            $(this).addClass("hide");
            //$(this).attr('disabled', 'disabled');
            $(this).closest("form").submit();
            return false;
        }
    });

    //set up click for posting a reply to an activity
    widget_awards.find("a.button_negative_small").live("click", function(e) {
    	if(e.isPropagationStopped()) return;
    	
        $(this).closest("div#comments_form").toggleClass("hide");
        var reply_text = $(this).closest("form").find("#reply_text");
        reply_text.addClass("overlay_text");
        reply_text.val('Write your comment here');
        return false;
    });

    //set up pagination
    //var widget_footer = widget_awards.find(".pagination");
    var awards_footer = widget_awards.closest(".widget_container").find("#awards_pagination");    
    //browser hack for IE7
    /*
    if ($.browser.msie && ($.browser.version == "7.0")) {
        //alert(widget_awards.closest(".widget_awards").find(".widget_footer_left").html());
        widget_footer = widget_awards.closest(".widget_awards").find(".widget_footer_left").find(".pagination");
    }
    */
    //set up pagination    
    $(awards_footer).find("a").live("click", function(e) {
	if(e.isPropagationStopped()) return;
        $("div#dropdown").hide();
        $("div#results").hide();
        $(this).parent().html("<img style='height: 10px;' src='/images/ajaxindicator-dark.gif' />");        
        $.get($(this).attr("href"), null, null, "script");
        return false;
    });

    //set up view all replies    
    widget_awards.find(".view_all").live("click", function(e) {
	if(e.isPropagationStopped()) return;
        $(this).css("cursor", "default");
        $("div#col1").find("#awards").find("div#" + this.id).find(".feed_comment_section.hide").each(function() {
            $(this).toggleClass("hide");
        });
        $(this).hide();
    });

    widget_awards.find(".reply_count").live("click", function(e) {
	if(e.isPropagationStopped()) return;
        $(this).addClass("hide");
        $(this).closest(".widget_row.feed").find(".reply_users.hide").removeClass("hide");
    });

    //setup delete
    widget_awards.find("a.delete_link").live("click", function(e) {
	if(e.isPropagationStopped()) return;
        $.post(this.href, null, null, "script");
        return false;
    });

    //setup undo
    widget_awards.find("a.undo_link").live("click", function(e) {
	if(e.isPropagationStopped()) return;
        $.post(this.href, null, null, "script");
        return false;
    });
});