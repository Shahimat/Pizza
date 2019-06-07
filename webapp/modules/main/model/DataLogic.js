sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";
	return JSONModel.extend("mainpath.model.DataLogic", {

		serviceUrl: null,
		mockedDataSource: jQuery.sap.getModulePath('mainpath.model', '/pizzadata.json'),
		alwaysUseMock: true,
		bAsync: false,
		oModel: {},

        constructor: function ( oModel ) {
			JSONModel.prototype.constructor.apply(this, arguments);
			this.oModel = oModel;
			oModel.dataLoaded().then(function(){
				this.extendPizzaData();
			}.bind(this));
        },

        extendPizzaData: function(){
			this.oModel.setProperty("/totalcost", 0);
			this.oModel.getProperty("/recipes").forEach(function(element, i) {
				this.oModel.setProperty("/recipes/" + i + "/quantity", 0);
				this.oModel.setProperty("/recipes/" + i + "/cost", 0);
			}.bind(this));
		},

        onCalculate: function(){
			let aRecipes = this.oModel.getProperty("/recipes");
			let totalcost = 0;
			for(let i = 0; i < aRecipes.length; i++){
				aRecipes[i].cost = Number(aRecipes[i].price) * Number(aRecipes[i].quantity);
				totalcost += aRecipes[i].cost
			}
			this.oModel.setProperty("/recipes",   aRecipes);
			this.oModel.setProperty("/totalcost", totalcost);
        }

	});
});