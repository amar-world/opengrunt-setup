/* eslint-disable sap-no-absolute-component-path */
sap.ui.define([
    "jquery.sap.global",
    "sap/ui/base/Object",
    "sap/ui/core/routing/HashChanger"
], function (
    jQuery,
    Object,
    HashChanger
) {
    "use strict";

    return HashChanger.extend("com.golit.ms.landingpage.utils.HashSync", {
       
        createRouterHashChanger : function () {
            debugger
            if (!this._oRouterHashChanger) {
                this._oRouterHashChanger = new RouterHashChanger({
                    parent: this
                });

                this._registerListenerToRelevantEvents();

                this._oRouterHashChanger.attachEvent("hashSet", this._onHashModified, this);
                this._oRouterHashChanger.attachEvent("hashReplaced", this._onHashModified, this);
            }

            return this._oRouterHashChanger;
        }
      

    });
});
