$(document).ready(function() {
  
    var widget_awards = $("div#awards_full_page");//.find(".post_action");

    widget_awards.find("a.positive_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).parent().parent().find("div#comments_form").toggleClass("hide");
        return false;
    });
    
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
    
    widget_awards.find(".view_all").live("click", function(e) {
	if(e.isPropagationStopped()) return;
        $(this).css("cursor", "default");
        widget_awards.find("#replies_"+this.id).find(".feed_comment_section.hide").each(function() {
            $(this).toggleClass("hide");
        });
        $(this).hide();
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
});