//setup show/hide for comment link button
$(document).ready(function() {
    var bday_container = $("div#col1").find("#birthdays");
    
    //set up show/hide for Comment link
    bday_container.find(".positive_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).closest(".text_cont_feed").find("div#comments_form").toggleClass("hide");
        return false;
    });

    bday_container.find("form#reply_form").live("submit", function(e) {
        if(e.isPropagationStopped()) return;
        $.post($(this).attr("action"), $(this).serialize(), null, "script");
        $(this).removeClass("hide");
        return false;
    });

    var reply_text_area = bday_container.find("#reply_text");
    //empty on focus
    bday_container.find("#reply_text").live("focus", function(e) {
        if(e.isPropagationStopped()) return;
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
            $(this).removeClass('overlay_text');
        }
    });
    //write overlay text if post content is empty
    reply_text_area.live("blur", function(e) {
        if(e.isPropagationStopped()) return;
        if ($(this).val() == '') {
            $(this).val('Write your comment here');
            $(this).addClass('overlay_text');
        }
    });
    //clear overlay text on click
    bday_container.find("#reply_text").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
            $(this).removeClass('overlay_text');
        }
    });

    var counter = $(this).find(".counter");
    reply_text_area.live("keyup keypress keydown", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).removeClass("overlay_text");
        updateTextCount($(this), $(this).parent().find("div.counter"));
    });

    $("#reply_text", bday_container).live("paste", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).removeClass("overlay_text");        
        setTimeout(function() {            
            updateTextCount($(this), $(this).parent().find("div.counter"));
        }, 100);        
    });

    //set up click for posting a reply to an activity
    bday_container.find("a#post_reply").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        var reply_text = $(this).closest("form").find("#reply_text").val();
        if (($.trim(reply_text).length > 0) &&
            (reply_text != "Write your comment here")) {
            $(this).addClass("hide");
            $(this).closest("form").submit();
            return false;
        }
    });

    //set up click for posting a reply to an activity
    bday_container.find("a.button_negative_small").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).closest("div#comments_form").toggleClass("hide");
        var reply_text = $(this).closest("form").find("#reply_text");
        reply_text.addClass("overlay_text");
        reply_text.val('Write your comment here');
        return false;
    });

    //set up pagination
    var bday_footer = bday_container.closest(".widget_container").find("#bday_pagination");
    bday_footer.find("a").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $("div#dropdown").hide();
        $("div#results").hide();
        $(this).parent().html("<img style='height: 10px;' src='/images/ajaxindicator-dark.gif' />");        
        $.get($(this).attr("href"), null, null, "script");
        return false;
    });

    //set up view all replies
    bday_container.find(".view_all").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).css("cursor", "default");
        $("div#col1").find("#birthdays").find("div#" + this.id).find(".feed_comment_section.hide").each(function() {
            $(this).toggleClass("hide");
        });
        $(this).hide();
    });

    bday_container.find(".reply_count").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $(this).addClass("hide");
        $(this).closest(".widget_row.feed").find(".reply_users.hide").removeClass("hide");
    });

    //setup delete
    bday_container.find("a.delete_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $.post(this.href, null, null, "script");
        return false;
    });

    //setup undo
    bday_container.find("a.undo_link").live("click", function(e) {
        if(e.isPropagationStopped()) return;
        $.post(this.href, null, null, "script");
        return false;
    });
});