sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";
	return Controller.extend("app.modules.main.controller.Basket", {
        
        onInit: function () {
			//навешиваю на роут обработчик событий с ссылью на него
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("basketPage").attachPatternMatched(this.onFilter, this);
        },

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
        
        onBack: function () {
            this.getRouter().navTo("startPages");
		},
		
		onFilter: function() {
			let oTable = this.getView().byId("ingredientTable");
			let oBinding = oTable.getBinding("items");
			oBinding.filter([
				new sap.ui.model.Filter("quantity", sap.ui.model.FilterOperator.GT, 0)
			])
		},

		onSIChange: function (oEvent) {
			this.getOwnerComponent().onCalculate();
			this.onFilter();
		}		
		
	});
});