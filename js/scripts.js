$(function() {
    var frameX, desktop = $("#desktop"),
        frame = $("#iframe"),
        editor = $(".editor"),
        menu_file = ($(".action-buttons"), $(".file-menu a")),
        setting_btn = $(".settings .icon"),
        setting_menu = $(".settings ul"),
        editor_title = $(".editor-header .title .file"),
        line = $(".row");
    desktop.length ? ($.frameLoad = function() {
        setTimeout(function() {
            frameX = frame.contents(), editor.add(frameX).on("click", function(e) {
                editor.removeClass("passive"), e.stopPropagation()
            })
        }, 1e3)
    }, desktop.on("click", function() {
        editor.addClass("passive")
    }), editor.find(".a").on("click", function() {
        editor.addClass("close"), setTimeout(function() {
            editor.removeClass("close")
        }, 4e3)
    }), editor.find(".b").on("click", function() {
        editor.toggleClass("min")
    }), editor.find(".c").on("click", function() {
        editor.toggleClass("full")
    }), editor.on("click", function() {
        setting_menu.fadeOut(200)
    }), menu_file.on("click", function() {
        var _this = $(this);
        editor_title.html(_this.html()), menu_file.removeClass("active"), _this.addClass("active")
    }), setting_btn.on("click", function(e) {
        setting_menu.fadeIn(200), e.stopPropagation()
    }), setting_menu.find("li").on("click", function() {
        theme = $(this).attr("data-theme"), desktop.add(frame.contents().find("body")).removeClass().addClass(theme)
    })) : line.on("click", function() {
        line.removeClass("active"), $(this).addClass("active")
    })
});

window.onload = function() {
    const url = window.location.origin + "/data/detail.json";
    
    
    function convertJsonToHtml(obj, indent) {
        let html = "";
        const keys = Object.keys(obj);
        const lastKeyIndex = keys.length - 1;
        keys.forEach((key, index) => {
            const value = obj[key];
            const isLast = index === lastKeyIndex;
    
            if (typeof value === "object") {
                html += `<div class="row t${indent} end">\n`;
                if (key != parseInt(key, 10)) {
                    html += `<div class="name">"${key}"</div>\n`;
                }
                html += `<div class="obj">{</div></div>\n`;
                html += convertJsonToHtml(value, indent + 1);
                if (isLast) {
                    html += `<div class="row t${indent} end">\n`;
                } else {
                    html += `<div class="row t${indent}">\n`;
                }
                html += `<div class="obj">}</div>\n`;
                html += `</div>\n`;
            } else if (typeof value === "boolean") {
                if (isLast) {
                    html += `<div class="row t${indent} end">\n`;
                } else {
                    html += `<div class="row t${indent}">\n`;
                }
                html += `<div class="name">"${key}"</div>\n`;
                html += `<div class="boo">${value}</div>\n`;
                html += `</div>\n`;
            } else {
                if (isLast) {
                    html += `<div class="row t${indent} end">\n`;
                } else {
                    html += `<div class="row t${indent}">\n`;
                }
                if (key == parseInt(key, 10)) {
    
                    html += `<div class="value"></div>\n`;
                } else {
    
                    html += `<div class="name">"${key}"</div>\n`;
                }
                html += `<div class="value">"${value}"</div>\n`;
                html += `</div>\n`;
            }
    
            if (!isLast) {
                html += `</div>\n`;
            }
        });
        return html;
    }

    var htmlDataElement = document.getElementById("replaceHtmlData");
    if (htmlDataElement) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById("replaceHtmlData").innerHTML = convertJsonToHtml(data, 1);
            })
            .catch(error => console.error(error));
    }
}