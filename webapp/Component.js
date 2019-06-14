sap.ui.define([
	'sap/ui/core/UIComponent',
	"sap/ui/Device"
],
	function(UIComponent, Device) {
	"use strict";

	var Component = UIComponent.extend("app.Component", {

		metadata : {
		    manifest: "json"
		},

		init: function(){

			UIComponent.prototype.init.apply(this, arguments);
			// create the views based on the url/hash
			this.getRouter().initialize();

			var deviceModel = new sap.ui.model.json.JSONModel({
				isPhone: sap.ui.Device.system.phone
			});
			this.setModel(deviceModel, "device");
		},

		// Device.system.phone

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

	});

	return Component;

});
