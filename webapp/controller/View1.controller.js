sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"com/espedia/TestLibreriaTween/Utility/TweenSapModule"
], function (Controller, jQuery, TWEEN) {
	"use strict";

	return Controller.extend("com.espedia.TestLibreriaTween.controller.View1", {

		positionX: 0,
		positionY: 0,

		onInit: function () {

			//jQuery.sap.require("com.espedia.TestLibreriaTween.Utility.Tween");
			jQuery.sap.require("com.espedia.TestLibreriaTween.Utility.RequestAnimationFrame");


			var printMousePos = function (event) {

				var pageId = this.getView().createId("img");
				var tween;
				var position = {
					x: this.positionX,
					y: this.positionY,
					rotation: 0
				};

				var update = function () {

					if (this.target === undefined) {
						var targetId = this.getView().createId("target");
						this.target = $("#" + targetId)[0];
					}

					this.target.style.left = position.x + "px";
					this.target.style.top = position.y + "px";
					this.target.style.webkitTransform = "rotate(" + Math.floor(position.rotation) + "deg)";
					this.target.style.MozTransform = "rotate(" + Math.floor(position.rotation) + "deg)";
				}.bind(this);

				function animate(time) {
					var id = requestAnimationFrame(animate);
					var result = TWEEN.update(time);
					if (!result) cancelAnimationFrame(id);
				}

				var x = event.clientX - $("#" + pageId).offsetParent()[0].offsetTop;
				var y = event.clientY - $("#" + pageId).offsetParent()[0].offsetLeft;

				tween = new TWEEN.Tween(position)
					.to({
						x: x,
						y: y,
						rotation: 360
					}, 2000)
					.delay(10)
					.easing(TWEEN.Easing.Elastic.InOut)
					.onUpdate(update);
				tween.start();
				animate();

				this.positionX = x;
				this.positionY = y;

				//console.log(this.positionX + ',' + this.positionY)

			}.bind(this);

			document.addEventListener("click", printMousePos);

			/*
			var position;
			var tween1, tween2, tween3, tweenBack;
					var update = function () {

					if (this.target === undefined) {
						var targetId = this.getView().createId("target")
						this.target = $("#" + targetId)[0];
					}

					this.target.style.left = position.x + 'px';
					this.target.style.top = position.y + 'px';
					this.target.style.webkitTransform = 'rotate(' + Math.floor(position.rotation) + 'deg)';
					this.target.style.MozTransform = 'rotate(' + Math.floor(position.rotation) + 'deg)';
				}.bind(this);

			var init = function () {
					position = {
						x: 50,
						y: 50,
						rotation: 0
					};

					var targetId = this.getView().createId("target")
					this.target = $("#" + targetId)[0];

					tween1 = new TWEEN.Tween(position)
						.to({
							x: 1000,
							y: 100,
							rotation: 359
						}, 2000)
						.delay(10)
						.easing(TWEEN.Easing.Elastic.InOut)
						.onUpdate(update);

					tween2 = new TWEEN.Tween(position)
						.to({
							x: 1000,
							y: 600,
							rotation: 90
						}, 2000)
						.delay(10)
						.easing(TWEEN.Easing.Quintic.InOut)
						.onUpdate(update);

					tween3 = new TWEEN.Tween(position)
						.to({
							x: 50,
							y: 50,
							rotation: 0
						}, 2000)
						.delay(10)
						.easing(TWEEN.Easing.Cubic.InOut)
						.onUpdate(update);

					tween1.chain(tween2);
					tween2.chain(tween3);
					tween3.chain(tween1);

					//tween1.start();

				}.bind(this);

			init();
			animate();
			*/
		}

	});
});