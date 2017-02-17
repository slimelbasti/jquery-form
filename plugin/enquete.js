/**
 * Created by SpectrumGroupe on 15/02/2017.
 */
;(function ($) {

    let defaults = {
        question: "quel est votre operateur telephonique preferer",
        url: "",
        buttonText: "envoyer",
        categories: ["tunisie telecom", "ooredoo", "orange", "ellisa"]
    };
    /*constructeur*/
    function Enquete(element, options) {
        this.config = $.extend({}, defaults, options);
        this.element = element;
        this.init();
    }

    Enquete.prototype.init = function () {
        $("<h3/>", {
            text: this.config.question
        }).appendTo(this.element);
        $("<br/>").appendTo(this.element);
        let form = $("<form/>").appendTo(this.element);
        let x,y;
        for (x=0,y=this.config.categories.length;x<y;x++){
            $("<input/>",{
                type:"radio",
                name:"categories",
                id:this.config.categories[x],
                value:this.config.categories[x]
            }).appendTo(form);
            $("<label/>",{
                text:this.config.categories[x],
                "for":this.config.categories[x]
            }).appendTo(form);
            $("<br/>").appendTo(form);
        }
        $("<button/>",{
            type:"submit",
            text:this.config.buttonText
        }).appendTo(form);
    };
    $.fn.enquetes=function(options){
      new Enquete(this.first(),options);
      return this.first();
    };

}(jQuery));




