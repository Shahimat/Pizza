sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"mainpath/model/DataLogic",
	"sap/ui/Device"
], function (Controller, UIComponent, DataLogic, Device) {
	"use strict";
	return Controller.extend("basketpath.controller.Basket", {
        
        onInit: function () {
			//навешиваю на роут обработчик событий с ссылью на него
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("basketPage").attachPatternMatched(this.onFilter, this);
        },

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
        
        onBack: function () {
			if(Device.system.phone){
				this.getRouter().navTo("startPage");
			} else {
				this.getRouter().navTo("startPages");
			}
		},
		
		onFilter: function() {
			let oTable = this.getView().byId("ingredientTable");
			let oBinding = oTable.getBinding("items");
			oBinding.filter([
				new sap.ui.model.Filter("quantity", sap.ui.model.FilterOperator.GT, 0)
			])
		},

		onSIChange: function (oEvent) {
			// this.getOwnerComponent().onCalculate();
			DataLogic.prototype.onCalculate();
			this.onFilter();
		},
		
		summFormatter: function(price, CurrencyCode, quantity, cost) {
			return price + " " + CurrencyCode + " x " + quantity + " = " + cost + " " + CurrencyCode;
		}
		
	});
});