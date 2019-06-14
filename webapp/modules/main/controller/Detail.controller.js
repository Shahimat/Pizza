sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";
	return Controller.extend("mainpath.controller.Detail", {
        
        onInit: function () {

		},

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		pressNavBtn: function () {
			this.getRouter().navTo("startPages");
		},

		onBasket: function() {
			this.getRouter().navTo("basketPage");
		}
		
	});
});