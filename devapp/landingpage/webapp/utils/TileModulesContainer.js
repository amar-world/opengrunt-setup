sap.ui.define([
    "sap/ui/base/Object"
],
function (Object) {
    "use strict";
   var _tileUtilityInstance = null;
var tileUtility = Object.extend("com.golit.ms.landingpage.utils.TileModulesContainer", {

   _oCurrentHashPath : null,
   _oShellAppToLoad: null,

    getCurrentShellToLoaded:function(){
        return this._oShellAppToLoad;
    },
    getCurrentHashPath: function () {
        return this._oCurrentHashPath;
    }



});
return {
    getInstance: function () {
        if (!_tileUtilityInstance) {
            _tileUtilityInstance = new tileUtility();
        }
        return _tileUtilityInstance;
    }
};
});

