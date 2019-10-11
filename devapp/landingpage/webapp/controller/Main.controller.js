sap.ui.define([
		"com/golit/ms/landingpage/controller/BaseController",
		"sap/ui/core/ComponentContainer"
	],
	function (BaseController, ComponentContainer) {
		"use strict";

		return BaseController.extend("com.golit.ms.landingpage.controller.Main", {
			onInit: function () {
				BaseController.prototype.onInit.apply(this, arguments);
				this.router.getRoute("landingPage").attachMatched(this._onRouteMatched, this);
				this._landingPageShellContainer = this.getView().byId("_landingpageShellId");
			},
			_onRouteMatched: function (oEvent) {
			},
			_onTileBlockPress: function (oEvent) {
				debugger
				var selectedBindingContext = oEvent.getSource().getBindingContext("sections");
				var selectedTileObject = selectedBindingContext.getObject();
				var pattern = selectedTileObject.navigationInfo.semanticObject + "-" +
				selectedTileObject.navigationInfo.tileType;
				// var routeObject = {
				// 	"name": "shellAppContainer",
				// 	"pattern": pattern,
				// 	"target": "ShellAppContainer"
				// };
				// this.router.addRoute(routeObject);
				// this.getView().getModel("sections").setProperty("/_sCurrentTileLoaded", newPathUrl);
				//this._tileModulesContainer._currentTileLoaded = newPathUrl;
				this.getView().getModel("appProperties").setProperty("/_navigationFromTile", true);
				/* this.router.navTo("shellAppContainer", {
					"semanticObject": selectedTileObject.navigationInfo.semanticObject,
					"tileType": selectedTileObject.navigationInfo.tileType
				}, false); */
				var _component = new ComponentContainer({
					height: "100%",
					name: selectedTileObject.navigationInfo.componentName,
					async: true,
					url: selectedTileObject.navigationInfo.uriToLoad
				/* 	componentCreated: function (oComponentEvent) {
						var _componentControl = oComponentEvent.getParameter("component");
						var _routerControl = _componentControl.getRouter();
						if (_routerControl.hasOwnProperty("_oRoutes")) {
							var _routesObject = _routerControl._oRoutes;
							var _config = _routesObject.display._oConfig;
							var routeObject = {
								"name": semanticObject + "-" + tileType,
								"pattern": semanticObject + "-" + tileType,
								"target": _config.target
							};
							_routerControl.addRoute(routeObject);
							this.getView().getModel("appProperties").setProperty("/_navigationTilePath", semanticObject + "-" + tileType);
							_routerControl.navTo(semanticObject + "-" + tileType, null, true);
						}

					}.bind(this) */
				});
				this._landingPageShellContainer.setApp(_component);

			}
			
		});

	});