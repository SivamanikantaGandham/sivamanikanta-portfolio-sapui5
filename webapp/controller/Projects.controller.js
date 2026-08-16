sap.ui.define([
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/VBox",
	"sap/m/Text",
	"sap/m/Title",
	"sivamanikanta/portfolio/controller/BaseController"
], function (Dialog, Button, VBox, Text, Title, BaseController) {
	"use strict";

	return BaseController.extend("sivamanikanta.portfolio.controller.Projects", {

		onInit: function () {
			this.getOwnerComponent().getModel("portfolio").setProperty("/selectedProject", {
				name: "Select a project to view details",
				tech: "",
				description: "Click any project in the list to see its details here.",
				icon: "sap-icon://course-book"
			});
		},

		onAfterRendering: function () {
			BaseController.prototype.onAfterRendering.apply(this, arguments);
			var oList = this.byId("projectList");
			if (!oList) {
				return;
			}
			if (oList.getItems().length) {
				this._preselect();
			} else {
				oList.attachEventOnce("updateFinished", this._preselect, this);
			}
		},

		onSelectProject: function (oEvent) {
			this._updateDetail(oEvent.getParameter("listItem"));
		},

		onPressProject: function (oEvent) {
			var oListItem = oEvent.getSource();
			this._updateDetail(oListItem);
			if (window.matchMedia("(max-width: 900px)").matches) {
				this._openDetailDialog();
			}
		},

		onCloseProjectDetail: function () {
			if (this._oDialog) {
				this._oDialog.close();
			}
		},

		_preselect: function () {
			var oList = this.byId("projectList");
			var aItems = oList && oList.getItems();
			if (aItems && aItems.length) {
				oList.setSelectedItem(aItems[0]);
				this._updateDetail(aItems[0]);
			}
		},

		_getData: function (oListItem) {
			if (!oListItem) {
				return null;
			}
			var oContext = oListItem.getBindingContext("portfolio") || oListItem.getBindingContext();
			return oContext ? oContext.getObject() : null;
		},

		_updateDetail: function (oListItem) {
			var oData = this._getData(oListItem);
			if (oData) {
				this.getOwnerComponent().getModel("portfolio").setProperty("/selectedProject", oData);
			}
		},

		_openDetailDialog: function () {
			if (!this._oDialog) {
				this._oDialog = new Dialog({
					title: "",
					class: "projectDetailDialog",
					content: [
						new VBox({
							items: [
								new Title({ text: "{portfolio>/selectedProject/name}", level: "H3", wrapping: true }),
								new Text({ text: "{portfolio>/selectedProject/tech}", wrapping: true }),
								new Text({ text: "{portfolio>/selectedProject/description}", wrapping: true })
							]
						})
					],
					endButton: new Button({
						text: "Close",
						type: "Emphasized",
						press: this.onCloseProjectDetail.bind(this)
					})
				});
				this._oDialog.setModel(this.getOwnerComponent().getModel("portfolio"), "portfolio");
				this.getView().addDependent(this._oDialog);
			}
			this._oDialog.open();
		}
	});
});
