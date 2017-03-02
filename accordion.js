var whichTransitionEvent = function() {
            var el = document.createElement('fake'),
                transEndEventNames = {
                    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
                    'MozTransition'    : 'transitionend',      // only for FF < 15
                    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
                };

            for(var t in transEndEventNames){
                if( el.style[t] !== undefined ){
                    return transEndEventNames[t];
                }
            }
        }

        var accordionLab = function(stuff) {
            var trigger = '[data-accordion="trigger"]',
                content = '[data-accordion="content"]',
                wrapper = '[data-accordion="wrapper"]',
                transitionClass = 'mw-transitioning',
                transEndEventName = whichTransitionEvent();

            $('body').find(trigger).before('<div class="mw-accordion-wrapper" data-accordion="wrapper"></div>');
            $('body').find('.mw-accordion-wrapper').each(function(){
                $(this).prepend($(this).siblings(content));
                $(this).prepend($(this).next(trigger));
            });

            $(trigger).on('click', function() {
                var accordionOpen = $(this).parent().attr('data-accordion-open');
                if (!accordionOpen || accordionOpen === false) {
                    $(this).parent().attr('data-accordion-open', 'true');
                }
                if (accordionOpen === true) {
                    $(this).parent(wrapper).addClass(transitionClass);
                    $(content).one(transEndEventName, function() {
                        $(this).parent(wrapper).removeClass(transitionClass);
                        $(this).parent().attr('data-accordion-open', 'false');
                    });
                }
            });
        }
