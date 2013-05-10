/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Lightbox
---------------------------------------------------------- */


/*
TODO : buttons close
TODO : class & zindex perso
TODO : small screens
TODO : Press echap : close lightbox

TODO : deduplicate ( if has class dkjsu, return false )
 */

/*
new dkJSULightbox({
    'triggers' : $$('.lightbox-me')
});
*/

var dkJSULightbox = new Class({
    initialize: function(opt) {
        this.opt = opt;
        if (!opt.triggers) {
            return;
        }
        this.createLightBox();
        this.setEvents();
    },
    createLightBox: function() {
        var mthis = this,
            opt = this.opt;
        this.lightbox = new Element('.lightbox');
        this.lightboxfilter = new Element('.lightbox-filter');
        this.lightbox.adopt(this.lightboxfilter);
        this.lightboxcontent = new Element('.lightbox-content');
        this.lightbox.adopt(this.lightboxcontent);
        this.closeLightbox();
        $(document.body).adopt(this.lightbox);
    },
    setEvents: function() {
        var mthis = this,
            opt = this.opt;

        // Click on trigger : Open Lightbox
        opt.triggers.addEvent('click', function(e) {
            e.preventDefault();
            mthis.openLink($(this));
        });
        // Click on filter : close lightbox
        this.lightboxfilter.addEvent('click', function(e) {
            mthis.closeLightbox();
        });
    },
    openLink: function(link) {
        this.openRelativeURL(link.href);
    },
    openRelativeURL: function(url) {
        var mthis = this;
        // Load content with AJAX
        var req = new Request({
            method: 'get',
            url: url,
            data: {
                'ajax': '1'
            },
            onComplete: function(response) {
                mthis.loadContentInLightbox(response, 'content');
                mthis.openLightbox();
            }
        }).send();
    },
    loadContentInLightbox: function(content, type) {
        this.lightbox.set('data-lb', type);
        this.lightboxcontent.set('html', content);
    },
    openLightbox: function() {
        this.lightbox.removeClass('lb-is-hidden');
    },
    closeLightbox: function() {
        this.lightbox.addClass('lb-is-hidden');
    }
});