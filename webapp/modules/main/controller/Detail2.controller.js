sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";
	return Controller.extend("app.modules.main.controller.Detail2", {

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

		onQuantityDown: function(oEvent){
			let urlname = window.location.hash.split("/").reverse()[0];
			let oModel = this.getView().getModel("pizzadata");
			let nPizza = oModel.getProperty("/recipes").findIndex(function(item){
				return urlname == item.urlname;
			});
			let q = oModel.getProperty("/recipes")[nPizza].quantity;
			if(q > 0) q--;
			oModel.setProperty("/recipes/" + nPizza + '/quantity', q);
			this.getOwnerComponent().onCalculate();
		},

		onQuantityUp: function(oEvent){
			let urlname = window.location.hash.split("/").reverse()[0];
			let oModel = this.getView().getModel("pizzadata");
			let nPizza = oModel.getProperty("/recipes").findIndex(function(item){
				return urlname == item.urlname;
			});
			let q = oModel.getProperty("/recipes")[nPizza].quantity;
			if(q < 9) q++;
			oModel.setProperty("/recipes/" + nPizza + '/quantity', q);
			this.getOwnerComponent().onCalculate();
		},

		onValidatePizzaQuantity: function(oEvent){
			let sValue = oEvent.getSource().getValue();
			let sNewValue = "0";
			if(sValue && +sValue > 0 && +sValue < 10){
				sNewValue = Number(sValue);
				
			} 
			oEvent.getSource().setValue( sNewValue );
			this.getOwnerComponent().onCalculate();
		}

	});
});