sap.ui.define([
		"com/golit/ms/landingpage/controller/BaseController",
		"sap/ui/core/UIComponent",
		"sap/ui/core/Component",
		"sap/ui/core/ComponentContainer",
		"sap/ui/core/routing/HashChanger",
		"sap/ui/core/routing/History"
	],
	function (BaseController, UIComponent, Component, ComponentContainer, HashChanger, History) {
		"use strict";

		return BaseController.extend("com.golit.ms.landingpage.controller.AppTileContainer", {
			onInit: function () {
				BaseController.prototype.onInit.apply(this, arguments);
				this.router = UIComponent.getRouterFor(this);
				this._landingPageShellContainer = this.getView().byId("_landingpageShellId");
				this.router.getRoute("shellAppContainer").attachMatched(this._onRouteMatched, this);
				var oHashChanger = HashChanger.getInstance();
				oHashChanger.init();

				/* var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				oHashChanger.attachEvent("hashChanged", function (oEvent) {
					var sNewPath = oHistory.aHistory[oHistory.aHistory.length - 1];
					if (oHistory.aHistory.length > 2 && oHistory.iHistoryPosition > 1 && oHistory.getDirection() === "NewEntry") {
						window.location.href = window.location.origin + window.location.pathname + oHistory.aHistory[1];
						setTimeout(function () {
							oHashChanger.replaceHash(+ oEvent.getParameter("newHash"));
						}, 300);
					}
				}.bind(this)); */
			},
			_onRouteMatched: function (oEvent) {
				debugger
				var semanticObject = oEvent.getParameter("arguments").semanticObject;
				var tileType = oEvent.getParameter("arguments").tileType;
				var _navigationFromTile = this.getView().getModel("appProperties").getProperty("/_navigationFromTile");
				if (!_navigationFromTile) {
					var aSematicObj = semanticObject.split("-");
					semanticObject = aSematicObj[0];
					tileType = aSematicObj[1];
					this.getView().getModel("appProperties").setProperty("/_navigationFromTile", true);
					this.router.navTo("shellAppContainer", {
						"semanticObject": semanticObject,
						"tileType": tileType
					}, true);
					return;
				}
				var navigationInfo = this.getNavInfoFromSemantic(semanticObject, tileType);
				if (navigationInfo) {
					
					var _component = new ComponentContainer({
						height: "100%",
						name: navigationInfo.componentName,
						async: true,
						url: navigationInfo.uriToLoad,
						componentCreated: function (oComponentEvent) {
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

						}.bind(this)
					});
					this._landingPageShellContainer.setApp(_component);
				}
			},
			_onProfileIconPress: function (oEvent) {
				if (this._overlay) {
					this._overlay.destroy();
				}
				this._overlay = sap.ui.xmlfragment("com.golit.ms.landingpage.fragment.ProfileInfo",
					this).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
				this._overlay.openBy(oEvent.getSource());
			},
			_onTileBlockPress: function (oEvent) {
				var selectedBindingContext = oEvent.getSource().getBindingContext("sections");
				var selectedTileObject = selectedBindingContext.getObject();
				this.getComponentToLoad(selectedTileObject.navigationInfo);

			},
			onNavBack: function () {
				var oHistory, sPreviousHash;

				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("landingPage", {}, true);
				}
			},
			getComponentFromHash: function (newUrlHash, oldUrlhash) {
				var listOfSematicType = newUrlHash.split("-");
				var navigationInfo = this.getNavInfoFromSemantic(listOfSematicType[0], listOfSematicType[1]);
				this.getComponentToLoad(navigationInfo);
			},
			getNavInfoFromSemantic: function (sematic, type) {
				var aSectionData = this.getView().getModel("sections").getProperty("/");
				var navigationInfo = null;
				var tileItems = [];
				var flag = false;
				var eachTileItems = null;
				for (var i = 0; i < aSectionData.length; i++) {
					flag = false;
					tileItems = aSectionData[i].tileItems;
					for (var j = 0; j < tileItems.length; j++) {
						eachTileItems = tileItems[j];
						if (sematic === eachTileItems.navigationInfo.semanticObject &&
							type === eachTileItems.navigationInfo.tileType) {
							flag = true;
							return eachTileItems.navigationInfo;
							// 
							// return;
						}
					}
					if (flag) {
						console.log("outer loop");
						return;
					}
				}
			},
			getComponentToLoad: function (navigationInfo, isLaodinAgain) {
				debugger
				//var componentToLoad = new Promise(function (resolve, reject) {
				var newPathUrl = navigationInfo.semanticObject + "-" + navigationInfo.tileType;
				var _component = new sap.ui.core.ComponentContainer({
					height: "100%",
					name: navigationInfo.componentName,
					async: true,
					url: navigationInfo.uriToLoad,
					componentCreated: function (oComponentEvent) {
						var _componentControl = oComponentEvent.getParameter("component");
						var _routerControl = _componentControl.getRouter();
						if (_routerControl.hasOwnProperty("_oRoutes")) {
							var _routesObject = _routerControl._oRoutes;
							var _config = _routesObject.display._oConfig;
							var routeObject = {
								"name": newPathUrl,
								"pattern": newPathUrl,
								"target": _config.target
							};
							_routerControl.addRoute(routeObject);
							// this.getView().getModel("sections").setProperty("/_sCurrentTileLoaded", newPathUrl);
							//this._tileModulesContainer._currentTileLoaded = newPathUrl;
							if (isLaodinAgain) {
								_routerControl.navTo(newPathUrl, null, false);
							} else {
								_routerControl.navTo(newPathUrl, null, false);
							}

						}

					}.bind(this)
				});
				this._landingPageShellContainer.setApp(_component);
			}

		});
	});