/**
 * @author satyendra
 */
$(document).ready(function() {
    //    $('#date_of_joining').datepicker({nextText:'', prevText:'',
    //        dateFormat: 'yy-mm-dd',
    //        disabled: true,
    //        showOn: 'both',
    //        buttonImage: '/images/esn_Images/calendar-icon.gif',
    //        buttonImageOnly: true,
    //		changeMonth: true,
    //		changeYear: true,
    //        buttonText: 'Choose'});

    var d 	   = new Date();
    var curr_date  = d.getDate();
    var curr_month = d.getMonth();
    var curr_year  = d.getFullYear();
    $('#date').datepicker({
        nextText:'', 
        prevText:'',
        maxDate: new Date(curr_year,curr_month,curr_date),
        dateFormat: 'yy-mm',
        disabled: true,
        showOn: 'both',
        buttonImage: '/images/esn_Images/calendar-icon.gif',
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        buttonText: 'Choose'
    });
    
    $('#from_date').datepicker({
        nextText:'', 
        prevText:'',
        maxDate: new Date(curr_year,curr_month,curr_date),
        dateFormat: 'yy-mm',
        disabled: true,
        showOn: 'both',
        buttonImage: '/images/esn_Images/calendar-icon.gif',
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        buttonText: 'Choose'
    });
    
    $('#to_date').datepicker({
        nextText:'', 
        prevText:'',
        maxDate: new Date(curr_year,curr_month,curr_date),
        dateFormat: 'yy-mm',
        disabled: true,
        showOn: 'both',
        buttonImage: '/images/esn_Images/calendar-icon.gif',
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        buttonText: 'Choose'
    });
    
    $('#single').click(function(e){
        $('#single_date_pick').removeClass('hide');
        $('#single_date_pick').show(300);
        $('#range_date_pick').hide(300);
        $('#from_date').val('');
        $('#to_date').val('');
    });
    $('#range').click(function(e){
        $('#range_date_pick').show(300);
        $('#single_date_pick').hide(300);
        $('#date').val('');
    });
    $('#reset').click(function(e){
        $('#range_date_pick').show(300);
        $('#single_date_pick').hide(300);
        $('#range').attr('checked',true);
        $('#date').val('');
        $('#from_date').val('');
        $('#to_date').val('');
    });

    $('input#displayname').focus();
    
    $('div.autofill').hide();
    open_search_menu();
    set_form_url();
    set_message();
    $('div.search_result div.srch_row:odd').addClass('alternate');
    // live search
    //setUpLiveSearch();
    //$('input#search_category').val('Name');

    //setup click for advanced search link
    $('.adv_search').click(function(){
        if (validate_query()) jQuery("#live_search_form").submit();
        return false;
    });
});

function open_search_menu() {
    jQuery('input#search').focus();
    //$('div#dropdown').addClass('hide');
    jQuery('a.open_search_menu').click(function(e) {
        if (!e) e = window.event;
        e.preventDefault();
        jQuery('div#dropdown').slideToggle("fast");
        jQuery('a.unified_search_options').click(function(e){
            var el = jQuery(this);
            if (!e) e = window.event;
            e.preventDefault();
            jQuery('a.open_search_menu').html(el.html());
            jQuery('input#search_by').val(el.attr('object'));
            jQuery('input#search').val(el.attr('message'));
            jQuery('div#dropdown').hide();
            jQuery('#live_search_form').attr('action', el.attr('formurl'));
        });
		
    });
}

function show_category_type() {
//alert($('a.open_search_menu').attr('href')) ;
}

function show_results_div() {
    var results_count = jQuery('#search_results_count').val();
    jQuery('.search_container .autofill li:even').addClass('alt');    
    if (results_count > 1)
    {
        jQuery('div.autofill').show();
        jQuery('.search_container .autofill li').each(function() {
            if (jQuery(this).attr("url")) {
                jQuery(this).unbind('click').bind('click', function(e) {
                    if (!e) e = window.event;
                    e.preventDefault();
                    //var userid = jQuery(this).attr('id');
                    window.parent.location.href = jQuery(this).attr('url');
                    $('div.autofill').empty().hide();
                });
            }
        });
        var view_more_link = jQuery(".search_container").find("#view_search_results");
        if (view_more_link) {            
            $(view_more_link).bind("click", function() {
                $("#live_search_form").submit();
            });
        }
    }
    else
    {
        jQuery('div.autofill').empty().hide();
    }
}

function validate_query() {
    if (jQuery('input#search_by').val() != 'User') {
        var message = jQuery("a[object='" + jQuery('input#search_by').val() + "']").attr('message');
        if (jQuery.trim(jQuery('input#search').val()) == '' || jQuery('input#search').val() == message) {
            return false;
        }
    }
	
    return true;
}

function validate_organization(){
    if (jQuery('input#search_by').val() == 'Organization') {
        return false;
    }
    return true;
}

function set_form_url() {
    formurl = jQuery('a.unified_search_options[object='+ jQuery('input#search_by').val() +']').attr('formurl');
    jQuery('#live_search_form').attr('action', formurl);
}

function set_message() {
    message = jQuery('a.unified_search_options[object='+ jQuery('input#search_by').val() +']').attr('message');
    jQuery('input#search').val(message);
    jQuery('input#search').blur();
}
