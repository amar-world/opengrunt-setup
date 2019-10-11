/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"com/test/lp/landingpage/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/test/lp/landingpage/test/integration/pages/Main",
	"com/test/lp/landingpage/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.test.lp.landingpage.view.",
		autoWait: true
	});
});