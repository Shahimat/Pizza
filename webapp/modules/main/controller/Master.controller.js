sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent'
], function(Controller, UIComponent) {
"use strict";

var CController = Controller.extend("app.modules.main.controller.Master", {


    onInit: function(){
    },


    getRouter : function () {
        return UIComponent.getRouterFor(this);
    },

    onPressGoToMaster : function() {
        this.getRouter().navTo("arrayPizza"); 
    },

    onBasket: function() {
        this.getRouter().navTo("basketPage");
    }

});


return CController;

});
