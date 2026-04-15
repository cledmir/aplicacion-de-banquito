import{a as gt}from"./chunk-KGZS5D2S.js";import{a as dt,b as ut,d as pt,e as _t}from"./chunk-WO5GM7AW.js";import"./chunk-NXPRQSXX.js";import{a as mt,b as ct}from"./chunk-UKWJKHNR.js";import{c as nt,e as it,j as ot,k as at,n as rt,r as st,u as lt}from"./chunk-FLMABQIG.js";import"./chunk-5MIBBDDM.js";import{H as se,I as Ke,J as Qe,K as Ue,L as Ge,M as Ze,N as Je,a as ze,b as Ye,h as re,s as qe,u as We,v as $e}from"./chunk-H35ETUBN.js";import{a as je,b as He,c as Xe,f as et,g as tt}from"./chunk-NYWZ6UTD.js";import{c as Ne,d as Ve}from"./chunk-QZT5HELB.js";import"./chunk-T2XNSXWO.js";import"./chunk-APVPEYCV.js";import{$ as g,$a as k,Bb as H,Cb as Te,Fb as h,Gb as De,Hb as u,I as O,Ib as oe,J,Jb as z,K as _e,Kb as Ee,Lb as Fe,Ma as d,Mb as S,Nb as I,R as ge,Ra as ve,Rb as Oe,Sa as Me,T as x,Tb as ae,Ua as xe,Ub as R,V as c,Va as f,Vb as m,Wa as Ce,Wb as Y,Xa as ke,Xb as X,Yb as Ae,_,a as D,aa as he,ab as Pe,bb as ee,bc as Le,ca as A,cc as Be,d as E,da as fe,db as we,fb as Se,ga as L,ha as be,i as Z,la as C,lb as P,mb as N,nb as V,ob as Ie,pb as te,qb as ne,qc as q,rb as j,sa as B,sb as a,sc as b,t as F,ta as ye,tb as r,u as ue,ub as w,vb as ie,wb as Re,z as pe}from"./chunk-X6AF3RZT.js";import{a as G,b as de}from"./chunk-C6Q5SG76.js";var St=["mat-menu-item",""],It=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],Rt=["mat-icon, [matMenuItemIcon]","*"];function Tt(o,s){o&1&&(he(),a(0,"svg",2),w(1,"polygon",3),r())}var Dt=["*"];function Et(o,s){if(o&1){let e=H();ie(0,"div",0),De("click",function(){_(e);let n=u();return g(n.closed.emit("click"))})("animationstart",function(n){_(e);let i=u();return g(i._onAnimationStart(n.animationName))})("animationend",function(n){_(e);let i=u();return g(i._onAnimationDone(n.animationName))})("animationcancel",function(n){_(e);let i=u();return g(i._onAnimationDone(n.animationName))}),ie(1,"div",1),z(2),Re()()}if(o&2){let e=u();R(e._classList),ae("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),Te("id",e.panelId),P("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var me=new x("MAT_MENU_PANEL"),T=(()=>{class o{_elementRef=c(B);_document=c(fe);_focusMonitor=c(re);_parentMenu=c(me,{optional:!0});_changeDetectorRef=c(q);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new E;_focused=new E;_highlighted=!1;_triggersSubmenu=!1;constructor(){c(Xe).load(Qe),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=k({type:o,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,n){t&1&&h("click",function(l){return n._checkDisabled(l)})("mouseenter",function(){return n._handleMouseEnter()}),t&2&&(P("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),ae("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",b],disableRipple:[2,"disableRipple","disableRipple",b]},exportAs:["matMenuItem"],attrs:St,ngContentSelectors:Rt,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,n){t&1&&(oe(It),z(0),a(1,"span",0),z(2,1),r(),w(3,"div",1),N(4,Tt,2,0,":svg:svg",2)),t&2&&(d(3),j("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),d(),V(n._triggersSubmenu?4:-1))},dependencies:[Ke],encapsulation:2,changeDetection:0})}return o})();var Ft=new x("MatMenuContent");var Ot=new x("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),le="_mat-menu-enter",W="_mat-menu-exit",v=(()=>{class o{_elementRef=c(B);_changeDetectorRef=c(q);_injector=c(A);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=se();_allItems;_directDescendantItems=new ye;_classList={};_panelAnimationState="void";_animationDone=new E;_isAnimating=C(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let t=this._previousPanelClass,n=G({},this._classList);t&&t.length&&t.split(" ").forEach(i=>{n[i]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(i=>{n[i]=!0}),this._elementRef.nativeElement.className=""),this._classList=n}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new L;close=this.closed;panelId=c($e).getId("mat-menu-panel-");constructor(){let e=c(Ot);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new We(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(O(this._directDescendantItems),J(e=>F(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let n=e.toArray(),i=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[i]&&!n[i].disabled?t.setActiveItem(i):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(O(this._directDescendantItems),J(t=>F(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:qe(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&n.setFocusOrigin("keyboard"),n.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=ve(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=de(G({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===W;(t||e===le)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===le||e===W)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(W),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?le:W)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(O(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=k({type:o,selectors:[["mat-menu"]],contentQueries:function(t,n,i){if(t&1&&Ee(i,Ft,5)(i,T,5)(i,T,4),t&2){let l;S(l=I())&&(n.lazyContent=l.first),S(l=I())&&(n._allItems=l),S(l=I())&&(n.items=l)}},viewQuery:function(t,n){if(t&1&&Fe(Me,5),t&2){let i;S(i=I())&&(n.templateRef=i.first)}},hostVars:3,hostBindings:function(t,n){t&2&&P("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",b],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:b(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Le([{provide:me,useExisting:o}])],ngContentSelectors:Dt,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,n){t&1&&(oe(),Se(0,Et,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2,changeDetection:0})}return o})(),At=new x("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let o=c(A);return()=>ot(o)}});var y=new WeakMap,Lt=(()=>{class o{_canHaveBackdrop;_element=c(B);_viewContainerRef=c(ke);_menuItemInstance=c(T,{optional:!0,self:!0});_dir=c(je,{optional:!0});_focusMonitor=c(re);_ngZone=c(be);_injector=c(A);_scrollStrategy=c(At);_changeDetectorRef=c(q);_animationsDisabled=se();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=D.EMPTY;_menuCloseSubscription=D.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=c(me,{optional:!0});this._parentMaterialMenu=t instanceof v?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&y.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=y.get(t);y.set(t,this),n&&n!==this&&n._closeMenu();let i=this._createOverlay(t),l=i.getConfig(),p=l.positionStrategy;this._setPosition(t,p),this._canHaveBackdrop?l.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:l.hasBackdrop=t.hasBackdrop??!1,i.hasAttached()||(i.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),t instanceof v&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(_e(t.close)).subscribe(()=>{p.withLockedPosition(!1).reapplyLastPosition(),p.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof v&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(pe(1)).subscribe(()=>{t.detach(),y.has(n)||n.lazyContent?.detach()}),n._setIsOpen(!1)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&y.delete(n),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=st(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof v&&this._menu._handleKeydown(n)})}return this._overlayRef}_getOverlayConfig(e){return new at({positionStrategy:rt(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let i=n.connectionPair.overlayX==="start"?"after":"before",l=n.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(i,l)})})}_setPosition(e,t){let[n,i]=e.xPosition==="before"?["end","start"]:["start","end"],[l,p]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[$,K]=[l,p],[Q,U]=[n,i],M=0;if(this._triggersSubmenu()){if(U=n=e.xPosition==="before"?"start":"end",i=Q=n==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let ce=this._parentMaterialMenu.items.first;this._parentInnerPadding=ce?ce._getHostElement().offsetTop:0}M=l==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||($=l==="top"?"bottom":"top",K=p==="top"?"bottom":"top");t.withPositions([{originX:n,originY:$,overlayX:Q,overlayY:l,offsetY:M},{originX:i,originY:$,overlayX:U,overlayY:l,offsetY:M},{originX:n,originY:K,overlayX:Q,overlayY:p,offsetY:-M},{originX:i,originY:K,overlayX:U,overlayY:p,offsetY:-M}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:Z(),i=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(ue(l=>this._menuOpen&&l!==this._menuItemInstance)):Z();return F(e,n,i,t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new it(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return y.get(e)===this}_triggerIsAriaDisabled(){return b(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){Ce()};static \u0275dir=ee({type:o})}return o})(),bt=(()=>{class o extends Lt{_cleanupTouchstart;_hoverSubscription=D.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new L;onMenuOpen=this.menuOpened;menuClosed=new L;onMenuClose=this.menuClosed;constructor(){super(!0);let e=c(xe);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Ye(t)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){ze(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(t){return new(t||o)};static \u0275dir=ee({type:o,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,n){t&1&&h("click",function(l){return n._handleClick(l)})("mousedown",function(l){return n._handleMousedown(l)})("keydown",function(l){return n._handleKeydown(l)}),t&2&&P("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu==null?null:n.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[we]})}return o})();var yt=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=Pe({type:o});static \u0275inj=ge({imports:[Ge,lt,He,nt]})}return o})();var Nt=()=>[1,2,3],Vt=(o,s)=>s.id;function jt(o,s){o&1&&(a(0,"div",8),w(1,"div",9)(2,"div",10)(3,"div",11),r())}function Ht(o,s){o&1&&(a(0,"div",6),te(1,jt,4,0,"div",8,Ie),r()),o&2&&(d(),ne(Be(0,Nt)))}function zt(o,s){o&1&&(a(0,"div",7)(1,"span",12),m(2,"\u{1F3E6}"),r(),a(3,"h3"),m(4,"No hay fondos creados"),r(),a(5,"p"),m(6,"Crea tu primer Banquito o Canastita para comenzar"),r(),a(7,"a",13)(8,"mat-icon"),m(9,"add"),r(),m(10," Crear Fondo "),r()())}function Yt(o,s){if(o&1){let e=H();a(0,"div",15),h("click",function(){let n=_(e).$implicit,i=u(2);return g(i.goToFund(n.id))}),a(1,"div",16)(2,"div",17)(3,"span",18),m(4),r(),a(5,"span",19),m(6),r()(),a(7,"span",20),m(8),r()(),a(9,"h3",21),m(10),r(),a(11,"div",22)(12,"div",23)(13,"span",24),m(14,"Valor opci\xF3n"),r(),a(15,"span",25),m(16),r()(),a(17,"div",23)(18,"span",24),m(19,"Inter\xE9s"),r(),a(20,"span",26),m(21),r()(),a(22,"div",23)(23,"span",24),m(24,"Opciones"),r(),a(25,"span",26),m(26),r()()(),a(27,"div",27)(28,"button",28),h("click",function(n){let i=_(e).$implicit;return u(2).goToFund(i.id),g(n.stopPropagation())}),a(29,"mat-icon"),m(30,"visibility"),r()(),a(31,"button",29),h("click",function(n){return n.stopPropagation()}),a(32,"mat-icon"),m(33,"more_vert"),r()(),a(34,"mat-menu",null,0)(36,"button",30),h("click",function(){let n=_(e).$implicit,i=u(2);return g(i.goToParticipants(n.id))}),a(37,"mat-icon"),m(38,"people"),r(),a(39,"span"),m(40,"Participantes"),r()(),a(41,"button",30),h("click",function(){let n=_(e).$implicit,i=u(2);return g(i.goToLoans(n.id))}),a(42,"mat-icon"),m(43,"account_balance_wallet"),r(),a(44,"span"),m(45,"Pr\xE9stamos"),r()(),a(46,"button",30),h("click",function(){let n=_(e).$implicit,i=u(2);return g(i.goToPayments(n.id))}),a(47,"mat-icon"),m(48,"receipt_long"),r(),a(49,"span"),m(50,"Pagos"),r()(),a(51,"button",30),h("click",function(){let n=_(e).$implicit,i=u(2);return g(i.goToLottery(n.id))}),a(52,"mat-icon"),m(53,"casino"),r(),a(54,"span"),m(55,"Sorteo"),r()(),a(56,"button",31),h("click",function(){let n=_(e).$implicit,i=u(2);return g(i.confirmDeleteFund(n))}),a(57,"mat-icon"),m(58,"delete_forever"),r(),a(59,"span"),m(60,"Eliminar Fondo"),r()()()()()}if(o&2){let e=s.$implicit,t=Oe(35);d(4),Y(e.type==="banquito"?"\u{1F3E6}":"\u{1F9FA}"),d(),R(e.type),d(),X(" ",e.type==="banquito"?"Banquito":"Canastita"," "),d(),R(e.status),d(),X(" ",e.status==="active"?"Activo":"Cerrado"," "),d(2),Y(e.name),d(6),X("S/ ",e.optionValue.toFixed(2)),d(5),Ae("",(e.interestRate*100).toFixed(0),"% ",e.type==="banquito"?"compuesto":"simple"," "),d(5),Y(e.totalOptions),d(5),j("matMenuTriggerFor",t)}}function Xt(o,s){if(o&1&&(a(0,"div",6),te(1,Yt,61,13,"div",14,Vt),r()),o&2){let e=u();d(),ne(e.funds())}}var vt=class o{constructor(s,e,t,n,i,l){this.fundRepo=s;this.participantRepo=e;this.loanRepo=t;this.paymentRepo=n;this.router=i;this.snackBar=l}funds=C([]);isLoading=C(!0);async ngOnInit(){await this.loadFunds()}async loadFunds(){this.isLoading.set(!0);try{let s=await this.fundRepo.getAll();this.funds.set(s)}catch(s){console.error("Error loading funds:",s)}finally{this.isLoading.set(!1)}}goToFund(s){this.router.navigate(["/admin/funds",s])}goToParticipants(s){this.router.navigate(["/admin/funds",s,"participants"])}goToLoans(s){this.router.navigate(["/admin/funds",s,"loans"])}goToPayments(s){this.router.navigate(["/admin/funds",s,"payments"])}goToLottery(s){this.router.navigate(["/admin/funds",s,"lottery"])}async confirmDeleteFund(s){if(!(!window.confirm(`\xBFEst\xE1s seguro de eliminar el fondo "${s.name}"?

Esta acci\xF3n eliminar\xE1 TODOS los datos asociados: participantes, pr\xE9stamos, pagos y sorteos.`)||!window.confirm(`\xDAltima confirmaci\xF3n: Se borrar\xE1 "${s.name}" y toda su informaci\xF3n de forma PERMANENTE. \xBFContinuar?`)))try{let[n,i,l]=await Promise.all([this.participantRepo.getByFund(s.id),this.loanRepo.getByFund(s.id),this.paymentRepo.getByFund(s.id)]);await Promise.all(l.map(p=>this.paymentRepo.delete(p.id))),await Promise.all(i.map(p=>this.loanRepo.delete(p.id))),await Promise.all(n.map(p=>this.participantRepo.delete(p.id))),await this.fundRepo.delete(s.id),this.snackBar.open(`Fondo "${s.name}" eliminado correctamente.`,"OK",{duration:4e3}),await this.loadFunds()}catch(n){console.error("Error deleting fund:",n),this.snackBar.open("Error al eliminar el fondo. Int\xE9ntalo de nuevo.","OK",{duration:4e3})}}static \u0275fac=function(e){return new(e||o)(f(dt),f(ut),f(pt),f(_t),f(Ne),f(mt))};static \u0275cmp=k({type:o,selectors:[["bf-fund-list"]],decls:14,vars:1,consts:[["menu","matMenu"],[1,"page","animate-fade-in"],[1,"page-header"],[1,"page-header__title"],[1,"page-header__subtitle"],["mat-flat-button","","color","primary","routerLink","/admin/funds/create","id","create-fund-btn"],[1,"card-grid"],[1,"empty-state"],[1,"skeleton-card"],[1,"skeleton",2,"height","24px","width","60%"],[1,"skeleton",2,"height","16px","width","40%","margin-top","8px"],[1,"skeleton",2,"height","40px","width","100%","margin-top","16px"],[1,"empty-state__icon"],["mat-flat-button","","color","primary","routerLink","/admin/funds/create"],[1,"fund-card"],[1,"fund-card",3,"click"],[1,"fund-card__header"],[1,"fund-card__type"],[1,"fund-card__emoji"],[1,"fund-card__type-label"],[1,"fund-card__status"],[1,"fund-card__name"],[1,"fund-card__details"],[1,"fund-card__detail"],[1,"detail-label"],[1,"detail-value","money"],[1,"detail-value"],[1,"fund-card__actions"],["mat-icon-button","",3,"click"],["mat-icon-button","",3,"click","matMenuTriggerFor"],["mat-menu-item","",3,"click"],["mat-menu-item","",1,"delete-menu-item",3,"click"]],template:function(e,t){e&1&&(a(0,"div",1)(1,"div",2)(2,"div")(3,"h1",3),m(4,"Fondos"),r(),a(5,"p",4),m(6,"Gestiona tus Banquitos y Canastitas"),r()(),a(7,"a",5)(8,"mat-icon"),m(9,"add"),r(),m(10," Nuevo Fondo "),r()(),N(11,Ht,3,1,"div",6)(12,zt,11,0,"div",7)(13,Xt,3,0,"div",6),r()),e&2&&(d(11),V(t.isLoading()?11:t.funds().length===0?12:13))},dependencies:[Ve,Je,Ze,Ue,tt,et,gt,yt,v,T,bt,ct],styles:['.empty-state[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;padding:4rem 2rem;text-align:center}.empty-state__icon[_ngcontent-%COMP%]{font-size:4rem;opacity:.6}.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#f0f6fc;font-size:1.5rem}.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#8b949e;max-width:400px}.skeleton-card[_ngcontent-%COMP%]{background:#161b22;border:1px solid rgba(240,246,252,.1);border-radius:12px;padding:1.5rem;min-height:200px}.fund-card[_ngcontent-%COMP%]{background:#161b22b3;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(240,246,252,.1);border-radius:12px;transition:all .25s ease}.fund-card[_ngcontent-%COMP%]:hover{border-color:#4caf504d;box-shadow:0 0 20px #4caf504d;transform:translateY(-2px)}.fund-card[_ngcontent-%COMP%]{padding:1.5rem;cursor:pointer;display:flex;flex-direction:column;gap:1rem}.fund-card__header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.fund-card__type[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.fund-card__emoji[_ngcontent-%COMP%]{font-size:1.5rem}.fund-card__type-label[_ngcontent-%COMP%]{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;padding:2px .5rem;border-radius:4px}.fund-card__type-label.banquito[_ngcontent-%COMP%]{color:#4caf50;background:#4caf501f}.fund-card__type-label.canastita[_ngcontent-%COMP%]{color:gold;background:#ffd7001f}.fund-card__status[_ngcontent-%COMP%]{font-size:.75rem;font-weight:500;padding:2px .5rem;border-radius:9999px}.fund-card__status.active[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.25rem;padding:2px .5rem;background:#3fb95026;color:#3fb950;border-radius:9999px;font-size:.75rem;font-weight:500}.fund-card__status.active[_ngcontent-%COMP%]:before{content:"";width:6px;height:6px;border-radius:50%;background:#3fb950}.fund-card__status.closed[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.25rem;padding:2px .5rem;background:#484f5826;color:#484f58;border-radius:9999px;font-size:.75rem;font-weight:500}.fund-card__status.closed[_ngcontent-%COMP%]:before{content:"";width:6px;height:6px;border-radius:50%;background:#484f58}.fund-card__name[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;color:#f0f6fc}.fund-card__details[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;padding:1rem 0;border-top:1px solid rgba(240,246,252,.1);border-bottom:1px solid rgba(240,246,252,.1)}.fund-card__detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.fund-card__detail[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%]{font-size:.75rem;color:#484f58}.fund-card__detail[_ngcontent-%COMP%]   .detail-value[_ngcontent-%COMP%]{font-size:.875rem;font-weight:600;color:#f0f6fc}.fund-card__actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.25rem}.fund-card__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#484f58}.fund-card__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{color:#f0f6fc}.delete-menu-item[_ngcontent-%COMP%]{color:#ff7b72!important}.delete-menu-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ff7b72!important}']})};export{vt as FundListComponent};
