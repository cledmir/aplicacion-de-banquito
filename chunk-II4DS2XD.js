import{a as ve,b as De,c as xe}from"./chunk-6U5LZ4OZ.js";import{a as ye,b as Ce,c as be}from"./chunk-54UIQETK.js";import"./chunk-TZGAAX55.js";import{a as le,b as de}from"./chunk-SX34FIAB.js";import"./chunk-JJTAEKZG.js";import{a as fe,b as _e}from"./chunk-XIM724S4.js";import{d as pt,e as ce,f as me,g as T,h as k,i as K,k as pe,l as ue,m as ge,p as Y,r as he,u as Z}from"./chunk-MV5J2EXT.js";import{b as ee,c as ie}from"./chunk-ITGG4TJN.js";import{a as te}from"./chunk-WLHNA6OT.js";import{b as jt,f as Vt,i as zt,k as Ut,m as Ht,n as Gt,q as Wt,r as Jt,x as Xt}from"./chunk-6FAFRAAT.js";import{L as mt,O as ne,Q as ae,R as oe,S as re,T as se,a as dt,b as Qt,e as Q,g as $t,h as ct,j as qt,r as Kt,s as Yt,v as Zt,w as $,z as q}from"./chunk-GWCKMIE2.js";import"./chunk-JSP455WD.js";import{a as Rt,d as Bt}from"./chunk-BQQOUKW2.js";import{A as Nt}from"./chunk-MKBIXNZ4.js";import"./chunk-APVPEYCV.js";import{$ as w,$a as x,$b as st,Bb as ot,Cb as wt,Fb as G,Hb as _,I as L,Lb as St,Ma as p,Mb as It,Nb as Tt,Q as R,R as B,Ra as xt,Sa as Ot,T as C,Tb as kt,Ua as At,V as c,Va as v,Vb as l,Wb as W,Xb as I,Yb as Et,_ as P,_b as rt,ab as j,ac as lt,ca as f,d as y,da as bt,db as V,dc as Ft,eb as z,f as et,ga as N,ha as vt,la as u,lb as U,mb as O,nb as A,pb as nt,qa as Dt,qb as at,qc as Lt,r as F,rb as H,sa as it,sb as s,t as Ct,tb as r,u as M,ub as S,yb as Mt,z as D,zb as Pt}from"./chunk-X6AF3RZT.js";import"./chunk-FK6H3RFT.js";import{a as h,b as yt}from"./chunk-C6Q5SG76.js";function Ee(n,a){}var b=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var gt=(()=>{class n extends me{_elementRef=c(it);_focusTrapFactory=c(Yt);_config;_interactivityChecker=c(Kt);_ngZone=c(vt);_focusMonitor=c(qt);_renderer=c(At);_changeDetectorRef=c(Lt);_injector=c(f);_platform=c($t);_document=c(bt);_portalOutlet;_focusTrapped=new y;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=c(b,{optional:!0})||new b,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(t){this._ariaLabelledByQueue.push(t),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(t){let e=this._ariaLabelledByQueue.indexOf(t);e>-1&&(this._ariaLabelledByQueue.splice(e,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(t){this._portalOutlet.hasAttached();let e=this._portalOutlet.attachComponentPortal(t);return this._contentAttached(),e}attachTemplatePortal(t){this._portalOutlet.hasAttached();let e=this._portalOutlet.attachTemplatePortal(t);return this._contentAttached(),e}attachDomPortal=t=>{this._portalOutlet.hasAttached();let e=this._portalOutlet.attachDomPortal(t);return this._contentAttached(),e};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(t,e){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{o(),m(),t.removeAttribute("tabindex")},o=this._renderer.listen(t,"blur",i),m=this._renderer.listen(t,"mousedown",i)})),t.focus(e)}_focusByCssSelector(t,e){let i=this._elementRef.nativeElement.querySelector(t);i&&this._forceFocus(i,e)}_trapFocus(t){this._isDestroyed||xt(()=>{let e=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||e.focus(t);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(t)||this._focusDialogContainer(t);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',t);break;default:this._focusByCssSelector(this._config.autoFocus,t);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let t=this._config.restoreFocus,e=null;if(typeof t=="string"?e=this._document.querySelector(t):typeof t=="boolean"?e=t?this._elementFocusedBeforeDialogWasOpened:null:t&&(e=t),this._config.restoreFocus&&e&&typeof e.focus=="function"){let i=Q(),o=this._elementRef.nativeElement;(!i||i===this._document.body||i===o||o.contains(i))&&(this._focusMonitor?(this._focusMonitor.focusVia(e,this._closeInteractionType),this._closeInteractionType=null):e.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(t){this._elementRef.nativeElement.focus?.(t)}_containsFocus(){let t=this._elementRef.nativeElement,e=Q();return t===e||t.contains(e)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=Q()))}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=x({type:n,selectors:[["cdk-dialog-container"]],viewQuery:function(e,i){if(e&1&&St(T,7),e&2){let o;It(o=Tt())&&(i._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(e,i){e&2&&U("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null)},features:[V],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(e,i){e&1&&z(0,Ee,0,0,"ng-template",0)},dependencies:[T],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return n})(),E=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new y;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(a,t){this.overlayRef=a,this.config=t,this.disableClose=t.disableClose,this.backdropClick=a.backdropClick(),this.keydownEvents=a.keydownEvents(),this.outsidePointerEvents=a.outsidePointerEvents(),this.id=t.id,this.keydownEvents.subscribe(e=>{e.keyCode===27&&!this.disableClose&&!$(e)&&(e.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=a.detachments().subscribe(()=>{t.closeOnOverlayDetachments!==!1&&this.close()})}close(a,t){if(this._canClose(a)){let e=this.closed;this.containerInstance._closeInteractionType=t?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),e.next(a),e.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(a="",t=""){return this.overlayRef.updateSize({width:a,height:t}),this}addPanelClass(a){return this.overlayRef.addPanelClass(a),this}removePanelClass(a){return this.overlayRef.removePanelClass(a),this}_canClose(a){let t=this.config;return!!this.containerInstance&&(!t.closePredicate||t.closePredicate(a,t,this.componentInstance))}},Fe=new C("DialogScrollStrategy",{providedIn:"root",factory:()=>{let n=c(f);return()=>K(n)}}),Le=new C("DialogData"),Re=new C("DefaultDialogConfig");function Be(n){let a=u(n),t=new N;return{valueSignal:a,get value(){return a()},change:t,ngOnDestroy(){t.complete()}}}var ht=(()=>{class n{_injector=c(f);_defaultOptions=c(Re,{optional:!0});_parentDialog=c(n,{optional:!0,skipSelf:!0});_overlayContainer=c(ue);_idGenerator=c(q);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new y;_afterOpenedAtThisLevel=new y;_ariaHiddenElements=new Map;_scrollStrategy=c(Fe);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=F(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(L(void 0)));constructor(){}open(t,e){let i=this._defaultOptions||new b;e=h(h({},i),e),e.id=e.id||this._idGenerator.getId("cdk-dialog-"),e.id&&this.getDialogById(e.id);let o=this._getOverlayConfig(e),m=he(this._injector,o),d=new E(m,e),g=this._attachContainer(m,d,e);if(d.containerInstance=g,!this.openDialogs.length){let tt=this._overlayContainer.getContainerElement();g._focusTrapped?g._focusTrapped.pipe(D(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(tt)}):this._hideNonDialogContentFromAssistiveTechnology(tt)}return this._attachDialogContent(t,d,g,e),this.openDialogs.push(d),d.closed.subscribe(()=>this._removeOpenDialog(d,!0)),this.afterOpened.next(d),d}closeAll(){ut(this.openDialogs,t=>t.close())}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){ut(this._openDialogsAtThisLevel,t=>{t.config.closeOnDestroy===!1&&this._removeOpenDialog(t,!1)}),ut(this._openDialogsAtThisLevel,t=>t.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(t){let e=new pe({positionStrategy:t.positionStrategy||Y().centerHorizontally().centerVertically(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,width:t.width,height:t.height,disposeOnNavigation:t.closeOnNavigation,disableAnimations:t.disableAnimations});return t.backdropClass&&(e.backdropClass=t.backdropClass),e}_attachContainer(t,e,i){let o=i.injector||i.viewContainerRef?.injector,m=[{provide:b,useValue:i},{provide:E,useValue:e},{provide:ge,useValue:t}],d;i.container?typeof i.container=="function"?d=i.container:(d=i.container.type,m.push(...i.container.providers(i))):d=gt;let g=new pt(d,i.viewContainerRef,f.create({parent:o||this._injector,providers:m}));return t.attach(g).instance}_attachDialogContent(t,e,i,o){if(t instanceof Ot){let m=this._createInjector(o,e,i,void 0),d={$implicit:o.data,dialogRef:e};o.templateContext&&(d=h(h({},d),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),i.attachTemplatePortal(new ce(t,null,d,m))}else{let m=this._createInjector(o,e,i,this._injector),d=i.attachComponentPortal(new pt(t,o.viewContainerRef,m));e.componentRef=d,e.componentInstance=d.instance}}_createInjector(t,e,i,o){let m=t.injector||t.viewContainerRef?.injector,d=[{provide:Le,useValue:t.data},{provide:E,useValue:e}];return t.providers&&(typeof t.providers=="function"?d.push(...t.providers(e,t,i)):d.push(...t.providers)),t.direction&&(!m||!m.get(dt,null,{optional:!0}))&&d.push({provide:dt,useValue:Be(t.direction)}),f.create({parent:m||o,providers:d})}_removeOpenDialog(t,e){let i=this.openDialogs.indexOf(t);i>-1&&(this.openDialogs.splice(i,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,m)=>{o?m.setAttribute("aria-hidden",o):m.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),e&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(t){if(t.parentElement){let e=t.parentElement.children;for(let i=e.length-1;i>-1;i--){let o=e[i];o!==t&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&!o.hasAttribute("popover")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(e){return new(e||n)};static \u0275prov=R({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function ut(n,a){let t=n.length;for(;t--;)a(n[t])}var Me=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=j({type:n});static \u0275inj=B({providers:[ht],imports:[Z,k,Zt,k]})}return n})();function Ne(n,a){}var X=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},ft="mdc-dialog--open",Pe="mdc-dialog--opening",we="mdc-dialog--closing",je=150,Ve=75,ze=(()=>{class n extends gt{_animationStateChanged=new N;_animationsEnabled=!mt();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?Ie(this._config.enterAnimationDuration)??je:0;_exitAnimationDuration=this._animationsEnabled?Ie(this._config.exitAnimationDuration)??Ve:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Se,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Pe,ft)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(ft),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(ft),this._animationsEnabled?(this._hostElement.style.setProperty(Se,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(we)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(t){this._actionSectionCount+=t,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(Pe,we)}_waitForAnimationToComplete(t,e){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(e,t)}_requestAnimationFrame(t){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(t):t()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:t})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(t){let e=super.attachComponentPortal(t);return e.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),e}static \u0275fac=(()=>{let t;return function(i){return(t||(t=Dt(n)))(i||n)}})();static \u0275cmp=x({type:n,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(e,i){e&2&&(wt("id",i._config.id),U("aria-modal",i._config.ariaModal)("role",i._config.role)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null),kt("_mat-animation-noopable",!i._animationsEnabled)("mat-mdc-dialog-container-with-actions",i._actionSectionCount>0))},features:[V],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(e,i){e&1&&(s(0,"div",0)(1,"div",1),z(2,Ne,0,0,"ng-template",2),r()())},dependencies:[T],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2})}return n})(),Se="--mat-dialog-transition-duration";function Ie(n){return n==null?null:typeof n=="number"?n:n.endsWith("ms")?ct(n.substring(0,n.length-2)):n.endsWith("s")?ct(n.substring(0,n.length-1))*1e3:n==="0"?0:null}var J=(function(n){return n[n.OPEN=0]="OPEN",n[n.CLOSING=1]="CLOSING",n[n.CLOSED=2]="CLOSED",n})(J||{}),_t=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new et(1);_beforeClosed=new et(1);_result;_closeFallbackTimeout;_state=J.OPEN;_closeInteractionType;constructor(a,t,e){this._ref=a,this._config=t,this._containerInstance=e,this.disableClose=t.disableClose,this.id=a.id,a.addPanelClass("mat-mdc-dialog-panel"),e._animationStateChanged.pipe(M(i=>i.state==="opened"),D(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),e._animationStateChanged.pipe(M(i=>i.state==="closed"),D(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),a.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Ct(this.backdropClick(),this.keydownEvents().pipe(M(i=>i.keyCode===27&&!this.disableClose&&!$(i)))).subscribe(i=>{this.disableClose||(i.preventDefault(),Ue(this,i.type==="keydown"?"keyboard":"mouse"))})}close(a){let t=this._config.closePredicate;t&&!t(a,this._config,this.componentInstance)||(this._result=a,this._containerInstance._animationStateChanged.pipe(M(e=>e.state==="closing"),D(1)).subscribe(e=>{this._beforeClosed.next(a),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),e.totalTime+100)}),this._state=J.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(a){let t=this._ref.config.positionStrategy;return a&&(a.left||a.right)?a.left?t.left(a.left):t.right(a.right):t.centerHorizontally(),a&&(a.top||a.bottom)?a.top?t.top(a.top):t.bottom(a.bottom):t.centerVertically(),this._ref.updatePosition(),this}updateSize(a="",t=""){return this._ref.updateSize(a,t),this}addPanelClass(a){return this._ref.addPanelClass(a),this}removePanelClass(a){return this._ref.removePanelClass(a),this}getState(){return this._state}_finishDialogClose(){this._state=J.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function Ue(n,a,t){return n._closeInteractionType=a,n.close(t)}var He=new C("MatMdcDialogData"),Ge=new C("mat-mdc-dialog-default-options"),We=new C("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let n=c(f);return()=>K(n)}}),Qe=(()=>{class n{_defaultOptions=c(Ge,{optional:!0});_scrollStrategy=c(We);_parentDialog=c(n,{optional:!0,skipSelf:!0});_idGenerator=c(q);_injector=c(f);_dialog=c(ht);_animationsDisabled=mt();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new y;_afterOpenedAtThisLevel=new y;dialogConfigClass=X;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=F(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(L(void 0)));constructor(){this._dialogRefConstructor=_t,this._dialogContainerType=ze,this._dialogDataToken=He}open(t,e){let i;e=h(h({},this._defaultOptions||new X),e),e.id=e.id||this._idGenerator.getId("mat-mdc-dialog-"),e.scrollStrategy=e.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(t,yt(h({},e),{positionStrategy:Y(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||e.enterAnimationDuration?.toLocaleString()==="0"||e.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:e},{provide:b,useValue:e}]},templateContext:()=>({dialogRef:i}),providers:(m,d,g)=>(i=new this._dialogRefConstructor(m,e,g),i.updatePosition(e?.position),[{provide:this._dialogContainerType,useValue:g},{provide:this._dialogDataToken,useValue:d.data},{provide:this._dialogRefConstructor,useValue:i}])}));return i.componentRef=o.componentRef,i.componentInstance=o.componentInstance,this.openDialogs.push(i),this.afterOpened.next(i),i.afterClosed().subscribe(()=>{let m=this.openDialogs.indexOf(i);m>-1&&(this.openDialogs.splice(m,1),this.openDialogs.length||this._getAfterAllClosed().next())}),i}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(t){let e=t.length;for(;e--;)t[e].close()}static \u0275fac=function(e){return new(e||n)};static \u0275prov=R({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Te=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=j({type:n});static \u0275inj=B({providers:[Qe],imports:[Me,Z,k,Qt]})}return n})();var $e=n=>["/admin/funds",n],qe=(n,a)=>a.uid,Ke=(n,a)=>a.id;function Ye(n,a){if(n&1&&(s(0,"p",3),l(1),r()),n&2){let t=_();p(),W(t.fund().name)}}function Ze(n,a){n&1&&(s(0,"div",5),S(1,"mat-spinner",6),s(2,"p",7),l(3,"Cargando participantes..."),r()())}function Je(n,a){if(n&1&&(s(0,"mat-option",13),l(1),r()),n&2){let t=a.$implicit;H("value",t.uid),p(),Et(" ",t.displayName," (",t.email,") ")}}function Xe(n,a){n&1&&S(0,"mat-spinner",17)}function ti(n,a){n&1&&(Mt(0),l(1,"Agregar"),Pt())}function ei(n,a){n&1&&(s(0,"span",28),l(1,"Tard\xEDo"),r())}function ii(n,a){if(n&1){let t=ot();s(0,"div",21)(1,"span",26),l(2),r(),s(3,"span",27),l(4),O(5,ei,2,0,"span",28),r(),s(6,"span",29),l(7),r(),s(8,"span",30),l(9),r(),s(10,"span",31),l(11,"Activo"),r(),s(12,"div",32)(13,"button",33),G("click",function(){let i=P(t).$implicit,o=_(3);return w(o.confirmRemove(i))}),s(14,"mat-icon"),l(15,"delete_outline"),r()()()()}if(n&2){let t=a.$implicit,e=a.$index,i=_(3);p(2),W(e+1),p(2),I(" ",t.name," "),p(),A(t.isLateEntry?5:-1),p(2),W(i.getCurrentOptions(t)),p(2),I(" S/ ",(i.getCurrentOptions(t)*i.fund().optionValue).toFixed(2)," ")}}function ni(n,a){if(n&1&&(s(0,"div",18)(1,"div",20)(2,"span"),l(3,"#"),r(),s(4,"span"),l(5,"Nombre"),r(),s(6,"span"),l(7,"Opciones"),r(),s(8,"span"),l(9,"Aporte Mensual"),r(),s(10,"span"),l(11,"Estado"),r(),s(12,"span"),l(13,"Acciones"),r()(),nt(14,ii,16,5,"div",21,Ke),s(16,"div",22),S(17,"span"),s(18,"span",23),l(19,"Total"),r(),s(20,"span",24),l(21),r(),s(22,"span",25),l(23),r(),S(24,"span")(25,"span"),r()()),n&2){let t=_(2);p(14),at(t.participants()),p(7),I("",t.totalOptions()," opc."),p(2),I(" S/ ",(t.totalOptions()*t.fund().optionValue).toFixed(2)," ")}}function ai(n,a){n&1&&(s(0,"div",19)(1,"span",34),l(2,"\u{1F465}"),r(),s(3,"h3"),l(4,"Sin participantes"),r(),s(5,"p"),l(6,"Agrega participantes usando el formulario de arriba"),r()())}function oi(n,a){if(n&1){let t=ot();s(0,"div",8)(1,"h3",9)(2,"mat-icon"),l(3,"person_add"),r(),l(4," Agregar Participante "),r(),s(5,"div",10)(6,"mat-form-field",11)(7,"mat-label"),l(8,"Seleccionar usuario"),r(),s(9,"mat-select",12),lt("ngModelChange",function(i){P(t);let o=_();return st(o.selectedUserId,i)||(o.selectedUserId=i),w(i)}),nt(10,Je,2,3,"mat-option",13,qe),r()(),s(12,"mat-form-field",14)(13,"mat-label"),l(14,"Opciones"),r(),s(15,"input",15),lt("ngModelChange",function(i){P(t);let o=_();return st(o.initialOptions,i)||(o.initialOptions=i),w(i)}),r()(),s(16,"button",16),G("click",function(){P(t);let i=_();return w(i.addParticipant())}),O(17,Xe,1,0,"mat-spinner",17)(18,ti,2,0,"ng-container"),r()()(),O(19,ni,26,2,"div",18)(20,ai,7,0,"div",19)}if(n&2){let t=_();p(9),rt("ngModel",t.selectedUserId),p(),at(t.availableUsers()),p(5),rt("ngModel",t.initialOptions),p(),H("disabled",t.isAdding()),p(),A(t.isAdding()?17:18),p(2),A(t.participants().length>0?19:20)}}var ke=class n{constructor(a,t,e,i,o,m){this.route=a;this.participantRepo=t;this.fundRepo=e;this.periodRepo=i;this.firebase=o;this.snackBar=m}fundId="";fund=u(null);period=u(null);participants=u([]);availableUsers=u([]);totalOptions=u(0);selectedUserId="";initialOptions=1;isAdding=u(!1);isLoading=u(!0);async ngOnInit(){this.fundId=this.route.snapshot.paramMap.get("fundId")??"",await this.loadData()}async loadData(){this.isLoading.set(!0);try{let a=await this.fundRepo.getById(this.fundId);if(this.fund.set(a),a){let[t,e]=await Promise.all([this.periodRepo.getById(a.periodId),this.participantRepo.getByFund(this.fundId)]);this.period.set(t),this.participants.set(e),this.calculateTotals(e),await this.loadAvailableUsers(e)}}catch(a){console.error("Error loading data:",a)}finally{this.isLoading.set(!1)}}async loadAvailableUsers(a){try{let t=await this.firebase.getDocuments("users"),e=new Set(a.map(o=>o.userId)),i=t.filter(o=>!e.has(o.id)).map(o=>({uid:o.id,displayName:o.displayName??"",email:o.email??""}));this.availableUsers.set(i)}catch(t){console.error("Error loading users:",t)}}async addParticipant(){if(!this.selectedUserId){this.snackBar.open("Selecciona un usuario","OK",{duration:2e3});return}this.isAdding.set(!0);try{let a=this.availableUsers().find(i=>i.uid===this.selectedUserId);if(!a)return;let e=this.period()?.months[0]??"";await this.participantRepo.create({fundId:this.fundId,userId:a.uid,name:a.displayName,initialOptions:this.initialOptions,startMonth:e}),this.snackBar.open(`${a.displayName} agregado al fondo`,"OK",{duration:2e3}),this.selectedUserId="",this.initialOptions=1,await this.loadData()}catch(a){console.error("Error adding participant:",a),this.snackBar.open("Error al agregar participante","OK",{duration:3e3})}finally{this.isAdding.set(!1)}}confirmRemove(a){let t=a.name;this.snackBar.open(`\xBFEliminar a ${t} del fondo?`,"S\xED, eliminar",{duration:5e3}).onAction().subscribe(()=>{this.removeParticipant(a)})}async removeParticipant(a){try{await this.participantRepo.delete(a.id),this.snackBar.open(`${a.name} eliminado`,"OK",{duration:2e3}),await this.loadData()}catch(t){console.error("Error removing participant:",t),this.snackBar.open("Error al eliminar participante","OK",{duration:3e3})}}getCurrentOptions(a){let t=Object.values(a.optionsPerMonth);return t.length>0?t[t.length-1]:0}calculateTotals(a){let t=a.reduce((e,i)=>e+this.getCurrentOptions(i),0);this.totalOptions.set(t)}static \u0275fac=function(t){return new(t||n)(v(Rt),v(Ce),v(ye),v(be),v(Nt),v(fe))};static \u0275cmp=x({type:n,selectors:[["bf-participant-list"]],decls:12,vars:5,consts:[[1,"page","animate-fade-in"],[1,"page-header"],[1,"page-header__title"],[1,"page-header__subtitle"],["mat-button","",3,"routerLink"],[1,"loading-state",2,"display","flex","flex-direction","column","align-items","center","opacity","0.7","padding","4rem"],["diameter","40"],[2,"margin-top","1rem"],[1,"add-form-card"],[1,"section-title"],[1,"add-form"],["appearance","outline",1,"user-select"],["name","userId",3,"ngModelChange","ngModel"],[3,"value"],["appearance","outline",1,"options-field"],["matInput","","type","number","name","options","min","1","max","10",3,"ngModelChange","ngModel"],["mat-flat-button","","color","primary",3,"click","disabled"],["diameter","20"],[1,"participants-card"],[1,"empty-state"],[1,"participant-grid","header"],[1,"participant-grid","row"],[1,"totals-row"],[1,"total-label"],[1,"total-value"],[1,"total-value","money"],[1,"row-num"],[1,"participant-name"],[1,"late-tag"],[1,"options-count"],[1,"money-value"],[1,"status-active"],[1,"row-actions"],["mat-icon-button","",1,"delete-btn",3,"click"],[1,"empty-state__icon"]],template:function(t,e){t&1&&(s(0,"div",0)(1,"div",1)(2,"div")(3,"h1",2),l(4,"Participantes"),r(),O(5,Ye,2,1,"p",3),r(),s(6,"a",4)(7,"mat-icon"),l(8,"arrow_back"),r(),l(9," Volver al fondo "),r()(),O(10,Ze,4,0,"div",5)(11,oi,21,5),r()),t&2&&(p(5),A(e.fund()?5:-1),p(),H("routerLink",Ft(3,$e,e.fundId)),p(4),A(e.isLoading()?10:11))},dependencies:[Bt,Wt,jt,Ut,Vt,Gt,Ht,zt,oe,ae,ne,se,re,te,Xt,Jt,ie,ee,xe,De,ve,_e,Te,de,le],styles:[".add-form-card[_ngcontent-%COMP%]{background:#161b22;border:1px solid rgba(240,246,252,.1);border-radius:12px;padding:1.5rem;margin-bottom:2rem}.add-form-card[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;font-size:1.125rem;font-weight:600;margin-bottom:1rem}.add-form-card[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#4caf50}.add-form[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:1rem;flex-wrap:wrap}.add-form[_ngcontent-%COMP%]   .user-select[_ngcontent-%COMP%]{flex:2;min-width:250px}.add-form[_ngcontent-%COMP%]   .options-field[_ngcontent-%COMP%]{flex:0 0 120px}.add-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:4px;height:56px;min-width:120px}.participants-card[_ngcontent-%COMP%]{background:#161b22;border:1px solid rgba(240,246,252,.1);border-radius:12px;padding:1.5rem;padding:0;overflow:hidden}.participant-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:40px 2fr 1fr 1.5fr 1fr 80px;padding:.5rem 1.5rem;align-items:center;font-size:.875rem}.participant-grid.header[_ngcontent-%COMP%]{background:#21262d;font-weight:600;color:#484f58;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;padding:1rem 1.5rem}.participant-grid.row[_ngcontent-%COMP%]{border-bottom:1px solid rgba(240,246,252,.1);transition:background .15s ease}.participant-grid.row[_ngcontent-%COMP%]:hover{background:#4caf500a}.participant-grid.row[_ngcontent-%COMP%]:last-of-type{border-bottom:none}.row-num[_ngcontent-%COMP%]{color:#484f58;font-size:.75rem}.participant-name[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem;color:#f0f6fc;font-weight:500}.late-tag[_ngcontent-%COMP%]{font-size:10px;padding:1px 6px;border-radius:9999px;background:#e3b34126;color:#e3b341;font-weight:600}.options-count[_ngcontent-%COMP%]{font-weight:600}.money-value[_ngcontent-%COMP%]{font-family:JetBrains Mono,Fira Code,monospace;font-weight:600;letter-spacing:.02em;color:#3fb950;font-size:.875rem}.status-active[_ngcontent-%COMP%]{color:#3fb950;font-size:.75rem;font-weight:500}.row-actions[_ngcontent-%COMP%]{display:flex;justify-content:center}.row-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#484f58}.row-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{color:#f85149}.totals-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:40px 2fr 1fr 1.5fr 1fr 80px;padding:1rem 1.5rem;background:#21262d;border-top:2px solid rgba(240,246,252,.1)}.totals-row[_ngcontent-%COMP%]   .total-label[_ngcontent-%COMP%]{font-weight:700;color:#f0f6fc;font-size:.875rem}.totals-row[_ngcontent-%COMP%]   .total-value[_ngcontent-%COMP%]{font-weight:700;font-size:.875rem}.empty-state[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;padding:4rem;text-align:center}.empty-state__icon[_ngcontent-%COMP%]{font-size:3rem;opacity:.5}.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#f0f6fc}.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#8b949e}@media(max-width:767px){.participant-grid[_ngcontent-%COMP%]{grid-template-columns:30px 1.5fr .8fr .8fr}.participant-grid.header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(5), .participant-grid.header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(6), .participant-grid.row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(5), .participant-grid.row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(6){display:none}.totals-row[_ngcontent-%COMP%]{grid-template-columns:30px 1.5fr .8fr .8fr}.totals-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(5), .totals-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(6){display:none}}"]})};export{ke as ParticipantListComponent};
