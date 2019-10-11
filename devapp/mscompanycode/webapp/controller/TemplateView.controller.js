sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/UIComponent"
	],
	function (Controller, JSONModel, UIComponent) {
		"use strict";

		return Controller.extend("com.golit.ut.uitemplate.controller.TemplateView", {

			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.golit.ut.uitemplate.view.TemplateView
			 */
			onInit: function () {

				this.router = UIComponent.getRouterFor(this);
				var jsonTemplate = new JSONModel(jQuery.sap.getModulePath("com/golit/ut/uitemplate/model", "/ListDataValue.json"));
				this.getView().setModel(jsonTemplate, "listDataValue");
				this.router.getRoute("display").attachMatched(this._onRouteMatched, this);

			},
			_onRouteMatched: function (event) {
				
				

			},
			onNavTopagePress: function () {
				this.router.navTo("pageNav", null, false);
			}

			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.golit.ut.uitemplate.view.TemplateView
			 */
			//	onBeforeRendering: function() {
			//
			//	},

			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf com.golit.ut.uitemplate.view.TemplateView
			 */
			//	onAfterRendering: function() {
			//
			//	},

			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf com.golit.ut.uitemplate.view.TemplateView
			 */
			//	onExit: function() {
			//
			//	}

		});

	});