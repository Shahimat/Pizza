sap.ui.define([
	"sap/ui/core/Control",
    "sap/m/Button",
    "sap/m/Input"
], function (Control, Button, Input) {
	"use strict";
	return Control.extend("app.modules.main.controller.ScrollInput", {
		metadata: {
			properties: {
				minValue:	{type: "Number"},
				maxValue:	{type: "Number"},
				value:		{type: "Number"},
				width:		{type: "String"}
			},
			aggregations: {
				_btnleft:   {type: "sap.m.Button",  multiple: false, visibility: "hidden"},
				_input:     {type: "sap.m.Input",   multiple: false, visibility: "hidden"},
				_btnright:  {type: "sap.m.Button",  multiple: false, visibility: "hidden"}
			},
			events: {
				liveChange: {
					// parameters: {
					// 	value: {type: "int"}
					// }
				}
			}
        },

        init: function () {

            this.setAggregation("_btnleft", new Button({
                text: "-",
                type: "Reject",
				press: this.onValueDown.bind(this)
			}));

			this.setAggregation("_input", new Input({
                // type: "Number",
                // value: this.getValue(),
                // width: this.getWidth(), 
                liveChange: this.onValueValidate
            }));

			this.setAggregation("_btnright", new Button({
                text: "+",
                type: "Accept",
				press: this.onValueUp.bind(this)
			}));
		},

		onValueDown: function(){
			let value = this.getValue();
			value--;
			if(this.getMinValue() && value < this.getMinValue()){ 
				value = this.getMinValue(); 
			}
			this.setValue( value );
            this.fireEvent("liveChange");
		},

		onValueUp: function(){
			let value = this.getValue();
			value++;
			if(this.getMaxValue() && value > this.getMaxValue()){ 
				value = this.getMaxValue(); 
			}
			this.setValue( value );
            this.fireEvent("liveChange");
		},

		onValueValidate: function(oEvent){
			const regexp = /^-?\d+$/;
			let sValue = oEvent.getSource().getValue();
			let sNewValue = Number(this.getParent().getValue());
			if(sValue && regexp.test(sValue) == true){
				sNewValue = Number(sValue);
				if(this.getParent().getMinValue() && sNewValue < this.getParent().getMinValue()){
					sNewValue = this.getParent().getMinValue();
				} 
				if(this.getParent().getMaxValue() && sNewValue > this.getParent().getMaxValue()){
					sNewValue = this.getParent().getMaxValue();
				} 
			}
			this.getParent().setValue( Number(sNewValue) );
			this.setValue( Number(sNewValue) );
            this.getParent().fireEvent("liveChange");
        },

		renderer: function (oRM, oControl) {

			oControl.getAggregation("_input").setValue( oControl.getValue() );
			if(oControl.getWidth()){ 
				oControl.getAggregation("_input").setWidth( oControl.getWidth() );
			}

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