sap.ui.define([
	'sap/ui/core/UIComponent',
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
],
	function(UIComponent, JSONModel, Device) {
	"use strict";

	var Component = UIComponent.extend("app.Component", {

		metadata : {
		    manifest: "json"
		},

		init: function(){

			UIComponent.prototype.init.apply(this, arguments);
			// create the views based on the url/hash
			this.getRouter().initialize();

			let oModel = this.getModel("pizzadata");
			oModel.dataLoaded().then(function(){
				this.extandPizzaData();
			}.bind(this));

			let oData = {
				position: 0
			};
			let oPosModel = new JSONModel(oData);
			this.setModel(oPosModel, "posmodel");

		},

		extandPizzaData: function(){
			let oModel = this.getModel("pizzadata");
			oModel.setProperty("/totalcost", 0);
			oModel.getProperty("/recipes").forEach(function(element, i) {
				oModel.setProperty("/recipes/" + i + "/quantity", 0);
				oModel.setProperty("/recipes/" + i + "/cost", 0);
			});

		},

		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		onCalculate: function(){
			let oModel = this.getModel("pizzadata");
			let aRecipes = oModel.getProperty("/recipes");
			let totalcost = 0;
			for(let i = 0; i < aRecipes.length; i++){
				aRecipes[i].cost = Number(aRecipes[i].price) * Number(aRecipes[i].quantity);
				totalcost += aRecipes[i].cost
			}
			oModel.setProperty("/recipes",   aRecipes);
			oModel.setProperty("/totalcost", totalcost);
		}

	});

	return Component;

});
