// @flow

function Tabler (columnNames, rows) {
    var toHTML = function() {
        var elementWithContents = function (tag, contents) {
            var el = document.createElement(tag);
            el.innerText = contents;
            return el;
        }

        var setCSS = function(el, dict) {
            for (var key in dict) {
                if (dict.hasOwnProperty(key)) {
                    el.style.setProperty(key, dict[key]);
                }
            }
            return el;
        }

        var table = document.createElement("table");
        setCSS(table, {
            "border": "1px #6699CC solid",
            // "border-collapse": "collapse",
            "border-spacing": "0px",
            "font-family": "monospace"
        });

        var headerRow = document.createElement("tr");
        var maketh = function(name) {
            return setCSS(elementWithContents("th", name),
                          {"padding": "3px", "text-align": "center"});
        };
        var ths = columnNames.map(maketh);
        for (var i = 0; i < ths.length; i++) {
            headerRow.appendChild(ths[i]);
        }
        table.appendChild(headerRow);

        var uniqueID = Math.random().toString(36);
        for (var i = 0; i < rows.length; i++) {
            var tr = document.createElement("tr");
            tr.setAttribute("class", "tabler-row");

            for (var j = 0; j < rows[i].length; j++) {
                var cell = rows[i][j];
                var text = cell[0];
                var clicktext = cell[1];
                var td = document.createElement("td");
                var id = uniqueID + "-" + "row-" + i + "-" + j;
                td.style.setProperty("padding", "3px");
                td.addEventListener("click", function() {
                    var el = document.getElementById(this.id);
                    if (!el) {
                        console.error("Null element somehow!");
                        return;
                    }
                    if (el.getAttribute("ishidden") == "false") {
                        el.style.setProperty("display", "none");
                        el.setAttribute("ishidden", "true");
                    }
                    else {
                        el.style.removeProperty("display");
                        el.setAttribute("ishidden", "false");
                    }
                }.bind({"id": id}), false);

                var clicktextElement = elementWithContents("div", clicktext);
                setCSS(clicktextElement, {"background-color": "#eee", "display": "none"});
                clicktextElement.setAttribute("id", id);
                td.appendChild(elementWithContents("div", text));
                td.appendChild(clicktextElement);
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        return table;
    }

    var obj = { "colNames": columnNames, "rows": rows };
    return {
        "addRow": function (row) {
            obj.rows.push(row);
            return this;
        },
        "toHTML": function() {
            return toHTML(obj["colNames"], obj["rows"]);
        }
    };
}
