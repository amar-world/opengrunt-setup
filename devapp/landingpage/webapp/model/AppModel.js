sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel,Util
) {
    "use strict";
    return JSONModel.extend("com.golit.ms.landingpage.model.AppModel", {

        constructor: function (startupParams) {

            // create data
            var oData = {
                User:"Amarjeet",
                _navigationFromTile:false,
                _navigationTilePath:"landingPage"
                
            
            };

            // call super constructor
            JSONModel.call(this, oData);
        }

    });
});