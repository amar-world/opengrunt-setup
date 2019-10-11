sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";
    jQuery.sap.registerModulePath("com.golit.ms.landingpage", "./landingpage/webapp/");
        new ComponentContainer({
            name: "com.golit.ms.landingpage",
            settings: {
                id: "landingpage"
            },
            async: true
        }).placeAt("content");
});