sap.ui.define([
	"sap/ui/core/Control",
    "sap/m/Button",
    "sap/m/Input"
], function (Control, Button, Input) {
	"use strict";
	return Control.extend("app.modules.main.controller.ScrollInput", {
		metadata: {
			properties: {
				// value: {type: "float", defaultValue: 0}
			},
			aggregations: {
				_btnleft:   {type: "sap.m.Button",  multiple: false, visibility: "hidden"},
				_input:     {type: "sap.m.Input",   multiple: false, visibility: "hidden"},
				_btnright:  {type: "sap.m.Button",  multiple: false, visibility: "hidden"}
			},
			events: {
				change: {
					// parameters: {
					// 	value: {type: "int"}
					// }
				}
			}
        },
        
        init: function () {
            
            this.setAggregation("_btnleft", new Button({
                text: "˅",
                type: "Reject",
				press: this.onQuantityDown.bind(this)
			}));

			this.setAggregation("_input", new Input({
                type: "Number",
                value: "{pizzadata>quantity}",
                width: "4em", 
                liveChange: this.onValidatePizzaQuantity
            }));
            
			this.setAggregation("_btnright", new Button({
                text: "^",
                type: "Accept",
				press: this.onQuantityUp.bind(this)
			}));
		},

		onQuantityDown: function(oEvent){
			let sPath = oEvent.getSource().getBindingContext("pizzadata").getPath();
			let nQuantity = oEvent.getSource().getBindingContext("pizzadata").getObject().quantity;
			nQuantity = nQuantity > 0? --nQuantity: 0;
			let oModel = this.getModel("pizzadata");
			oModel.setProperty(sPath + '/quantity', nQuantity);
            this.onCalculate();
            this.fireEvent("change");
			// this.onFilter();
		},

		onQuantityUp: function(oEvent){
			let sPath = oEvent.getSource().getBindingContext("pizzadata").getPath();
			let nQuantity = Number(oEvent.getSource().getBindingContext("pizzadata").getObject().quantity);
			nQuantity = nQuantity < 9? ++nQuantity: 9;
			let oModel = this.getModel("pizzadata");
			oModel.setProperty(sPath + '/quantity', nQuantity);
            this.onCalculate();
            this.fireEvent("change");
			// this.onFilter();
		},

		onValidatePizzaQuantity: function(oEvent){
			let sValue = oEvent.getSource().getValue();
			let sNewValue = 0;
			if(sValue){
				sNewValue = Number(sValue);
				if(sNewValue < 0) sNewValue = 0;
				if(sNewValue > 9) sNewValue = 9;
			}
			oEvent.getSource().setValue( sNewValue );
            this.onCalculate();
            this.fireEvent("change");
			// this.onFilter();
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
		},

		renderer: function (oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("myAppDemoScrollInput");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getAggregation("_btnleft"));
			oRM.renderControl(oControl.getAggregation("_input"));
			oRM.renderControl(oControl.getAggregation("_btnright"));
			oRM.write("</div>");
		}

	});
});