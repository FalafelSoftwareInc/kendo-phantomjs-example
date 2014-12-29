﻿(function () {

    var config = {},
        render,
        system = require("system"),
        fs = require("fs");

    render = function (exitCallback) {
        var page = require("webpage").create(),
            exit,
            n = new Date().getUTCMilliseconds(),
            output = config.tmpDir + "/ExportedListViewTest_" + n + Math.floor((Math.random() * 1000) + 1) + ".pdf",
            createGrid;

        page.onConsoleMessage = function (msg) {
            console.log(msg);
        };

        page.paperSize = {
            width: '5in',
            height: '7in',
            margin: {
                top: '50px',
                left: '20px'
            }
        };

        page.open("kendotestpage.html", function (status) {

            page.evaluate(createGrid);
 
            page.evaluate(function () {
                var body = document.body;
                body.style.backgroundColor = '#fff';
            });
            page.render(output);

            exit("output file created");
        });

        createGrid = function () {
            try {

                var dataSource = new kendo.data.DataSource({
                    data: [
                        { name: "Jane Doe", age: 30 },
                        { name: "John Doe", age: 33 }
                    ]
                });
                $("#test-listview").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#template").html()),
                });

            } catch (e) {
                console.log(e);
                console.log("ERROR : Exception while creating Kendo listview");
            }
        };

        exit = function (resultMessage) {
            exitCallback(resultMessage);
        };

    };

    config.tmpDir = fs.workingDirectory + "/tmp";

    render(function (msg) {
        console.log(msg);
        setTimeout(function () {
            phantom.exit();
        }, 0);
    });

}());