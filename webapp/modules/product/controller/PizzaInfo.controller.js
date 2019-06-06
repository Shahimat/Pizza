sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";
	return Controller.extend("productpath.controller.PizzaInfo", {

        onInit: function () {
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("currentPizza").attachPatternMatched(this.onPizzaDefined, this);

        },

		onPizzaDefined: function (oEvent) {
			let pizzaname = oEvent.getParameter("arguments").pizzaURLname;
			let oModel = this.getView().getModel("pizzadata");
			let nPizza = oModel.getProperty("/recipes").findIndex(function(item){
				return pizzaname == item.urlname;
			});
			if(nPizza == -1){
				sap.m.MessageToast.show("sorry, nPizza not defined");
				return false;
			}
			let oPage = this.getView().getContent()[0]; //как по нормальному?
			if(!oPage){
				sap.m.MessageToast.show("sorry, oPage not defined");
				return false;
			}

			oPage.setBindingContext(new sap.ui.model.Context(oModel, "/recipes/" + nPizza), "pizzadata");
		},

		onSIChange: function (oEvent) {
			this.getOwnerComponent().onCalculate();
		}

	});
});