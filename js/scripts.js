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
