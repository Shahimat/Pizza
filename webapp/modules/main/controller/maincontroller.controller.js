sap.ui.define([
    //Не забудь, что все должно быть по порядку!!! в функции Controller.extend по порядку объявляешь то, к чему цепляешься здесь!!!
    //уе*ок работать из-за этого не будет, будь внимательней
    'sap/m/MessageToast',           // 1 MessageToast
    'sap/ui/core/mvc/Controller',   // 2 Controller
    'sap/base/Log'                  // 3 Log
], function(MessageToast, Controller, Log) {
"use strict";

var CController = Controller.extend("app.modules.main.controller.maincontroller", {


    onInit: function(){
        this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
    }

});


return CController;

});
