sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent"
], function (Controller, JSONModel, UIComponent) {
	"use strict";

	return Controller.extend("com.golit.ms.landingpage.controller.Login", {

		onInit: function () {
			var loginModel = new JSONModel({
				loginUserName: "",
				errorMessageText: "",
				loginPassword: ""
			});
			this.getView().setModel(loginModel, "loginModel");
			this.router = UIComponent.getRouterFor(this);
			this.router.getRoute("Login").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			return;
		},
		onPasswordChange: function (oEvent) {
			this.getView().getModel("loginModel").setProperty("/errorMessageText", "");
			if (this.getView().getModel("loginModel").getProperty("/loginUserName") !== "") {
				this.navigateToLandingPage();
			} else {
				this.getView().getModel("loginModel").setProperty("/errorMessageText", "Invalid userName Or password!");
			}
		},
		_callLoginService: function () {
			debugger
			var loginDetail = this.getView().getModel("loginModel").getProperty("/");
			var dataTobePassed = JSON.stringify({
				'username': this.getView().byId("_loginUserCredId").getValue(),
				"password": this.getView().byId("_loginUserPCredId").getValue()
			});
			$.ajax({
				url: "/destinations/Golit/userloginsession/authenticateLogin",
				dataType: "json",
				type: "POST",
				data: dataTobePassed,
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					this.callService();
					window.location.replace(window.location.origin + "/#landingPage");

				}.bind(this),
				error: function (d) {
					debugger
					alert("error");
				}
			});
		},
		callService:function(){
			var model = this.getView().getModel();
			model.read("/UserLoginSet",{
				success:function(oData){
debugger
				}.bind(this)
			});
		},
		onLoginPress: function (oEvent) {
			this.getView().getModel("loginModel").setProperty("/errorMessageText", "");
			var loginDetail = this.getView().getModel("loginModel").getProperty("/");

			//window.location.replace() ;tp: //localhost:8070/#/landingPage
			var username = this.getView().byId("_loginUserCredId").getValue();
			var password = this.getView().byId("_loginUserPCredId").getValue();
			if (username !== "" && password !== "") {
				this._callLoginService();
			} else {
				this.getView().getModel("loginModel").setProperty("/errorMessageText", "Invalid userName Or password!");
			}
		},
		navigateToLandingPage: function () {
			this.router.navTo("landingPage", null, true);
		}

	});

});