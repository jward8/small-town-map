(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\JackMichael\Documents\Coding\small-town-map\client\src\main.ts */"zUnb");


/***/ }),

/***/ "1i8C":
/*!*****************************************!*\
  !*** ./src/app/services/map.service.ts ***!
  \*****************************************/
/*! exports provided: MapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapService", function() { return MapService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class MapService {
    constructor(http) {
        this.http = http;
        this.BASE_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].server_url;
    }
    getLatestDate() {
        return this.http.get(this.BASE_URL + '/latestDate');
    }
    getPoints(rssData) {
        return this.http.post(this.BASE_URL + '/coordinates', rssData);
    }
    getEpisodeData() {
        return this.http.get(this.BASE_URL + '/rssData');
    }
    getGeoJsonData() {
        return this.http.get(this.BASE_URL + '/geojson');
    }
}
MapService.ɵfac = function MapService_Factory(t) { return new (t || MapService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
MapService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MapService, factory: MapService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    server_url: 'https://localhost:3080/api',
    coordinate_endpoint: '/coordinates',
    rss_endpoint: '/rssData',
    env_name: 'local'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "EZtS":
/*!*************************************************!*\
  !*** ./src/app/components/map/map.component.ts ***!
  \*************************************************/
/*! exports provided: MapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapComponent", function() { return MapComponent; });
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mapbox-gl */ "4ZJM");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var app_services_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/map.service */ "1i8C");



class MapComponent {
    constructor(service) {
        this.service = service;
        this.title = 'small-town-map';
    }
    ngOnInit() {
        this.service.getLatestDate().subscribe(shouldUpdate => {
            if (!shouldUpdate) {
                this.service.getEpisodeData().subscribe(rssData => {
                    this.service.getPoints(rssData).subscribe(data => {
                        console.log(data);
                    });
                });
            }
            this.service.getGeoJsonData().subscribe(data => {
                this.ep_geojson = data;
                console.log(this.ep_geojson);
                this.createMap();
            });
        });
    }
    createMap() {
        mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.accessToken = `pk.eyJ1IjoiamFja21pY2hhZWwtd2FyZCIsImEiOiJja24zdWVpNGMxYjR2MnBtaGI5a216YmJkIn0.jrYVa77az9t2kplgJdgYmw`;
        this.map = new mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.Map({
            container: 'map',
            style: 'mapbox://styles/jackmichael-ward/cklmjvhp63wc317p79b13hsrs',
            center: [-87.909416, 43.041069],
            zoom: 3.75
        });
        let town = this.ep_geojson;
        var title = document.getElementById('title');
        this.map.on('load', function () {
            this.addSource('towns', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": town
                }
            });
            this.addLayer({
                'id': 'town-layer',
                'type': 'circle',
                'source': 'towns',
                'paint': {
                    'circle-stroke-color': '#909191',
                    'circle-stroke-width': 1,
                    'circle-color': '#951f1e'
                }
            });
            this.on('click', 'town-layer', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var title = e.features[0].properties.name;
                var link = e.features[0].properties.link;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                new mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.Popup()
                    .setLngLat(coordinates)
                    .setHTML('<h3 class=\'popup-title\'>' + title + '</h3>' + '\n <a href=\"' + link + '\" target=\"_blank\">Listen to the episode here!</a>')
                    .addTo(this);
            });
        });
        this.map.getCanvas().style.cursor = 'pointer';
    }
}
MapComponent.ɵfac = function MapComponent_Factory(t) { return new (t || MapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](app_services_map_service__WEBPACK_IMPORTED_MODULE_2__["MapService"])); };
MapComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MapComponent, selectors: [["murder-map"]], decls: 1, vars: 0, consts: [["id", "map"]], template: function MapComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#map[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n}\r\n\r\n.mapboxgl-popup[_ngcontent-%COMP%]   .mapboxgl-popup-content[_ngcontent-%COMP%]{\r\n    background: #909191;\r\n}\r\n\r\n.mapboxgl-popup-content[_ngcontent-%COMP%]    > .popup-title[_ngcontent-%COMP%]{\r\n    font-family: 'Quicksand', sans-serif;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixTQUFTO0lBQ1QsV0FBVztBQUNmOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDIiwiZmlsZSI6Im1hcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI21hcCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm1hcGJveGdsLXBvcHVwIC5tYXBib3hnbC1wb3B1cC1jb250ZW50e1xyXG4gICAgYmFja2dyb3VuZDogIzkwOTE5MTtcclxufVxyXG5cclxuLm1hcGJveGdsLXBvcHVwLWNvbnRlbnQgPiAucG9wdXAtdGl0bGV7XHJcbiAgICBmb250LWZhbWlseTogJ1F1aWNrc2FuZCcsIHNhbnMtc2VyaWY7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mapbox-gl */ "4ZJM");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/map.service */ "1i8C");
/* harmony import */ var _components_map_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/map/map.component */ "EZtS");




