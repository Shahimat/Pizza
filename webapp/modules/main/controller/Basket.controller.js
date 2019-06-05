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

		onQuantityDown: function(oEvent){
			
			let sPath = oEvent.getSource().getBindingContext("pizzadata").getPath();
			let nQuantity = oEvent.getSource().getBindingContext("pizzadata").getObject().quantity;
			nQuantity = nQuantity > 0? --nQuantity: 0;
			let oModel = this.getView().getModel("pizzadata");
			oModel.setProperty(sPath + '/quantity', nQuantity);
			this.getOwnerComponent().onCalculate();
			this.onFilter();
		},

		onQuantityUp: function(oEvent){

			let sPath = oEvent.getSource().getBindingContext("pizzadata").getPath();
			let nQuantity = Number(oEvent.getSource().getBindingContext("pizzadata").getObject().quantity);
			nQuantity = nQuantity < 9? ++nQuantity: 9;
			let oModel = this.getView().getModel("pizzadata");
			oModel.setProperty(sPath + '/quantity', nQuantity);
			this.getOwnerComponent().onCalculate();
			this.onFilter();
		},

		onValidatePizzaQuantity: function(oEvent){
			let sValue = oEvent.getSource().getValue();
			let sNewValue = "0";
			if(sValue){
				sNewValue = Number(sValue);
				if(sNewValue < 0) sNewValue = 0;
				if(sNewValue > 9) sNewValue = 9;
			}
			oEvent.getSource().setValue( sNewValue );
			this.getOwnerComponent().onCalculate();
			this.onFilter();
		}		
		
	});
});