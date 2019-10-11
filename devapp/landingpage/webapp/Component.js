sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"com/golit/ms/landingpage/utils/HashSync",
	"com/golit/ms/landingpage/model/AppModel",
	"com/golit/ms/landingpage/model/models"
],
function (UIComponent, Device, JSONModel, HashSync, AppModel, models) {
	"use strict";

	return UIComponent.extend("com.golit.ms.landingpage.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			var jsonTemplate = new JSONModel(jQuery.sap.getModulePath("com/golit/ms/landingpage/model", "/tileList.json"));
			this.setModel(jsonTemplate, "sections");

			var oAppModel = new AppModel();
			this.setModel(oAppModel, "appProperties");

			// enable routing
			this.getRouter().initialize();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});