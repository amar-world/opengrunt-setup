sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/routing/HashChanger",
        "com/golit/ms/landingpage/utils/TileModulesContainer"
    ],
    function (Controller, UIComponent, JSONModel, HashChanger, TileModulesContainer) {
        "use strict";
        return Controller.extend("com.golit.ms.landingpage.controller.BaseController", {
            router:null,
            onInit: function () {
                this.router = UIComponent.getRouterFor(this);
            }
        });
    });