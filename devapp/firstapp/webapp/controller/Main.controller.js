sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.amar.project1.controller.Main", {
		onDateChange: function (oEvent) {
			if (oEvent.getSource().getDateValue() > new Date()) {
				oEvent.getSource().setValueState("Error");
			}

		},
		onliveChangeValue: function (oEvent) {
			var _oInput = oEvent.getSource();
			var val = _oInput.getValue();
			val = val.replace(/^[0-9]/g, '');
			_oInput.setValue(val);
		}
	});
});