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

		onAfterRendering: function () {
			var oNavBar = this.getView().byId("navBar");
			if (!oNavBar) {
				return;
			}
			var sRoute = (window.location.hash || "").replace(/^#\/?/, "") || "home";
			oNavBar.getContent().forEach(function (oControl) {
				oControl.removeStyleClass && oControl.removeStyleClass("navActive");
				if (oControl.getMetadata().getName() === "sap.m.Button" && oControl.data("route") === sRoute) {
					oControl.addStyleClass("navActive");
				}
			});
		},

		onNavTo: function (oEvent) {
			var oSource = oEvent.getSource();
			var sRoute = oSource.data("route");
			if (sRoute) {
				if (document.activeElement && document.activeElement.blur) {
					document.activeElement.blur();
				}
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

		onOpenInstagram: function () {
			var oModel = this.getView().getModel("portfolio");
			window.open(oModel.getProperty("/contact/instagram"), "_blank");
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