class AppComponent {
    constructor(service) {
        this.service = service;
        this.title = 'small-town-map';
    }
    ngOnInit() {
        this.service.getLatestDate().subscribe(shouldUpdate => {
            if (!shouldUpdate) {
                this.service.getEpisodeData().subscribe(rssData => {
                    this.service.getPoints(rssData).subscribe(data => {
                        console.log(data);
                    });
                });
            }
            this.service.getGeoJsonData().subscribe(data => {
                this.ep_geojson = data;
                console.log(this.ep_geojson);
                this.createMap();
            });
        });
    }
    createMap() {
        mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.accessToken = `pk.eyJ1IjoiamFja21pY2hhZWwtd2FyZCIsImEiOiJja24zdWVpNGMxYjR2MnBtaGI5a216YmJkIn0.jrYVa77az9t2kplgJdgYmw`;
        this.map = new mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.Map({
            container: 'map',
            style: 'mapbox://styles/jackmichael-ward/cklmjvhp63wc317p79b13hsrs',
            center: [-87.909416, 43.041069],
            zoom: 3.75
        });
        let town = this.ep_geojson;
        this.map.on('load', function () {
            this.addSource('towns', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": town
                }
            });
            this.addLayer({
                'id': 'town-layer',
                'type': 'circle',
                'source': 'towns',
                'paint': {
                    'circle-stroke-color': '#EF8275',
                    'circle-stroke-width': 1,
                    'circle-color': '#EF8275'
                }
            });
            this.on('click', 'town-layer', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var title = e.features[0].properties.name;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                new mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default.a.Popup()
                    .setLngLat(coordinates)
                    .setHTML(title)
                    .addTo(this);
            });
        });
        this.map.getCanvas().style.cursor = 'pointer';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_map_service__WEBPACK_IMPORTED_MODULE_2__["MapService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 24, vars: 0, consts: [[1, "container"], ["id", "title"], ["id", "murder"], ["id", "smm-links"], [1, "fab", "fa-spotify", "icons"], ["href", "https://open.spotify.com/show/1fA0drEA0Tnbg6rzM43aff", "target", "_blank"], [1, "fas", "fa-podcast", "icons"], ["href", "https://podcasts.apple.com/us/podcast/small-town-murder/id1194755213", "target", "_blank"], [1, "fab", "fa-patreon", "icons"], ["href", "https://www.patreon.com/CrimeInSports", "target", "_blank"], [1, "fab", "fa-twitter", "icons"], ["href", "https://twitter.com/murdersmall", "target", "_blank"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "small town (");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Murder");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, ") map");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Listen on Spotify");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Listen on Apple Podcasts");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "i", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Become a Producer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Follow on Twitter");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "murder-map");
    } }, directives: [_components_map_map_component__WEBPACK_IMPORTED_MODULE_3__["MapComponent"]], styles: ["#title[_ngcontent-%COMP%]{\r\n    font-family: 'Quicksand', sans-serif;\r\n    margin: 2px;\r\n}\r\n\r\n#murder[_ngcontent-%COMP%]{\r\n    font-family: 'Caveat', cursive;\r\n    color: #951f1e;\r\n}\r\n\r\n.container[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n    color: white;\r\n    margin-top: 5px;\r\n    margin-left: 5px;\r\n    z-index: 1;\r\n    border: solid 1px #7c7c7c;\r\n    background-color: #909191;\r\n    border-radius: 5px;\r\n}\r\n\r\nli[_ngcontent-%COMP%] {\r\n    font-size: 24px;\r\n    list-style-type: none;\r\n    margin-top: 2%;\r\n    font-family: 'Quicksand', sans-serif;\r\n}\r\n\r\na[_ngcontent-%COMP%]{\r\n    text-decoration: none;\r\n    color: #951f1e;\r\n}\r\n\r\na[_ngcontent-%COMP%]:visited{\r\n    color: #951f1e;\r\n}\r\n\r\n.icons[_ngcontent-%COMP%]{\r\n    margin-right: 5%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0NBQW9DO0lBQ3BDLFdBQVc7QUFDZjs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5QixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVix5QkFBeUI7SUFDekIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsY0FBYztJQUNkLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiN0aXRsZXtcclxuICAgIGZvbnQtZmFtaWx5OiAnUXVpY2tzYW5kJywgc2Fucy1zZXJpZjtcclxuICAgIG1hcmdpbjogMnB4O1xyXG59XHJcblxyXG4jbXVyZGVye1xyXG4gICAgZm9udC1mYW1pbHk6ICdDYXZlYXQnLCBjdXJzaXZlO1xyXG4gICAgY29sb3I6ICM5NTFmMWU7XHJcbn1cclxuXHJcbi5jb250YWluZXJ7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICM3YzdjN2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTA5MTkxO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG5saSB7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICBtYXJnaW4tdG9wOiAyJTtcclxuICAgIGZvbnQtZmFtaWx5OiAnUXVpY2tzYW5kJywgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuYXtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiAjOTUxZjFlO1xyXG59XHJcblxyXG5hOnZpc2l0ZWR7XHJcbiAgICBjb2xvcjogIzk1MWYxZTtcclxufVxyXG5cclxuLmljb25ze1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1JTtcclxufVxyXG5cclxuIl19 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_map_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/map/map.component */ "EZtS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _components_map_map_component__WEBPACK_IMPORTED_MODULE_3__["MapComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map