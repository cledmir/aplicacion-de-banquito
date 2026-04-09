import{a as ct}from"./chunk-6HYKITFG.js";import{a as mt}from"./chunk-ZVC5S2JH.js";import"./chunk-NXPRQSXX.js";import"./chunk-4DP6OF6C.js";import{c as nt,e as it,j as ot,k as at,n as rt,r as st,u as lt}from"./chunk-SQRPRPTF.js";import"./chunk-EY2QUZWS.js";import{H as se,I as Ue,J as Ge,K as Ke,L as $e,M as Ze,N as Je,a as je,b as Ye,h as re,s as qe,u as We,v as Qe}from"./chunk-UTG3RBKQ.js";import{a as He,b as ze,c as Xe,f as et,g as tt}from"./chunk-HFJULREK.js";import{c as Ne,d as Ve}from"./chunk-HGYLSFHN.js";import"./chunk-AUXOQIC4.js";import"./chunk-APVPEYCV.js";import{$ as _,$a as C,Bb as H,Cb as De,Fb as g,Gb as Ee,Hb as d,I as F,Ib as oe,J as Z,Jb as z,K as _e,Kb as Oe,Lb as Fe,Ma as u,Mb as w,Nb as I,R as ge,Ra as ve,Rb as Re,Sa as Me,T as M,Tb as ae,Ua as xe,Ub as T,V as c,Va as J,Vb as s,Wa as Ce,Wb as j,Xa as ke,Xb as Y,Yb as Ae,_ as p,a as D,aa as he,ab as Pe,bb as ee,bc as Le,ca as R,cc as Be,d as E,da as fe,db as we,fb as Ie,ga as A,ha as be,i as $,la as x,lb as k,mb as B,nb as N,ob as Te,pb as te,qb as ne,qc as X,rb as V,sa as L,sb as a,sc as f,t as O,ta as ye,tb as r,u as de,ub as P,vb as ie,wb as Se,z as pe}from"./chunk-X6AF3RZT.js";import{a as K,b as ue}from"./chunk-C6Q5SG76.js";var xt=["mat-menu-item",""],Ct=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],kt=["mat-icon, [matMenuItemIcon]","*"];function Pt(o,m){o&1&&(he(),a(0,"svg",2),P(1,"polygon",3),r())}var wt=["*"];function It(o,m){if(o&1){let e=H();ie(0,"div",0),Ee("click",function(){p(e);let n=d();return _(n.closed.emit("click"))})("animationstart",function(n){p(e);let i=d();return _(i._onAnimationStart(n.animationName))})("animationend",function(n){p(e);let i=d();return _(i._onAnimationDone(n.animationName))})("animationcancel",function(n){p(e);let i=d();return _(i._onAnimationDone(n.animationName))}),ie(1,"div",1),z(2),Se()()}if(o&2){let e=d();T(e._classList),ae("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),De("id",e.panelId),k("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var me=new M("MAT_MENU_PANEL"),S=(()=>{class o{_elementRef=c(L);_document=c(fe);_focusMonitor=c(re);_parentMenu=c(me,{optional:!0});_changeDetectorRef=c(X);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new E;_focused=new E;_highlighted=!1;_triggersSubmenu=!1;constructor(){c(Xe).load(Ge),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=C({type:o,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,n){t&1&&g("click",function(l){return n._checkDisabled(l)})("mouseenter",function(){return n._handleMouseEnter()}),t&2&&(k("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),ae("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",f],disableRipple:[2,"disableRipple","disableRipple",f]},exportAs:["matMenuItem"],attrs:xt,ngContentSelectors:kt,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,n){t&1&&(oe(Ct),z(0),a(1,"span",0),z(2,1),r(),P(3,"div",1),B(4,Pt,2,0,":svg:svg",2)),t&2&&(u(3),V("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),u(),N(n._triggersSubmenu?4:-1))},dependencies:[Ue],encapsulation:2,changeDetection:0})}return o})();var Tt=new M("MatMenuContent");var St=new M("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),le="_mat-menu-enter",q="_mat-menu-exit",y=(()=>{class o{_elementRef=c(L);_changeDetectorRef=c(X);_injector=c(R);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=se();_allItems;_directDescendantItems=new ye;_classList={};_panelAnimationState="void";_animationDone=new E;_isAnimating=x(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let t=this._previousPanelClass,n=K({},this._classList);t&&t.length&&t.split(" ").forEach(i=>{n[i]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(i=>{n[i]=!0}),this._elementRef.nativeElement.className=""),this._classList=n}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new A;close=this.closed;panelId=c(Qe).getId("mat-menu-panel-");constructor(){let e=c(St);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new We(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(F(this._directDescendantItems),Z(e=>O(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let n=e.toArray(),i=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[i]&&!n[i].disabled?t.setActiveItem(i):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(F(this._directDescendantItems),Z(t=>O(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:qe(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&n.setFocusOrigin("keyboard"),n.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=ve(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=ue(K({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===q;(t||e===le)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===le||e===q)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(q),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?le:q)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(F(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=C({type:o,selectors:[["mat-menu"]],contentQueries:function(t,n,i){if(t&1&&Oe(i,Tt,5)(i,S,5)(i,S,4),t&2){let l;w(l=I())&&(n.lazyContent=l.first),w(l=I())&&(n._allItems=l),w(l=I())&&(n.items=l)}},viewQuery:function(t,n){if(t&1&&Fe(Me,5),t&2){let i;w(i=I())&&(n.templateRef=i.first)}},hostVars:3,hostBindings:function(t,n){t&2&&k("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",f],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:f(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Le([{provide:me,useExisting:o}])],ngContentSelectors:wt,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,n){t&1&&(oe(),Ie(0,It,3,12,"ng-template"))},styles:[`mat-menu {
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
`],encapsulation:2,changeDetection:0})}return o})(),Dt=new M("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let o=c(R);return()=>ot(o)}});var b=new WeakMap,Et=(()=>{class o{_canHaveBackdrop;_element=c(L);_viewContainerRef=c(ke);_menuItemInstance=c(S,{optional:!0,self:!0});_dir=c(He,{optional:!0});_focusMonitor=c(re);_ngZone=c(be);_injector=c(R);_scrollStrategy=c(Dt);_changeDetectorRef=c(X);_animationsDisabled=se();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=D.EMPTY;_menuCloseSubscription=D.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=c(me,{optional:!0});this._parentMaterialMenu=t instanceof y?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&b.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=b.get(t);b.set(t,this),n&&n!==this&&n._closeMenu();let i=this._createOverlay(t),l=i.getConfig(),h=l.positionStrategy;this._setPosition(t,h),this._canHaveBackdrop?l.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:l.hasBackdrop=t.hasBackdrop??!1,i.hasAttached()||(i.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),t instanceof y&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(_e(t.close)).subscribe(()=>{h.withLockedPosition(!1).reapplyLastPosition(),h.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof y&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(pe(1)).subscribe(()=>{t.detach(),b.has(n)||n.lazyContent?.detach()}),n._setIsOpen(!1)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&b.delete(n),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=st(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof y&&this._menu._handleKeydown(n)})}return this._overlayRef}_getOverlayConfig(e){return new at({positionStrategy:rt(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let i=n.connectionPair.overlayX==="start"?"after":"before",l=n.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(i,l)})})}_setPosition(e,t){let[n,i]=e.xPosition==="before"?["end","start"]:["start","end"],[l,h]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[W,Q]=[l,h],[U,G]=[n,i],v=0;if(this._triggersSubmenu()){if(G=n=e.xPosition==="before"?"start":"end",i=U=n==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let ce=this._parentMaterialMenu.items.first;this._parentInnerPadding=ce?ce._getHostElement().offsetTop:0}v=l==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(W=l==="top"?"bottom":"top",Q=h==="top"?"bottom":"top");t.withPositions([{originX:n,originY:W,overlayX:U,overlayY:l,offsetY:v},{originX:i,originY:W,overlayX:G,overlayY:l,offsetY:v},{originX:n,originY:Q,overlayX:U,overlayY:h,offsetY:-v},{originX:i,originY:Q,overlayX:G,overlayY:h,offsetY:-v}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:$(),i=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(de(l=>this._menuOpen&&l!==this._menuItemInstance)):$();return O(e,n,i,t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new it(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return b.get(e)===this}_triggerIsAriaDisabled(){return f(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){Ce()};static \u0275dir=ee({type:o})}return o})(),pt=(()=>{class o extends Et{_cleanupTouchstart;_hoverSubscription=D.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new A;onMenuOpen=this.menuOpened;menuClosed=new A;onMenuClose=this.menuClosed;constructor(){super(!0);let e=c(xe);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Ye(t)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){je(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(t){return new(t||o)};static \u0275dir=ee({type:o,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,n){t&1&&g("click",function(l){return n._handleClick(l)})("mousedown",function(l){return n._handleMousedown(l)})("keydown",function(l){return n._handleKeydown(l)}),t&2&&k("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu==null?null:n.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[we]})}return o})();var _t=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=Pe({type:o});static \u0275inj=ge({imports:[$e,lt,ze,nt]})}return o})();var Ft=()=>[1,2,3],Rt=(o,m)=>m.id;function At(o,m){o&1&&(a(0,"div",8),P(1,"div",9)(2,"div",10)(3,"div",11),r())}function Lt(o,m){o&1&&(a(0,"div",6),te(1,At,4,0,"div",8,Te),r()),o&2&&(u(),ne(Be(0,Ft)))}function Bt(o,m){o&1&&(a(0,"div",7)(1,"span",12),s(2,"\u{1F3E6}"),r(),a(3,"h3"),s(4,"No hay fondos creados"),r(),a(5,"p"),s(6,"Crea tu primer Banquito o Canastita para comenzar"),r(),a(7,"a",13)(8,"mat-icon"),s(9,"add"),r(),s(10," Crear Fondo "),r()())}function Nt(o,m){if(o&1){let e=H();a(0,"div",15),g("click",function(){let n=p(e).$implicit,i=d(2);return _(i.goToFund(n.id))}),a(1,"div",16)(2,"div",17)(3,"span",18),s(4),r(),a(5,"span",19),s(6),r()(),a(7,"span",20),s(8),r()(),a(9,"h3",21),s(10),r(),a(11,"div",22)(12,"div",23)(13,"span",24),s(14,"Valor opci\xF3n"),r(),a(15,"span",25),s(16),r()(),a(17,"div",23)(18,"span",24),s(19,"Inter\xE9s"),r(),a(20,"span",26),s(21),r()(),a(22,"div",23)(23,"span",24),s(24,"Opciones"),r(),a(25,"span",26),s(26),r()()(),a(27,"div",27)(28,"button",28),g("click",function(n){let i=p(e).$implicit;return d(2).goToFund(i.id),_(n.stopPropagation())}),a(29,"mat-icon"),s(30,"visibility"),r()(),a(31,"button",29),g("click",function(n){return n.stopPropagation()}),a(32,"mat-icon"),s(33,"more_vert"),r()(),a(34,"mat-menu",null,0)(36,"button",30),g("click",function(){let n=p(e).$implicit,i=d(2);return _(i.goToParticipants(n.id))}),a(37,"mat-icon"),s(38,"people"),r(),a(39,"span"),s(40,"Participantes"),r()(),a(41,"button",30),g("click",function(){let n=p(e).$implicit,i=d(2);return _(i.goToLoans(n.id))}),a(42,"mat-icon"),s(43,"account_balance_wallet"),r(),a(44,"span"),s(45,"Pr\xE9stamos"),r()(),a(46,"button",30),g("click",function(){let n=p(e).$implicit,i=d(2);return _(i.goToPayments(n.id))}),a(47,"mat-icon"),s(48,"receipt_long"),r(),a(49,"span"),s(50,"Pagos"),r()(),a(51,"button",30),g("click",function(){let n=p(e).$implicit,i=d(2);return _(i.goToLottery(n.id))}),a(52,"mat-icon"),s(53,"casino"),r(),a(54,"span"),s(55,"Sorteo"),r()()()()()}if(o&2){let e=m.$implicit,t=Re(35);u(4),j(e.type==="banquito"?"\u{1F3E6}":"\u{1F9FA}"),u(),T(e.type),u(),Y(" ",e.type==="banquito"?"Banquito":"Canastita"," "),u(),T(e.status),u(),Y(" ",e.status==="active"?"Activo":"Cerrado"," "),u(2),j(e.name),u(6),Y("S/ ",e.optionValue.toFixed(2)),u(5),Ae("",(e.interestRate*100).toFixed(0),"% ",e.type==="banquito"?"compuesto":"simple"," "),u(5),j(e.totalOptions),u(5),V("matMenuTriggerFor",t)}}function Vt(o,m){if(o&1&&(a(0,"div",6),te(1,Nt,56,13,"div",14,Rt),r()),o&2){let e=d();u(),ne(e.funds())}}var gt=class o{constructor(m,e){this.fundRepo=m;this.router=e}funds=x([]);isLoading=x(!0);async ngOnInit(){await this.loadFunds()}async loadFunds(){this.isLoading.set(!0);try{let m=await this.fundRepo.getAll();this.funds.set(m)}catch(m){console.error("Error loading funds:",m)}finally{this.isLoading.set(!1)}}goToFund(m){this.router.navigate(["/admin/funds",m])}goToParticipants(m){this.router.navigate(["/admin/funds",m,"participants"])}goToLoans(m){this.router.navigate(["/admin/funds",m,"loans"])}goToPayments(m){this.router.navigate(["/admin/funds",m,"payments"])}goToLottery(m){this.router.navigate(["/admin/funds",m,"lottery"])}static \u0275fac=function(e){return new(e||o)(J(mt),J(Ne))};static \u0275cmp=C({type:o,selectors:[["bf-fund-list"]],decls:14,vars:1,consts:[["menu","matMenu"],[1,"page","animate-fade-in"],[1,"page-header"],[1,"page-header__title"],[1,"page-header__subtitle"],["mat-flat-button","","color","primary","routerLink","/admin/funds/create","id","create-fund-btn"],[1,"card-grid"],[1,"empty-state"],[1,"skeleton-card"],[1,"skeleton",2,"height","24px","width","60%"],[1,"skeleton",2,"height","16px","width","40%","margin-top","8px"],[1,"skeleton",2,"height","40px","width","100%","margin-top","16px"],[1,"empty-state__icon"],["mat-flat-button","","color","primary","routerLink","/admin/funds/create"],[1,"fund-card"],[1,"fund-card",3,"click"],[1,"fund-card__header"],[1,"fund-card__type"],[1,"fund-card__emoji"],[1,"fund-card__type-label"],[1,"fund-card__status"],[1,"fund-card__name"],[1,"fund-card__details"],[1,"fund-card__detail"],[1,"detail-label"],[1,"detail-value","money"],[1,"detail-value"],[1,"fund-card__actions"],["mat-icon-button","",3,"click"],["mat-icon-button","",3,"click","matMenuTriggerFor"],["mat-menu-item","",3,"click"]],template:function(e,t){e&1&&(a(0,"div",1)(1,"div",2)(2,"div")(3,"h1",3),s(4,"Fondos"),r(),a(5,"p",4),s(6,"Gestiona tus Banquitos y Canastitas"),r()(),a(7,"a",5)(8,"mat-icon"),s(9,"add"),r(),s(10," Nuevo Fondo "),r()(),B(11,Lt,3,1,"div",6)(12,Bt,11,0,"div",7)(13,Vt,3,0,"div",6),r()),e&2&&(u(11),N(t.isLoading()?11:t.funds().length===0?12:13))},dependencies:[Ve,Je,Ze,Ke,tt,et,ct,_t,y,S,pt],styles:['.empty-state[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;padding:4rem 2rem;text-align:center}.empty-state__icon[_ngcontent-%COMP%]{font-size:4rem;opacity:.6}.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#f0f6fc;font-size:1.5rem}.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#8b949e;max-width:400px}.skeleton-card[_ngcontent-%COMP%]{background:#161b22;border:1px solid rgba(240,246,252,.1);border-radius:12px;padding:1.5rem;min-height:200px}.fund-card[_ngcontent-%COMP%]{background:#161b22b3;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(240,246,252,.1);border-radius:12px;transition:all .25s ease}.fund-card[_ngcontent-%COMP%]:hover{border-color:#4caf504d;box-shadow:0 0 20px #4caf504d;transform:translateY(-2px)}.fund-card[_ngcontent-%COMP%]{padding:1.5rem;cursor:pointer;display:flex;flex-direction:column;gap:1rem}.fund-card__header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.fund-card__type[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.fund-card__emoji[_ngcontent-%COMP%]{font-size:1.5rem}.fund-card__type-label[_ngcontent-%COMP%]{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;padding:2px .5rem;border-radius:4px}.fund-card__type-label.banquito[_ngcontent-%COMP%]{color:#4caf50;background:#4caf501f}.fund-card__type-label.canastita[_ngcontent-%COMP%]{color:gold;background:#ffd7001f}.fund-card__status[_ngcontent-%COMP%]{font-size:.75rem;font-weight:500;padding:2px .5rem;border-radius:9999px}.fund-card__status.active[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.25rem;padding:2px .5rem;background:#3fb95026;color:#3fb950;border-radius:9999px;font-size:.75rem;font-weight:500}.fund-card__status.active[_ngcontent-%COMP%]:before{content:"";width:6px;height:6px;border-radius:50%;background:#3fb950}.fund-card__status.closed[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.25rem;padding:2px .5rem;background:#484f5826;color:#484f58;border-radius:9999px;font-size:.75rem;font-weight:500}.fund-card__status.closed[_ngcontent-%COMP%]:before{content:"";width:6px;height:6px;border-radius:50%;background:#484f58}.fund-card__name[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;color:#f0f6fc}.fund-card__details[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;padding:1rem 0;border-top:1px solid rgba(240,246,252,.1);border-bottom:1px solid rgba(240,246,252,.1)}.fund-card__detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.fund-card__detail[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%]{font-size:.75rem;color:#484f58}.fund-card__detail[_ngcontent-%COMP%]   .detail-value[_ngcontent-%COMP%]{font-size:.875rem;font-weight:600;color:#f0f6fc}.fund-card__actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.25rem}.fund-card__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#484f58}.fund-card__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{color:#f0f6fc}']})};export{gt as FundListComponent};
