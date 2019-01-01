(function($){
    "use strict";
    $.fn.ClickReOrder = function(options){
        var settings = $.extend({
            sort_content_selector:'.sort_content',
            sort_sequence_selector:'.sort_sequence',
            sort_submitBtn:'#sort_submitBtn'
        },options);
        var data = [];
        var count = 0;
        var ulID = $(this).attr('id');
        var ulClass = $(this).attr('class');
        if ((typeof ulID !== typeof undefined && ulID !== false) && (typeof ulClass !== typeof undefined && ulClass !== false)) {
            var ul = ulID;
        }else{
            var ul = (typeof ulID !== typeof undefined && ulID !== false) ? ulID : ulClass ;
        }

        $(document).on('click', '#'+ul+' li', function(){
            var id = $(this).attr('data-id');
            if($.inArray(id,data) != -1){
                count--;
                data.splice($.inArray(id,data),1);
                for (var i = 0; i < data.length; i++) {
                    $('li[data-id="'+data[i]+'"]',ul).children(settings.sort_content_selector).children(settings.sort_sequence_selector).text(i+1);
                    $('li[data-id="'+data[i]+'"]',ul).attr('data-sort',i);
                }
                $(this).children(settings.sort_content_selector).hide();
                $(this).children(settings.sort_content_selector).children(settings.sort_sequence_selector).text('');
                
                $(this).attr('data-sort','');
            }else{
                count++;
                data.push(id);
                $(this).children(settings.sort_content_selector).children(settings.sort_sequence_selector).text(count);
                $(this).children(settings.sort_content_selector).show();
                $(this).attr('data-sort',count);
            }
        });

        $(document).on('click',settings.sort_submitBtn,function(){
            $('li',ul).sort(function (a, b) {
                return parseInt($(a).data('sort')) > parseInt($(b).data('sort')) ? 1 : -1;
            }).each(function () {
                var element = $(this);
                element.remove();
                $(element).appendTo(ul);
            });
        });
    }
})(jQuery);
