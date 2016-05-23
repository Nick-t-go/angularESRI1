app.controller('printCtrl', function($scope, esriLoader, FindLocal) {

    $scope.$on('map-loaded', function(evt, map) {
        esriLoader.require([
                "esri/tasks/PrintTemplate",
                "esri/dijit/Print",
                "dojo/dom"
            ],
            function(PrintTemplate, Print, dom) {
                // print dijit
                var printer = new Print({
                    map: map,
                    url: utilityPathOptions[activeLocation] + "PrintingTools/GPServer/Export%20Web%20Map%20Task"
                }, dom.byId("printButton"));
                printer.startup();
                printer.hide();


                esriConfig.defaults.io.corsEnabledServers.push(utilityPathOptions[activeLocation] + "PrintingTools/GPServer");

                var printScale = {
                    9: 96000,
                    10: 48000,
                    11: 24000,
                    12: 12000,
                    13: 6000,
                    14: 3000,
                    15: 1500,
                    16: 750,
                    17: 500,
                    18: 200,
                    19: 100,
                    20: 50,
                    21: 25,
                    22: 10,
                    23: 5
                };

                $scope.printTemplates = [{
                    label: "A4 Landscape",
                    format: "PDF",
                    layout: "A4 Landscape",
                }, {
                    label: "A4 Portrait",
                    format: "PDF",
                    layout: "A4 Portrait",
                }, {
                    label: "Letter Landscape",
                    format: "PDF",
                    layout: "Letter ANSI A Landscape",
                }, {
                    label: "Letter Portrait",
                    format: "PDF",
                    layout: "Letter ANSI A Portrait",
                }];


                $scope.printedPage = {
                    status: "alert-info",
                    message: "Select Layout Size and Click Printer Icon to Print",
                    link: ""
                };

                $scope.layoutChange = function() {
                    $scope.printedPage = {
                        status: "alert-info",
                        message: "Select Layout Size and Click Printer Icon to Print",
                        link: ""
                    };
                };

                $scope.initiatePrint = function(template) {
                    var temp = new PrintTemplate();
                    temp.outScale = printScale[map.getZoom()] * 12;
                    temp.label = template.label;
                    temp.format = template.format;
                    temp.layout = template.layout;
                    temp.layoutOptions = {
                        legendLayers: [],
                        titleText: "Sanitarty Sewers GIS",
                        copyrightText: "Suffolk County DPW",
                        scalebarUnit: "Feet"
                    };
                    $scope.printWait = true;
                    printer.printMap(temp);
                    $scope.printedPage = {
                        status: "alert-warning",
                        message: "Please Wait While Your Print is Prepared",
                        link: ""
                    };
                };

                printer.on('print-complete', function(evt) {
                    $scope.printWait = false;
                    $scope.printedPage = {
                        status: "alert-success",
                        message: "Click Here To View Print Ready PDF",
                        link: evt.result.url
                    };
                    $scope.$digest();
                    window.open(evt.result.url);
                });


                printer.on('error', function(error) {
                    $scope.printWait = false;
                    $scope.printedPage = {
                        status: "alert-danger",
                        message: "Error Occured",
                        link: ""
                    };
                    console.log(error);
                    $scope.$digest();
                });

            });

    });
});
