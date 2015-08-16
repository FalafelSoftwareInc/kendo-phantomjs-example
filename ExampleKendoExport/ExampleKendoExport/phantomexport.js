(function () {

    var config = {},
        mapCLArguments,
        render,
        args,
        system = require("system"),
        fs = require("fs");

    /**
    * @desc mapping command line arguments
   */
    mapCLArguments = function () {
        var map = {},
            i,
            key;

        for (i = 0; i < system.args.length; i += 1) {
            if (system.args[i].charAt(0) === "-") {
                key = system.args[i].substr(1, i.length);
                map[key] = system.args[i + 1];
            }
        }
        return map;
    };

    render = function (params, exitCallback) {
        var page = require("webpage").create(),
            exit,
            input = params.infile,
            n = new Date().getUTCMilliseconds(),
            output = config.tmpDir + "/ExportedListViewTest_" + n + ".pdf",
            createListView;

        page.onConsoleMessage = function (msg) {
            console.log(msg);
        };

        page.paperSize = {
            width: '8.5in',
            height: '11in',
            margin: {
                top: '50px',
                left: '20px',
                bottom: '50px',
                right: '20px'
            }
        };

        page.open("kendotestpage.html", function (status) {

            page.evaluate(createListView, input);

            page.evaluate(function () {
                var body = document.body;
                body.style.backgroundColor = '#fff';
            });
            page.render(output);

            exit("output file created");
        });

        createListView = function (inputJSON) {
            try {
                debugger;
                // parse the input data and use it to populate the dataSource
                var inputData = JSON.parse(inputJSON);
                var dataSource = new kendo.data.DataSource({
                    data: inputData
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

    //execution starts here
    args = mapCLArguments();

    config.tmpDir = fs.workingDirectory + "/tmp";

    render(args, function (msg) {
        console.log(msg);
        setTimeout(function () {
            phantom.exit();
        }, 0);
    });

}());