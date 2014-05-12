$(document).ready(function() {
    var widget_images = $('#col2').find('#gallery');
    //setup image div pagination
    var images_footer = widget_images.closest(".widget_container").find(".small_pagination");
    $("div#media_container div.small_pagination a").live('click', function() {
        $("div#results").hide();
        $("div#dropdown").hide();
        $(this).parent().html("<img style='height: 10px;' src='/images/ajaxindicator-dark.gif' />"); 
        $.get($(this).attr('href'), null, function(){ enable_recent_uploads(); }, "script");
        return false;
    });
});