window.__require=function t(i,e,s){function o(c,r){if(!e[c]){if(!i[c]){var h=c.split("/");if(h=h[h.length-1],!i[h]){var a="function"==typeof __require&&__require;if(!r&&a)return a(h,!0);if(n)return n(h,!0);throw new Error("Cannot find module '"+c+"'")}c=h}var l=e[c]={exports:{}};i[c][0].call(l.exports,function(t){return o(i[c][1][t]||t)},l,l.exports,t,i,e,s)}return e[c].exports}for(var n="function"==typeof __require&&__require,c=0;c<s.length;c++)o(s[c]);return o}({HelloWorld:[function(t,i){"use strict";cc._RF.push(i,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},text:"Hello, World!"},onLoad:function(){this.label.string=this.text},update:function(){}}),cc._RF.pop()},{}],audioMng:[function(t,i){"use strict";cc._RF.push(i,"a0eb7RvDqpMTYdtZ330OQE8","audioMng"),cc.Class({extends:cc.Component,properties:{bgm:{default:null,type:cc.AudioClip}},playMusic:function(){cc.audioEngine.playMusic(this.bgm,!0)},pauseMusic:function(){cc.audioEngine.pauseMusic(),cc.log("ddd")},resumeMusic:function(){cc.audioEngine.resumeMusic()},start:function(){this.playMusic()}}),cc._RF.pop()},{}],block:[function(t,i){"use strict";cc._RF.push(i,"a93721YFWZL8oSXD79ItmDW","block");var e=t("jigasaw"),s=t("puzzleType"),o=t("../utils");cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.v_0=50,this.a=-5,this.time=3,this.i_frame=30,this.dt=Math.round(1/this.i_frame*100)/100,this.finalCount=parseInt(this.time/this.dt),this.actionCount=0},blockSchedule:function(){this.schedule(this.pizzleAction,this.dt)},changeRotation:function(){var t=this.v_0+this.a*this.dt,i=o.rotationToVec2(this.node.angle,t);this.node.position=this.node.position.add(i);var e=cc.winSize.width/2,s=cc.winSize.height/2,n=this.node.position;if(Math.abs(n.x)+60>e){var c=cc.v2(-i.x,i.y).signAngle(cc.Vec2.UP)/Math.PI*180;this.node.angle=-c}else if(Math.abs(n.y)+60>s){var r=cc.v2(i.x,-i.y).signAngle(cc.Vec2.UP)/Math.PI*180;this.node.angle=-r}},pizzleAction:function(){this.actionCount===this.finalCount&&(this.actionCount=0,this.unschedule(this.pizzleAction)),this.changeRotation(),this.actionCount++},init:function(t){this.count=t,cc.resources.load("plist/jigasaw/rain",cc.SpriteAtlas,this.callBack(!0)),this.node.on("touchstart",this.touchStartCB,this),this.node.on("touchmove",this.touchMoveCB,this),this.node.on("touchend",this.touchEndCB,this),this.node.on("touchcancel",this.touchCancelCB,this)},initGrid:function(t){this.count=t,cc.resources.load("plist/jigasaw/rain",cc.SpriteAtlas,this.callBack(!1))},callBack:function(t){var i=this;return function(o,n){if(o)return cc.log(o);var c="rain_"+i.count,r=n.getSpriteFrame(c);i.node.getComponent(cc.Sprite).spriteFrame=r;var h={pizzleType:s.PIZZLENONE};switch(i.count){case 0:case 4:case 6:h={pizzleType:s.TORIGHT},i.node.attr(h);break;case 2:case 8:h={pizzleType:s.TOLEFT},i.node.attr(h);break;case 7:h={pizzleType:s.TOUP},i.node.attr(h);break;case 3:case 5:h={pizzleType:s.TOUPANDDOWN},i.node.attr(h);break;case 1:h={pizzleType:s.PIZZLENONE},i.node.attr(h);default:i.node.attr(h)}if(!t){var a={width:i.node.width,height:i.node.height,t:h.pizzleType,position:cc.Vec2.ZERO};e.inst.pizzleSizeArr.push(a),8==i.count&&e.inst.setPuzzlePos()}}},touchStartCB:function(t){var i=t.touch.getLocation(),e=this.node.parent.convertToNodeSpaceAR(i);this.node.setPosition(e),this.node.angle=0},touchMoveCB:function(t){var i=t.touch,e=this.node.position,s=i.getDelta(),o=e.add(s);this.node.setPosition(o)},touchEndCB:function(){this.coverGrid(),this.jigasawSuccess()},touchCancelCB:function(){},coverGrid:function(){var t=this,i=this.node.position;e.inst.pizzleArr.forEach(function(e){var s=e.pos,o=s.sub(i).mag();e.index===t.node.id&&(e.use=!1,e.index=-1),o<=100&&(e.use||(e.use=!0,t.node.position=s,e.index=t.node.id))})},jigasawSuccess:function(){e.inst.pizzleArr.every(function(t,i){return!(!t.use||t.index!==i)})&&(e.inst.gameEnd.active=!0)},onDestroy:function(){this.node.off("touchstart",this.touchStartCB,this),this.node.off("touchmove",this.touchMoveCB,this),this.node.off("touchend",this.touchEndCB,this),this.node.off("touchcancel",this.touchCancelCB,this)}}),cc._RF.pop()},{"../utils":"utils",jigasaw:"jigasaw",puzzleType:"puzzleType"}],contentMng:[function(t,i){"use strict";cc._RF.push(i,"13f8dQfHuRCFoKN9S/rjzyR","contentMng"),cc.Class({extends:cc.Component,properties:{part3ViewAll:{default:[],type:[cc.Node]}},onLoad:function(){this.part3ViewAll[0].on("mouseenter",this.mouseChange,this),this.part3ViewAll[0].on("mouseleave",this.cancleOpenUrl,this),this.part3ViewAll[0].on("touchstart",this.clickOpenUrl,this),this.part3ViewAll[0].on("touchcancel",this.cancleOpenUrl,this),this.part3ViewAll[0].on("touchend",this.cancleOpenUrl,this)},clickOpenUrl:function(){cc.sys.openURL("https://grasstailwarbler.github.io/H5/yaoyaole/")},cancleOpenUrl:function(){this.part3ViewAll[0].runAction(cc.scaleTo(.2,1))},mouseChange:function(){this.part3ViewAll[0].runAction(cc.scaleTo(.2,1.2))},onDestroy:function(){this.part3ViewAll[0].off("touchstart",this.clickOpenUrl,this),this.part3ViewAll[0].off("touchcancel",this.cancleOpenUrl,this),this.part3ViewAll[0].off("touchend",this.cancleOpenUrl,this),this.part3ViewAll[0].off("mouseenter",this.mouseChange,this),this.part3ViewAll[0].off("mouseleave",this.cancleOpenUrl,this)},goToPuzzle:function(){cc.sys.openURL("https://grasstailwarbler.github.io/H5/puzzle/")}}),cc._RF.pop()},{}],jigasaw:[function(t,i){"use strict";cc._RF.push(i,"519d4JsKDNBfpGWkX8TJSzE","jigasaw");var e=t("../utils"),s=t("puzzleType"),o=cc.Class({extends:cc.Component,properties:{block:{default:null,type:cc.Prefab},content:{default:null,type:cc.Node},desk:{default:null,type:cc.Node},gameEnd:{default:null,type:cc.Node}},ctor:function(){o.inst=this},onLoad:function(){this.Line=3,this.Row=3,this.length=9,this.pizzleSizeArr=[],this.initBlock(),this.puzzleAct(),this.initGameEnd(),this.a1=0,this.aa1=-this.content.width/2,this.b1=0,this.bb1=this.content.height/2},start:function(){},initBlock:function(){for(var t=0;t<this.length;t++){var i=cc.instantiate(this.block);i.getComponent("block").init(t),this.desk.addChild(i);var e={id:t};i.attr(e);var s=cc.instantiate(this.block);s.getComponent("block").initGrid(t),s.opacity=100,this.content.addChild(s)}},initGameEnd:function(){this.gameEnd.on("touchstart",function(){cc.game.end()})},setPuzzlePos:function(){this.myPizzleArr=[],this.sum=0;for(var t=0;t<this.Line;t++){this.myPizzleArr[t]=new Array;for(var i=0;i<this.Row;i++)this.myPizzleArr[t][i]=this.pizzleSizeArr[this.sum],this.sum++}var e=0;this.pizzleArr=[];for(var o=0;o<this.Line;o++)for(var n=0;n<this.Row;n++){var c,r;r=o-1>=0?this.myPizzleArr[o-1][n].t==s.TOUPANDDOWN||this.myPizzleArr[o-1][n].t==s.TODOWN?this.myPizzleArr[o-1][n].position.y-(this.myPizzleArr[o-1][n].height/2-40)-this.myPizzleArr[o][n].height/2:this.myPizzleArr[o][n].t==s.TOUPANDDOWN||this.myPizzleArr[o][n].t==s.TOUP?this.myPizzleArr[o-1][n].position.y-this.myPizzleArr[o-1][n].height/2-(this.myPizzleArr[o][n].height/2-40):this.myPizzleArr[o-1][n].position.y-this.myPizzleArr[o-1][n].height/2-this.myPizzleArr[o][n].height/2:this.content.height/2-this.myPizzleArr[o][n].height/2,c=n-1>=0?this.myPizzleArr[o][n-1].t==s.TORIGHT?this.myPizzleArr[o][n-1].position.x+this.myPizzleArr[o][n-1].width/2-40+this.myPizzleArr[o][n].width/2:this.myPizzleArr[o][n].t==s.TOLEFT?this.myPizzleArr[o][n-1].position.x+this.myPizzleArr[o][n-1].width/2-40+this.myPizzleArr[o][n].width/2:this.myPizzleArr[o][n-1].position.x+this.myPizzleArr[o][n-1].width/2+this.myPizzleArr[o][n].width/2:-this.content.width/2+this.myPizzleArr[o][n].width/2;var h=cc.v2(c,r);this.myPizzleArr[o][n].position=h;var a={pos:cc.v2.ZERO,index:-1,use:!1};a.pos=h,this.pizzleArr[e]=a,e++}for(var l=this.content.children,u=0;u<this.pizzleArr.length;u++)l[u].position=this.pizzleArr[u].pos},puzzleAct:function(){var t=this.content.width,i=this.desk.children,s=t/2;i.forEach(function(t,o){var n=40+40*o,c=e.rotationToVec2(n,s),r=cc.Vec2.ZERO.add(c);cc.tween(t).to(.1*o,{position:r,angle:n}).call(function(){o==i.length-1&&i.forEach(function(t){cc.tween(t).to(.2,{position:cc.Vec2.ZERO}).call(function(){t.getComponent("block").blockSchedule()}).start()})}).start()})}});i.exports=o,cc._RF.pop()},{"../utils":"utils",puzzleType:"puzzleType"}],movecenterbg:[function(t,i){"use strict";cc._RF.push(i,"3b315Cgq8tJNreudUDqqwIj","movecenterbg"),cc.Class({extends:cc.Component,properties:{bgNodeArray:{default:[],type:[cc.Node]},speedX:[cc.Integer],speedY:[cc.Integer]},onLoad:function(){this.pos0=this.bgNodeArray[0].position,this.pos1=this.bgNodeArray[1].position,this.pos2=this.bgNodeArray[2].position,this.node.on("mousemove",this.moveBackGroud,this),this.node.on("mouseenter",this.initBackGroud,this),this.node.on("mouseleave",this.initBackGroud,this)},initBackGroud:function(){this.bgNodeArray[0].position=this.pos0,this.bgNodeArray[1].position=this.pos1,this.bgNodeArray[2].position=this.pos2},moveBackGroud:function(t){if(this.speedX.length&&this.speedY.length){var i=t.getDelta().x,e=t.getDelta().y;i>0?(this.bgNodeArray[0].x-=.1*this.speedX[0],this.bgNodeArray[1].x-=.1*this.speedX[1],this.bgNodeArray[2].x-=.3*this.speedX[2]):i<0&&(this.bgNodeArray[0].x+=.1*this.speedX[0],this.bgNodeArray[1].x+=.1*this.speedX[1],this.bgNodeArray[2].x+=.3*this.speedX[2]),e>0?(this.bgNodeArray[0].y-=.1*this.speedY[0],this.bgNodeArray[1].y-=.1*this.speedY[1],this.bgNodeArray[2].y-=.1*this.speedY[2]):e<0&&(this.bgNodeArray[0].y+=.1*this.speedY[0],this.bgNodeArray[1].y<43?this.bgNodeArray[1].y+=.1*this.speedY[1]:this.bgNodeArray[1].y=this.bgNodeArray[1].y,this.bgNodeArray[2].y<-61?this.bgNodeArray[2].y+=.1*this.speedY[2]:this.bgNodeArray[2].y=this.bgNodeArray[2].y)}},onDestroy:function(){this.node.off("mousemove",this.moveBackGroud,this),this.node.off("mouseenter",this.initBackGroud,this)}}),cc._RF.pop()},{}],puzzleAudio:[function(t,i){"use strict";cc._RF.push(i,"564e6kGZMhCFrxU1AS6dVVj","puzzleAudio"),cc.Class({extends:cc.Component,properties:{bgm:{default:null,type:cc.AudioClip}},playMusic:function(){cc.audioEngine.playMusic(this.bgm,!0)},start:function(){this.playMusic()}}),cc._RF.pop()},{}],puzzleType:[function(t,i){"use strict";cc._RF.push(i,"29dab+ZEmtEkaIaxTHJPe/2","puzzleType"),i.exports=cc.Enum({PIZZLENONE:7,TORIGHT:6,TOLEFT:1,TOUP:2,TODOWN:3,TOUPANDDOWN:4}),cc._RF.pop()},{}],use_reversed_rotateBy:[function(t,i){"use strict";cc._RF.push(i,"51554IPLjVHzbSdJazMS60a","use_reversed_rotateBy"),cc.RotateBy._reverse=!0,cc._RF.pop()},{}],"use_v2.1-2.2.1_cc.Toggle_event":[function(t,i){"use strict";cc._RF.push(i,"14ee9sByWdHN7UUBWlcspOG","use_v2.1-2.2.1_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_isChecked=!0),cc._RF.pop()},{}],utils:[function(t,i){"use strict";cc._RF.push(i,"e2805t8h+BLfalXxrowTleM","utils");var e={rotationToVec2:function(t,i){var e=-t/180*Math.PI,s=cc.v2(Math.sin(e),Math.cos(e));s.normalizeSelf();var o=s.x*i,n=s.y*i;return cc.v2(o,n)}};i.exports=e,cc._RF.pop()},{}]},{},["HelloWorld","audioMng","contentMng","block","jigasaw","puzzleAudio","puzzleType","movecenterbg","utils","use_reversed_rotateBy","use_v2.1-2.2.1_cc.Toggle_event"]);