/**
 * Created by SpectrumGroupe on 15/02/2017.
 */
;(function ($) {

    let defaults = {
        question: "which is favourite javascript library",
        url: "",
        buttonText: "answer!",
        categories: ["jQuery", "YUI", "dojo", "ExtJs", "Zepto"]
    };

    function Nupoll(element, options) {
        this.config = $.extend({}, defaults, options);
        this.element = element;
        this.init();
    }

    Nupoll.prototype.init = function () {

        $("<h3/>", {
            text: this.config.question
        }).appendTo(this.element);

        let form = $("<form/>").appendTo(this.element);
        let x, y;
        for (x = 0 , y = this.config.categories.length; x < y; x++) {
            $("<input/>", {
                type: "radio",
                name: "categories",
                id: this.config.categories[x],
                value: this.config.categories[x]
            }).appendTo(form);

            $("<label/>", {
                text: this.config.categories[x],
                "for": this.config.categories[x]
            }).appendTo(form);
            $("<br/>").appendTo(form);
        }
        $("<br/>").appendTo(form);
        $("<button/>", {
            text: this.config.buttonText
        }).appendTo(form);
    };
    $.fn.nupoll = function (options) {
        new Nupoll(this.first(),options);
        return this.first();
    };
}(jQuery));