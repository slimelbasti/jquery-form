/**
 * Created by SpectrumGroupe on 16/02/2017.
 */
;(function ($) {

    /*declaration*/

    let defaults = {
        buttonText: "envoyer",
        ajaxOption: {
            url: "",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        },
        categories: ["renault", "citroen", "audi", "peugeot", "ferrari"],

        question: ["quel est votre meilleur voiture"],
        containerClass: "plugin",
        formClass: "enquete-form",
        buttonClass: "enquete-submit",
        errorMessage: "thanks for your vote,unfortunately there has been an error ans the pull cannot be shown." +
        "please contact the owner of the site or try again later ",
        errorClass:"enquete-error-message",
        created: function () {
        }
    };

    /*constructeur*/

    function Enquete(element, options) {
        let widget = this;
        widget.config = $.extend({}, defaults, options);
        widget.element = element;

//submit

        widget.element.on("submit", function (e) {
            e.preventDefault();
            widget.element.trigger("beforeresponse.enquete");
            let dataObj = {
                    data: JSON.stringify({selected: widget.element.find(":checked").val()})
                },
                ajaxSettings = $.extend(true,{},widget.config.ajaxOptions,dataObj);
                $.ajax(ajaxSettings).done(function (data) {
                widget.element.trigger("afterresponce.enquete");
                widget.buildChart(data);
                widget.labels = widget.element.find("label");
                widget.element.width(widget.element.width()).height(widget.element.height()).find("form").remove();
            }).fail(function () {
                let returnVal = widget.element.triggerHandler("responseError.enquete");
                if(returnVal !==false){
                }
                widget.element.append($("<p/>",{
                text: widget.config.errorMessage,
                    "class":widget.config.error
                }));
            });
        });

        //disable button

        widget.element.one("change", function (e) {
            widget.element.find("button").prop('disabled', false)
        });

//event api

        $.each(widget.config, function (key, val) {
            if (typeof val === "function") {
                widget.element.on(key + ".enquete", function () {
                    val(widget.element);
                });
            }
        });
        this.init();
    }

    /*prototype*/

    Enquete.prototype.init = function () {
        this.element.addClass(this.config.containerClass);
        $("<h3/>", {
            text: this.config.question
        }).appendTo(this.element);
        $("<br/>").appendTo(this.element);
        let form = $("<form/>").addClass(this.config.formClass).appendTo(this.element).on("submit", function (e) {
            e.preventDefault();
            console.log("submit");
        });
        let x, y;
        for (x = 0; y = this.config.categories.length, x < y; x++) {
            $("<input/>", {
                type: "radio",
                name: "categories",
                id: this.config.categories[x],
                value: this.config.categories[x],
            }).appendTo(form);
            $("<label/>", {
                for: this.config.categories[x],
                text: this.config.categories[x]
            }).appendTo(form);
            $("<br>").appendTo(form);
        }
        $("<button/>", {
            type: "submit",
            "class": this.config.buttonClass,
            text: this.config.buttonText,
            disabled: "disabled"
        }).appendTo(form);
        this.element.trigger("created.enquete");
    };

    /*return*/
    Enquete.prototype.buildChart(data){
        let list = $("<dl/>"),
            def =$("<dd/>"),
            term = $("<dt/>"),
            span =$("<span/>");
    }
    $.fn.enquetes = function (options) {
        new Enquete(this.first(), options);
        return this.first();
    };
}(jQuery));


