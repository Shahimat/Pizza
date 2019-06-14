sap.ui.define([
    //Не забудь, что все должно быть по порядку!!! в функции Controller.extend по порядку объявляешь то, к чему цепляешься здесь!!!
    //уе*ок работать из-за этого не будет, будь внимательней
    'sap/m/MessageToast',           // 1 MessageToast
    'sap/ui/core/mvc/Controller',   // 2 Controller
    'sap/base/Log',                  // 3 Log
    'mainpath/model/DataLogic'
], function(MessageToast, Controller, Log, DataLogic) {
"use strict";

var CController = Controller.extend("app.modules.main.controller.Main", {

    onInit: function(){
        this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        DataLogic.prototype.constructor( this.getView().getModel("pizzadata") );

        // debugger;
        this.getOwnerComponent()._oSplitApp = this.byId("CustomSplitApp");
    }
    

});


return CController;

});
