window.__require=function e(t,a,i){function n(o,c){if(!a[o]){if(!t[o]){var l=o.split("/");if(l=l[l.length-1],!t[l]){var r="function"==typeof __require&&__require;if(!c&&r)return r(l,!0);if(s)return s(l,!0);throw new Error("Cannot find module '"+o+"'")}o=l}var h=a[o]={exports:{}};t[o][0].call(h.exports,function(e){return n(t[o][1][e]||e)},h,h.exports,e,t,a,i)}return a[o].exports}for(var s="function"==typeof __require&&__require,o=0;o<i.length;o++)n(i[o]);return n}({HelloWorld:[function(e,t,a){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},text:"Hello, World!"},onLoad:function(){this.label.string=this.text},loadScene_roulette:function(){cc.director.loadScene("roulette")},onRestart:function(){cc.game.end()}}),cc._RF.pop()},{}],HotUpdate:[function(e,t,a){"use strict";cc._RF.push(t,"1e59flymrxDaJO18QnFVzZQ","HotUpdate"),cc.Class({extends:cc.Component,properties:{manifestUrl:{type:cc.Asset,default:null},updateUI:cc.Node,_updating:!1,_canRetry:!1,_storagePath:""},checkCb:function(e){switch(e.getEventCode()){case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:this.panel.info.string="No local manifest file found, hot update skipped.";break;case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:this.panel.info.string="Fail to download manifest file, hot update skipped.",myGlobal.popupDlg.onShow("\u52a0\u8f7d\u70ed\u66f4\u65b0\u6e05\u5355\u6587\u4ef6\u5931\u8d25,\u9000\u51fa\u70ed\u66f4\u65b0......",this.updateExit,this.updateExit,1);break;case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:this.panel.info.string="Already up to date with the latest remote version.",this.close();break;case jsb.EventAssetsManager.NEW_VERSION_FOUND:this.panel.info.string="New version found, please try to update. ("+this._am.getTotalBytes()+")",this.panel.checkBtn.active=!1,this.panel.fileProgress.progress=0,this.panel.byteProgress.progress=0,myGlobal.popupDlg.onShow("\u53d1\u73b0\u6700\u65b0\u7248\u672c,\u51c6\u5907\u53bb\u66f4\u65b0......",this.updateShow,this.updateExit,1);break;default:return}this._am.setEventCallback(null),this._checkListener=null,this._updating=!1},updateCb:function(e){var t=!1,a=!1;switch(e.getEventCode()){case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:this.panel.info.string="No local manifest file found, hot update skipped.",a=!0;break;case jsb.EventAssetsManager.UPDATE_PROGRESSION:this.panel.byteProgress.progress=e.getPercent(),this.panel.fileProgress.progress=e.getPercentByFile(),this.panel.fileLabel.string=e.getDownloadedFiles()+" / "+e.getTotalFiles(),this.panel.byteLabel.string=this.bytesToSize(e.getDownloadedBytes())+" / "+this.bytesToSize(e.getTotalBytes());var i=e.getMessage();i&&(this.panel.info.string="Updated file: "+i);break;case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:this.panel.info.string="Fail to download manifest file, hot update skipped.",a=!0;break;case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:this.panel.info.string="Already up to date with the latest remote version.",a=!0;break;case jsb.EventAssetsManager.UPDATE_FINISHED:this.panel.info.string="Update finished. "+e.getMessage(),t=!0;break;case jsb.EventAssetsManager.UPDATE_FAILED:this.panel.info.string="Update failed. "+e.getMessage(),this.panel.retryBtn.active=!0,this._updating=!1,this._canRetry=!0;break;case jsb.EventAssetsManager.ERROR_UPDATING:this.panel.info.string="Asset update error: "+e.getAssetId()+", "+e.getMessage();break;case jsb.EventAssetsManager.ERROR_DECOMPRESS:this.panel.info.string=e.getMessage()}if(a&&(this._am.setEventCallback(null),this._updateListener=null,this._updating=!1),t){this._am.setEventCallback(null),this._updateListener=null;var n=jsb.fileUtils.getSearchPaths(),s=this._am.getLocalManifest().getSearchPaths();Array.prototype.unshift.apply(n,s),cc.sys.localStorage.setItem("HotUpdateSearchPaths",JSON.stringify(n)),jsb.fileUtils.setSearchPaths(n),cc.audioEngine.stopAll(),cc.game.restart()}},loadCustomManifest:function(){if(this._am.getState()===jsb.AssetsManager.State.UNINITED){var e=new jsb.Manifest(customManifestStr,this._storagePath);this._am.loadLocalManifest(e,this._storagePath),this.panel.info.string="Using custom manifest"}},retry:function(){!this._updating&&this._canRetry&&(this.panel.retryBtn.active=!1,this._canRetry=!1,this.panel.info.string="Retry failed Assets...",this._am.downloadFailedAssets())},checkUpdate:function(){if(this._updating)this.panel.info.string="Checking or updating ...";else{if(this._am.getState()===jsb.AssetsManager.State.UNINITED){var e=this.manifestUrl.nativeUrl;cc.loader.md5Pipe&&(e=cc.loader.md5Pipe.transformURL(e)),this._am.loadLocalManifest(e)}this._am.getLocalManifest()&&this._am.getLocalManifest().isLoaded()?(this._am.setEventCallback(this.checkCb.bind(this)),this._am.checkUpdate(),this._updating=!0):this.panel.info.string="Failed to load local manifest ..."}},hotUpdate:function(){if(this._am&&!this._updating){if(this._am.setEventCallback(this.updateCb.bind(this)),this._am.getState()===jsb.AssetsManager.State.UNINITED){var e=this.manifestUrl.nativeUrl;cc.loader.md5Pipe&&(e=cc.loader.md5Pipe.transformURL(e)),this._am.loadLocalManifest(e)}this._failCount=0,this._am.update(),this.panel.updateBtn.active=!1,this._updating=!0}},close:function(){!0===this.updateUI.active&&(this.updateUI.active=!1),cc.director.loadScene("roulette")},show:function(){!1===this.updateUI.active&&(this.updateUI.active=!0)},onLoad:function(){if(cc.sys.isNative){this.panel=myGlobal.UpdatePanel,myGlobal.hotUpdate=this,this._storagePath=(jsb.fileUtils?jsb.fileUtils.getWritablePath():"/")+"remote-assets",this.versionCompareHandle=function(e,t){for(var a=e.split("."),i=t.split("."),n=0;n<a.length;++n){var s=parseInt(a[n]),o=parseInt(i[n]||0);if(s!==o)return s-o}return i.length>a.length?-1:0},this._am=new jsb.AssetsManager("",this._storagePath,this.versionCompareHandle);var e=this.panel;this._am.setVerifyCallback(function(t,a){var i=a.compressed,n=a.md5,s=a.path;a.size;return i?(e.info.string="Verification passed : "+s,!0):(e.info.string="Verification passed : "+s+" ("+n+")",!0)}),this.panel.info.string="Hot update is ready, please check or directly update.",cc.sys.os===cc.sys.OS_ANDROID&&(this._am.setMaxConcurrentTask(2),this.panel.info.string="Max concurrent tasks count have been limited to 2"),this.panel.fileProgress.progress=0,this.panel.byteProgress.progress=0,this.checkUpdate()}},onDestroy:function(){this._updateListener&&(this._am.setEventCallback(null),this._updateListener=null)},bytesToSize:function(e){if(0===e)return"0 B";var t=Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,t)).toPrecision(3)+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]},updateExit:function(){cc.audioEngine.stopAll(),cc.game.end()},updateShow:function(){myGlobal.hotUpdate.show(),myGlobal.hotUpdate.hotUpdate()},checkUpdate1:function(){myGlobal.popupDlg.onShow("\u53d1\u73b0\u6700\u65b0\u7248\u672c,\u51c6\u5907\u53bb\u66f4\u65b0......",this.updateShow,this.updateExit,1)}}),cc._RF.pop()},{}],PolygonMask:[function(e,t,a){"use strict";cc._RF.push(t,"a3430/OCJ9AYolQ/ctJTyGl","PolygonMask"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},mask:function(){this.node.getComponent(cc.Mask).inverted=!0;var e=this.node.getComponent(cc.PolygonCollider).points,t=this.node.getComponent(cc.Mask)._graphics;t.clear(!1),t.moveTo(e[0].x,e[0].y);for(var a=0;a<e.length;a++)t.lineTo(e[a].x,e[a].y);t.close(),t.stroke(),t.fill()},start:function(){},onEnable:function(){this.mask()},onDisable:function(){this.node.active=!1},on_show_mask:function(){this.node.active=!0},on_hide_mask:function(){this.node.active=!1}}),cc._RF.pop()},{}],UpdatePanel:[function(e,t,a){"use strict";cc._RF.push(t,"e62fcGTyKBNfao6/luch3hl","UpdatePanel"),cc.Class({extends:cc.Component,properties:{info:cc.Label,fileProgress:cc.ProgressBar,fileLabel:cc.Label,byteProgress:cc.ProgressBar,byteLabel:cc.Label,close:cc.Node,checkBtn:cc.Node,retryBtn:cc.Node,updateBtn:cc.Node},ctor:function(){myGlobal.UpdatePanel=this},onLoad:function(){}}),cc._RF.pop()},{}],data:[function(e,t,a){"use strict";cc._RF.push(t,"f3d76kTTXFCuIlXIcI0pDDf","data");var i={data_arry:[],data_name:{},random_data:function(){for(var e=0;e<12;e++){var t=Math.random();switch(e){case 0:this.data_arry[e]=parseInt(25*t+5),this.data_name[e]="\u86cb\u7cd5";break;case 1:this.data_arry[e]=parseInt(20*t+45),this.data_name[e]="\u85af\u6761";break;case 2:this.data_arry[e]=parseInt(10*t+75),this.data_name[e]="\u6c49\u5821";break;case 3:this.data_arry[e]=parseInt(30*t+95),this.data_name[e]="\u624b\u6293\u997c";break;case 4:this.data_arry[e]=parseInt(20*t+135),this.data_name[e]="\u8461\u8404\u9152";break;case 5:this.data_arry[e]=parseInt(10*t+165),this.data_name[e]="\u82f9\u679c";break;case 6:this.data_arry[e]=parseInt(20*t+185),this.data_name[e]="\u51b0\u6fc0\u51cc";break;case 7:this.data_arry[e]=parseInt(25*t+215),this.data_name[e]="\u8fa3\u6912";break;case 8:this.data_arry[e]=parseInt(15*t+250),this.data_name[e]="\u5496\u55b1";break;case 9:this.data_arry[e]=parseInt(10*t+275),this.data_name[e]="\u5bff\u53f8";break;case 10:this.data_arry[e]=parseInt(20*t+295),this.data_name[e]="\u9c7c\u997c";break;case 11:this.data_arry[e]=parseInt(30*t+325),this.data_name[e]="\u5173\u4e1c\u716e"}}}};i.random_data(),t.exports=i,cc._RF.pop()},{}],effect2_opit:[function(e,t,a){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}cc._RF.push(t,"89643S81wRCSKwEqbW/EDVB","effect2_opit");var n={default:0,defaultT:.2,effectList:[],setEffect:function(e,t,a,n,s){0==this.effectList.length&&this.init(),e.runningEff&&(e.stopAllActions(),e.runningEff=!1,void 0!=e.effScaleX&&(e.scaleX=e.effScaleX,e.scaleY=e.effScaleY),void 0!=e.effOpacity&&(e.opacity=e.effOpacity),void 0!=e.effRot&&(e.rotation=e.effRot),void 0!=e.effX&&(e.x=e.effX,e.y=e.effY)),s&&(e.effScaleX=null,e.effRot=null,e.effX=null,e.effY=null,e.effOpacity=null);var o=[];if(void 0!==t&&t)if("object"==i(t))for(var c in t)o.push(this.getEffect(e,t[c],n));else o.push(this.getEffect(e,t,n));else o.push(this.getEffect(e,this.default,n));e.runAction(cc.sequence(o.length>1?cc.spawn(o):o[0],cc.callFunc(function(){e.runningEff=!1,void 0!=e.effScaleX&&(e.scaleX=e.effScaleX,e.scaleY=e.effScaleY),void 0!=e.effOpacity&&(e.opacity=e.effOpacity),void 0!=e.effRot&&(e.rotation=e.effRot),void 0!=e.effX&&(e.x=e.effX,e.y=e.effY),a&&a()})))},getEffect:function(e,t,a){var i,n;switch(e.runningEff=!0,t){case 0:var s=e.scaleX,o=e.scaleY;void 0==e.effScaleX&&(e.effScaleX=s,e.effScaleY=o),n=this.effectList[0],e.scaleX=.8*e.effScaleX,e.scaleY=.8*e.effScaleY,n&&(i=n(e.effScaleX,e.effScaleY,a).easing(cc.easeBackOut(2)));break;case 1:var c=e.opacity;void 0==e.effOpacity&&(e.effOpacity=c),n=this.effectList[1],e.opacity=0,n&&(i=n(e.effOpacity,a));break;case 2:var l=e.rotation;(e.effRot=void 0)&&(e.effRot=l),n=this.effectList[2],e.rotation=0,n&&(i=n(e.effRot,a,1));break;case 3:var r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX+120,e.y=e.effY+50,n&&(i=n(e.effX,e.effY,a));break;case 4:c=e.opacity;e.effOpacity||(e.effOpacity=c),n=this.effectList[1],e.opacity=255,n&&(i=n(0,a));break;case 5:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX-300,e.y=e.effY,n&&(i=n(e.effX,e.effY,a).easing(cc.easeBackOut(2)));break;case 6:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX+1080,e.y=e.effY,n&&(i=n(e.effX,e.effY,a).easing(cc.easeBackOut(2)));break;case 7:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX,e.y=e.effY-300,n&&(i=n(e.effX,e.effY,a));break;case 8:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX,e.y=e.effY+300,n&&(i=n(e.effX,e.effY,a));break;case 9:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX+300,e.y=e.effY,n&&(i=n(e.effX,e.effY,a).easing(cc.easeBackOut(2)));break;case 10:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX,e.y=e.effY,n&&(i=n(e.effX+300,e.effY,a).easing(cc.easeBackIn(2)));break;case 11:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX,e.y=e.effY,n&&(i=n(e.effX,e.effY-300,a));break;case 12:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX,e.y=e.effY,n&&(i=n(e.effX,e.effY+300,a));break;case 13:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX,e.y=e.effY,n&&(i=n(e.effX-300,e.effY,a).easing(cc.easeBackIn(2)));break;case 14:r=e.x,h=e.y;void 0==e.effX&&(e.effX=r,e.effY=h),n=this.effectList[3],e.x=e.effX,e.y=e.effY,n&&(i=n(e.effX+1080,e.effY,a).easing(cc.easeBackIn(2)))}return i},init:function(){this.effectList.push(this.effect1.bind(this)),this.effectList.push(this.effect2.bind(this)),this.effectList.push(this.effect3.bind(this)),this.effectList.push(this.effect4.bind(this))},effect1:function(e,t,a){return cc.scaleTo(a||this.defaultT,e,t)},effect2:function(e,t){return cc.fadeTo(t||this.defaultT,e)},effect3:function(e,t,a){var i=a||0;return cc.rotateTo(t||this.defaultT,e+360*i)},effect4:function(e,t,a){return cc.moveTo(a||this.defaultT,e,t)}};t.exports=n,cc._RF.pop()},{}],gameInit:[function(e,t,a){"use strict";cc._RF.push(t,"55cadwy8ZlLqIQ9jC8aifuq","gameInit"),cc.Class({extends:cc.Component,properties:{popupDlgInit:{default:null,type:cc.Prefab}},onLoad:function(){this.init()},init:function(){cc.instantiate(this.popupDlgInit).parent=this.node}}),cc._RF.pop()},{}],global:[function(e,t,a){"use strict";cc._RF.push(t,"0579af+Vp5FTJeG+Mpz4qI8","global"),window.myGlobal=window.myGlobal||{},cc._RF.pop()},{}],language:[function(e,t,a){"use strict";cc._RF.push(t,"fea6dFkOmFKr4t3Rqbjlz5t","language");var i=cc.Class({name:"Path",properties:{lanName:{default:"",displayName:"\u8bed\u8a00"},PathorText:{default:"",displayName:"\u56fe\u7247\u8def\u5f84\u6216\u6587\u672c"}}}),n=cc.Class({name:"AtlasPath",properties:{lanName:{default:"",displayName:"\u8bed\u8a00"},PathorText:{default:"",displayName:"\u56fe\u7247\u8def\u5f84\u6216\u6587\u672c"},posId:{default:"",displayName:"\u4f4d\u7f6e"}}}),s=cc.Class({name:"text2text",properties:{lanName:{default:"",displayName:"\u4e2d\u6587\u8bed\u8a00"},Text:{default:"",displayName:"\u7ffb\u8bd1\u8bed\u8a00"}}}),o=cc.Class({name:"changPathandText",properties:{lanName:{default:"",displayName:"\u8bed\u8a00"},Texts:{default:[],type:s,displayName:"\u6587\u672c"},path:{default:"",displayName:"\u8d44\u6e90\u8def\u5f84"}}}),c=cc.Class({name:"Color",properties:{lanName:{default:"",displayName:"\u8bed\u8a00"},Color:{default:new cc.Color,displayName:"\u8282\u70b9\u989c\u8272"}}}),l=cc.Class({name:"Pos",properties:{lanName:{default:"",displayName:"\u8bed\u8a00"},Pos:{default:new cc.Vec2,displayName:"\u4f4d\u7f6e"}}}),r=cc.Class({name:"size",properties:{lanName:{default:"",displayName:"\u8bed\u8a00"},size:{default:new cc.Vec2,displayName:"\u5927\u5c0f"}}}),h=cc.Class({name:"Rot",properties:{lanName:{default:"",displayName:"\u8bed\u8a00"},Rot:{default:0,displayName:"\u89d2\u5ea6"}}});cc.Class({extends:cc.Component,properties:{lanId:{default:0,range:[0,9,1],displayName:"\u8d44\u6e90\u7c7b\u578b",tooltip:"0\u56fe\u7247 1\u6587\u5b57 2\u5b57\u4f53\u6587\u4ef6 3\u56fe\u96c6\u6587\u4ef6 4\u8282\u70b9\u5c5e\u6027 5\u52a8\u753b 6\u6839\u636e\u56fe\u7247\u540d 7\u53ea\u52a0\u8f7d\u8d44\u6e90 8\u8ddf\u6362\u56fe\u96c6\u8d44\u6e90\u4e14\u66f4\u6539\u6587\u672c 9\u6309\u94ae\u56fe\u7247\u66ff\u6362",notify:function(){this._showCombinePropId=this.lanId}},_showCombinePropId:0,gameName:{default:"",displayName:"\u8d44\u6e90\u7ec4\u540d",tooltip:"\u67d0\u79cd\u8bed\u8a00\u7684\u6839\u76ee\u5f55",visible:function(){return 7==this._showCombinePropId}},default_path:{default:"",displayName:"\u9ed8\u8ba4\u8def\u5f84",tooltip:"\u9ed8\u8ba4\u8def\u5f84\uff08\u56fe\u7247\u8def\u5f84\u90fd\u4e00\u6837\u53ea\u6839\u76ee\u5f55\u4e0d\u540c\u5c31\u53ef\u4ee5\u7528\uff09",visible:function(){return 7!=this._showCombinePropId&&4!=this._showCombinePropId&&1!=this._showCombinePropId&&3!=this._showCombinePropId}},Str_supplement:{default:"",displayName:"\u8865\u5145\u5b57\u7b26",tooltip:"\u7528\u4e8e\u66ff\u6362\u5e26#\u6587\u672c\uff0c\u7528\u4e8e\u7a7a\u683c",visible:function(){return 1==this._showCombinePropId}},ResType:{default:0,displayName:"\u662f\u5426\u91ca\u653e",tooltip:"\u662f\u5426\u91ca\u653e\u8be5\u8282\u70b9\u4e0a\u7684\u8d44\u6e90",visible:function(){return 7!=this._showCombinePropId&&4!=this._showCombinePropId&&1!=this._showCombinePropId}},node_cb:{default:[],type:cc.Node,displayName:"\u7528\u4e8e\u5176\u4ed6\u51fd\u6570\u4e2d\u5355\u72ec\u8c03\u7528",tooltip:"\u65b9\u4fbf\u4ee3\u7801\u4e2d\u8c03\u7528"},lan_Path:{default:[],type:i,displayName:"\u8d44\u6e90",tooltip:"\u53ea\u7528\u4e8e\u7c7b\u578b0,1,2,5,6,7",visible:function(){return 3!=this._showCombinePropId&&4!=this._showCombinePropId&&8!=this._showCombinePropId}},lan_AtlasPath:{default:[],type:n,displayName:"\u56fe\u96c6\u8d44\u6e90",tooltip:"\u53ea\u7528\u4e8e\u7c7b\u578b3",visible:function(){return 3==this._showCombinePropId}},lan_changPathandText:{default:[],type:o,displayName:"\u4fee\u6539\u5b57\u4f53\u8d44\u6e90\u548c\u6587\u5b57",tooltip:"\u53ea\u7528\u4e8e\u7c7b\u578b1\uff0c2",visible:function(){return 1==this._showCombinePropId||8==this._showCombinePropId||2==this._showCombinePropId}},Combine:{default:!1,displayName:"\u662f\u5426\u4fee\u6539\u8282\u70b9\u5c5e\u6027",notify:function(){this._showNode=this.Combine}},_showNode:!1,lan_Color:{default:[],type:c,displayName:"\u989c\u8272",visible:function(){return this._showNode||(this.lan_Color=[]),this._showNode}},lan_Pos:{default:[],type:l,displayName:"\u4f4d\u7f6e",visible:function(){return this._showNode||(this.lan_Pos=[]),this._showNode}},lan_Size:{default:[],type:r,displayName:"\u5927\u5c0f",visible:function(){return this._showNode||(this.lan_Size=[]),this._showNode}},lan_Rot:{default:[],type:h,displayName:"\u89d2\u5ea6",visible:function(){return this._showNode||(this.lan_Rot=[]),this._showNode}}},onLoad:function(){for(var e in this.m_uuid=this.generateUUID(),g.multilinguals||(g.multilinguals={}),g.multilinguals[this.m_uuid]=this,this.node_cb)this.node_cb[e].multilingual?this.node_cb[e].multilingual.push(this):this.node_cb[e].multilingual=[this];g.multilinguals2Res||(g.multilinguals2Res={}),g.multilinguals2Res[this.m_uuid]=[],this.m_nodeType="zh","zh"!=g.multilName&&this.init(g.multilName)},init:function(e){if(e&&e!=this.m_nodeType)switch(this.m_nodeType=e,this.lanId){case 0:var t="";for(var a in this.lan_Path)if(this.lan_Path[a].lanName==e){t=this.lan_Path[a].PathorText;break}if(""!=t)cc.loader.loadRes(e+"/"+t,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame),this.node.getComponent(cc.Sprite).spriteFrame=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this));else if(""!=this.default_path){var i="";if((c=this.node.getComponent(cc.Sprite)).spriteFrame&&(i=c.spriteFrame._name),""==i)return;cc.loader.loadRes(e+"/"+this.default_path+"/"+i,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame),this.node.getComponent(cc.Sprite).spriteFrame=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this))}break;case 1:var n="",s="";for(var a in this.lan_changPathandText)if(this.lan_changPathandText[a].lanName==e){s=this.lan_changPathandText[a].Texts;break}if(""!=s&&0!=s.length){for(var a in n=this.node.getComponent(cc.Label).string,s)if(n==s[a].lanName){this.node.getComponent(cc.Label).string=s[a].Text;break}this.changeNodeValue(e)}else if(0!=this.lan_Path.length){for(var a in this.lan_Path)if(this.lan_Path[a].lanName==e){n=this.lan_Path[a].PathorText,this.node.getComponent(cc.Label).string=n,this.changeNodeValue(e);break}}else n=this.node.getComponent(cc.Label).string,this.node.getComponent(cc.Label).string=g.lan_Mgr.getLanToLan(n,this.Str_supplement);break;case 2:t="";for(var a in this.lan_Path)if(this.lan_Path[a].lanName==e){t=this.lan_Path[a].PathorText;break}""!=t?cc.loader.loadRes(e+"/"+t,cc.Font,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font),this.node.getComponent(cc.Label).font=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)):""!=this.default_path&&cc.loader.loadRes(e+"/"+this.default_path,cc.Font,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font),this.node.getComponent(cc.Label).font=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this));break;case 3:i="";(c=this.node.getComponent(cc.Sprite))&&(i=c.spriteFrame._name);t="";var o="";for(var a in this.lan_AtlasPath)if(this.lan_AtlasPath[a].lanName==e){t=this.lan_AtlasPath[a].PathorText,o=this.lan_AtlasPath[a].posId;break}""!=t?cc.loader.loadRes(e+"/Atlas/"+t,cc.SpriteAtlas,function(t,a){if(t)g.configs.debugLog&&console.warn(t);else if(this.node&&this.node.isValid){1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).atlas),this.node.getComponent(cc.Sprite).atlas=a;var i=a.getSpriteFrame(o);this.node.getComponent(cc.Sprite).spriteFrame=i,this.changeNodeValue(e)}else g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)):""!=this.default_path&&cc.loader.loadRes(e+"/"+this.default_path,cc.Font,function(t,a){if(t)g.configs.debugLog&&console.warn(t);else if(this.node&&this.node.isValid){1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).atlas);var n=Atlas.getSpriteFrames();for(var s in n)if(n[s]._name==i){this.node.getComponent(cc.Sprite).atlas=Atlas,this.node.getComponent(cc.Sprite).spriteFrame=n[s],this.changeNodeValue(e);break}}else g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this));break;case 4:this.changeNodeValue(e);break;case 5:t="";for(var a in this.lan_Path)if(this.lan_Path[a].lanName==e){t=this.lan_Path[a].PathorText;break}""!=t?cc.loader.loadRes(e+"/Anim/"+t,cc.AnimationClip,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(this.node.getComponent(cc.Animation).stop(),this.node.getComponent(cc.Animation).removeClip(a._name),this.node.getComponent(cc.Animation).addClip(a),this.node.getComponent(cc.Animation).play(a._name),this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)):""!=this.default_path&&cc.loader.loadRes(e+"/"+this.default_path,cc.AnimationClip,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(this.node.getComponent(cc.Animation).stop(),this.node.getComponent(cc.Animation).removeClip(a._name),this.node.getComponent(cc.Animation).addClip(a),this.node.getComponent(cc.Animation).play(a._name),this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)),this.changeNodeValue(e);break;case 6:t="",i="";for(var a in this.lan_Path)if(this.lan_Path[a].lanName==e){t=this.lan_Path[a].PathorText;break}(c=this.node.getComponent(cc.Sprite))&&(i=c.spriteFrame._name),""!=t&&""!=i?cc.loader.loadRes(e+"/"+t+"/"+i,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame),this.node.getComponent(cc.Sprite).spriteFrame=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)):""!=i&&""==t&&""!=this.default_path&&cc.loader.loadRes(e+"/"+this.default_path+"/"+i,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame),this.node.getComponent(cc.Sprite).spriteFrame=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this));break;case 7:cc.loader.loadResDir(e+"/"+this.gameName,function(e,t){e&&g.configs.debugLog&&console.warn(e)}.bind(this));break;case 8:t="",s="";for(var a in this.lan_changPathandText)if(this.lan_changPathandText[a].lanName==e){t=this.lan_changPathandText[a].path,s=this.lan_changPathandText[a].Texts;break}""!=t?cc.loader.loadRes(e+"/"+t,cc.Font,function(t,a){if(t)g.configs.debugLog&&console.warn(t);else if(this.node&&this.node.isValid){1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font),this.node.getComponent(cc.Label).font=a;var i=this.node.getComponent(cc.Label).string;for(var n in s)if(i==s[n].lanName){this.node.getComponent(cc.Label).string=s[n].Text;break}this.changeNodeValue(e)}else g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)):""!=this.default_path&&cc.loader.loadRes(e+"/"+this.default_path,cc.Font,function(t,a){if(t)g.configs.debugLog&&console.warn(t);else if(this.node&&this.node.isValid){1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Label).font),this.node.getComponent(cc.Label).font=a;var i=this.node.getComponent(cc.Label).string;if(""!=s){for(var n in s)if(i==s[n].lanName){this.node.getComponent(cc.Label).string=s[n].Text;break}}else this.node.getComponent(cc.Label).string=g.lan_Mgr.getLanToLan(i);this.changeNodeValue(e)}else g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this));break;case 9:if(""!=this.default_path){i="";var c=this.node.getComponent(cc.Sprite),l=this.node.getComponent(cc.Button);c&&(i=c.spriteFrame._name),""!=i&&cc.loader.loadRes(e+"/"+this.default_path+"/"+i,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(this.node.getComponent(cc.Sprite).spriteFrame),this.node.getComponent(cc.Sprite).spriteFrame=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)),l&&(l.normalSprite&&cc.loader.loadRes(e+"/"+this.default_path+"/"+l.normalSprite._name,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(l.normalSprite),this.node.getComponent(cc.Button).normalSprite=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)),l.pressedSprite&&cc.loader.loadRes(e+"/"+this.default_path+"/"+l.pressedSprite._name,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(l.pressedSprite),this.node.getComponent(cc.Button).pressedSprite=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)),l.disabledSprite&&cc.loader.loadRes(e+"/"+this.default_path+"/"+l.disabledSprite._name,cc.SpriteFrame,function(t,a){t?g.configs.debugLog&&console.warn(t):this.node&&this.node.isValid?(1==this.ResType&&g.multilinguals2Res[this.m_uuid].push(l.disabledSprite),this.node.getComponent(cc.Button).disabledSprite=a,this.changeNodeValue(e)):g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")}.bind(this)))}}},changeNodeValue:function(e){if(e)if(this.node){for(var t in this.lan_Color)if(this.lan_Color[t].lanName==e){this.node.color=this.lan_Color[t].Color;break}for(var t in this.lan_Pos)if(this.lan_Pos[t].lanName==e){this.node.x=this.lan_Pos[t].Pos.x,this.node.y=this.lan_Pos[t].Pos.y;break}for(var t in this.lan_Size)if(this.lan_Size[t].lanName==e){this.node.width=this.lan_Size[t].size.x,this.node.height=this.lan_Size[t].size.y;break}for(var t in this.lan_Rot)if(this.lan_Rot[t].lanName==e){this.node.rotation=this.lan_Rot[t].Rot;break}}else g.configs.debugLog&&console.warn("\u8282\u70b9\u4e0d\u5b58\u5728")},generateUUID:function(){var e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var a=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?a:3&a|8).toString(16)})}});cc._RF.pop()},{}],loading:[function(e,t,a){"use strict";cc._RF.push(t,"cd0c9HubmtDPKKWhbCH0H40","loading"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){}}),cc._RF.pop()},{}],menuItem:[function(e,t,a){"use strict";cc._RF.push(t,"1020edb6elNlZ9l/BvF6LeE","menuItem"),cc.Class({extends:cc.Component,properties:{item:{default:null,type:cc.Label},editBox:{default:null,type:cc.EditBox}},changeText:function(){var e=this;myGlobal.titleMenu.find(function(t){return t.node_id===e.item.node.node_id}).getChildByName("txt").getComponent(cc.Label).string=this.item.string=this.editBox.string}}),cc._RF.pop()},{}],menu:[function(e,t,a){"use strict";cc._RF.push(t,"c33c0x5+8VAL5Jtfzlf23eq","menu");var i=e("data");cc.Class({extends:cc.Component,properties:{item:{default:null,type:cc.Prefab},content:{default:null,type:cc.Node},menu:{default:null,type:cc.Node},checkMenuNode:{default:null,type:cc.Toggle}},onLoad:function(){for(var e=i.data_arry.length,t=0;t<e;t++){var a=cc.instantiate(this.item),n=a.getChildByName("item"),s={node_id:t};n.attr(s),n.getComponent(cc.Label).string=i.data_name[t],a.parent=this.content}},checkMemu:function(){this.checkMenuNode.isChecked?this.onShow():this.onHide()},onShow:function(){this.menu.active=!0},onHide:function(){this.menu.active=!1}}),cc._RF.pop()},{data:"data"}],popupDlg:[function(e,t,a){"use strict";cc._RF.push(t,"80e16Ga1/VHz48uKjx6droB","popupDlg");var i=e("../common/effect2_opit");cc.Class({extends:cc.Component,properties:{bg:{default:null,type:cc.Node,displayName:"\u80cc\u666f"},content:{default:null,type:cc.Label,displayName:"\u5185\u5bb9"},menus:{default:[],type:cc.Node,displayName:"\u83dc\u5355"}},ctor:function(){this.fn1=null,this.fn2=null,this.m_bDelay=!1,this.m_nDelay=0},restart:function(){this.fn1=null,this.fn2=null,this.m_bDelay=!1,this.m_nDelay=0,this.node.active=!1},onLoad:function(){this.node.inst=this,myGlobal.popupDlg=this,this.node.active=!1},onShow:function(e,t,a,n,s){var o=this.node.active;this.node.active=!0,this.m_bDelay=!1,this.content.string=e||"",this.fn1=t,this.fn2=a;for(var c=n||0,l=null==s?0:~~s,r=this.menus.length,h=0;h<r;++h)this.menus[h].active=!1;if(this.menus[c].active=!0,l>0)return this.m_bDelay=!0,void(this.m_nDelay=l);o||i.setEffect(this.node,[0,1])},onHide:function(){this.m_bDelay=!1,i.setEffect(this.node,4,function(){this.node.active=!1}.bind(this))},onConfirm:function(){this.fn1&&this.fn1(),this.onHide()},onClose:function(){this.fn2&&this.fn2(),this.onHide()}}),cc._RF.pop()},{"../common/effect2_opit":"effect2_opit"}],rotation:[function(e,t,a){"use strict";cc._RF.push(t,"c67bfgrkmBDTKLyA/4Cf4Hv","rotation");var i=e("data");cc.Class({extends:cc.Component,properties:{rotation_node:{default:null,type:cc.Node},title_parent_node:{default:null,type:cc.Node},choos_label:{default:null,type:cc.Label}},start:function(){this.choos_label.string="???",this._flag=!1,this.save_angle=0,this.final_rotation=[],this.title_node_array=this.title_parent_node.children,myGlobal.titleMenu=this.title_parent_node.children;for(var e=0;e<this.title_node_array.length;++e){var t={node_id:e};this.title_node_array[e].attr(t),this.final_rotation[e]=i.data_arry[e]}},go_around:function(){var e=this;if(this._flag)console.log("\u5f53\u524d\u6b63\u5728\u8f6c\u52a8");else if(this.rotation_node){this._flag=!0;for(var t=0;t<this.title_node_array.length;++t)this.title_node_array[t].getChildByName("mask").active=!1;this._r=parseInt(11*Math.random()),console.log("\u968f\u673a\u62bd\u53d6\u7684\u6570\u5b57"+this._r);var a=this._r;this.rotation_node.angle=0,this.save_angle=this.final_rotation[a]+3600,console.log("\u8f6c\u7684\u89d2\u5ea6"+this.save_angle),cc.tween(this.rotation_node).to(5,{angle:this.save_angle},{easing:"sineOut"}).call(function(){e.go_around_callfun()}).start()}},go_around_callfun:function(){this._flag=!1;for(var e=0;e<this.title_node_array.length;++e)this.title_node_array[e].getChildByName("mask").active=!1,this._r==this.title_node_array[e].node_id&&(this.title_node_array[e].getChildByName("mask").active=!0,this.choos_label.string=i.data_name[e])},onRestart:function(){cc.audioEngine.stopAll(),cc.game.end()}}),cc._RF.pop()},{data:"data"}],"use_v2.1-2.2.1_cc.Toggle_event":[function(e,t,a){"use strict";cc._RF.push(t,"81581XwD3NBDr4nonk9n60y","use_v2.1-2.2.1_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_isChecked=!0),cc._RF.pop()},{}]},{},["HelloWorld","HotUpdate","PolygonMask","UpdatePanel","menu","menuItem","gameInit","global","data","loading","rotation","use_v2.1-2.2.1_cc.Toggle_event","language","effect2_opit","popupDlg"]);