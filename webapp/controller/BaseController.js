sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sivamanikanta.portfolio.controller.BaseController", {

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		isNotEmpty: function (sValue) {
			return !!sValue;
		},

		onNavTo: function (oEvent) {
			var sRoute = oEvent.getSource().data("route");
			if (sRoute) {
				this.getRouter().navTo(sRoute);
			}
		},

		onDownloadResume: function () {
			var sModulePath = sap.ui.require.toUrl("sivamanikanta/portfolio");
			window.open(sModulePath + "/assets/Sivamanikanta_Gandham_SAP_UI5_Fiori_Resume.pdf", "_blank");
		},

		onOpenLinkedIn: function () {
			var oModel = this.getView().getModel("portfolio");
			window.open(oModel.getProperty("/contact/linkedin"), "_blank");
		},

		onEmail: function () {
			var oModel = this.getView().getModel("portfolio");
			window.location.href = "mailto:" + oModel.getProperty("/contact/email");
		},

		onCall: function () {
			var oModel = this.getView().getModel("portfolio");
			window.location.href = "tel:" + oModel.getProperty("/contact/phone");
		}
	});
});
