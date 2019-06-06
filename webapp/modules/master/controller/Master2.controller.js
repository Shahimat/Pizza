sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent'
], function(Controller, UIComponent) {
"use strict";

var CController = Controller.extend("masterpath.controller.Master2", {


    onInit: function(){

    },

    getRouter : function () {
        return UIComponent.getRouterFor(this);
    },

    onPressMasterBack : function() {
        this.getRouter().navTo("startPages");
    },

    onBasket: function() {
        this.getRouter().navTo("basketPage");
    },

    onListItemPress : function(oEvent) {

        let urlname = oEvent.getParameter("listItem").getBindingContext("pizzadata").getObject().urlname;
        this.getRouter().navTo("currentPizza", {pizzaURLname: urlname});
    }
    
});


return CController;

});
