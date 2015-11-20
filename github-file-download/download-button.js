
function gfd_getGithubType() {
    var regExp = /https:\/\/github\.com\/[^\/]+\/[^\/]+(\/?$|\/(.+?)\/.+)/;
    var result = regExp.exec(window.location.href);
    var type = null;
    if (result) return result[2] ? result[2] : "tree";
    return null;
}

function gfd_pathname(url) {
    var idx = url.indexOf('/', 9);
    return url.substring(idx);
}

var gdf_callHandler = 0;

function gdf_insertLinkForTree() {
    clearTimeout(gdf_callHandler);
    gdf_callHandler = 0;
    var insertLink = function() {
        var arr =  $(".octicon-file-text");
        if (arr.length == 0) {
            gdf_callHandler = setTimeout(insertLink, 1000);
            return;
        }
        var localtionPath = gfd_pathname(window.location.href);
        localtionPath = localtionPath.replace("tree", "blob");
        arr.each(function(idx,elem){
            elem = $(elem);
            var url = "";
            if (elem.hasClass("gfdclass")){
                clearTimeout(gdf_callHandler);
                gdf_callHandler = 0;
                url = elem.parent().parent().parent().children(".content").find("a").attr("href");
                if (url.indexOf(localtionPath) !== 0) {
                    gdf_callHandler = setTimeout(insertLink, 1000);
                }
                return false;
            }
            elem.addClass("gfdclass");
            url = elem.parent().parent().children(".content").find("a").attr("href");
            url = url.replace("blob", "raw");
            var filename = url.substring(url.lastIndexOf('/')+1);
            var html = '<a href="'+url+'" download="'+filename+'" data-skip-pjax=""></a>';
            $(html).insertBefore(elem);
            elem.appendTo(elem.prev());
        });
    };
    gdf_callHandler = setTimeout(insertLink, 1000);
    insertLink();
}

function gfd_insertLinkForFind() {
    clearTimeout(gdf_callHandler);
    var insertLink = function() {
        gdf_callHandler = setTimeout(insertLink);
        var arr =  $(".js-tree-finder-results .octicon-file-text");
        if (arr.length == 0) {
            return;
        }
        arr.each(function(idx,elem){
            elem = $(elem);
            var link = elem.parent();
            var url = null;
            if (link.is('a')) {
                url = link.parent().next().find("a").attr("href");
            } else {
                url = link.next().find("a").attr("href");
                link = null;
            }
            
            url = url.replace("blob", "raw");
            var filename = url.substring(url.lastIndexOf('/')+1);
            if (link) {
                link.attr("href", url);
            } else {
                var html = '<a href="'+url+'" download="'+filename+'" data-skip-pjax=""></a>';
                $(html).insertBefore(elem);
                elem.appendTo(elem.prev());
            }
        });
    };
    insertLink();
}

function gfd_insertLinkForBlob() {
    if ($("#ext-file-download").length > 0) return;

    var rawurl = $("#raw-url")
    if (rawurl.length == 0) return;

    var url = rawurl.attr('href')
    var filename = url.substring(url.lastIndexOf('/')+1);
    var html = '<a href="'+url+'" id="ext-file-download" download="'+filename+'" class="btn btn-sm">Download</a>';
    $(html).insertBefore(rawurl);
}

function gfd_insertLinkForGist() {
    var arr = $(".file-actions a.btn");
    arr.each(function(idx,elem){
        elem = $(elem);
        if (elem.hasClass("gfdclass")){
            return false;
        }
        elem.addClass("gfdclass");
        var url = elem.attr("href");
        var filename = url.substring(url.lastIndexOf('/')+1);
        var btnHtml = '<a href="'+url+'" download="'+filename+'" data-skip-pjax="" class="btn btn-sm">Download</a>';
        var groupHtml = '<div class="btn-group" />';
        $(groupHtml).insertBefore(elem);
        elem.appendTo(elem.prev());
        $(btnHtml).insertBefore(elem);
    });
}


function gfd_onLocalChange() {
    if (window.location.hostname == "github.com") {
        switch(gfd_getGithubType()) {
            case "tree": gdf_insertLinkForTree(); break;
            case "blob": gfd_insertLinkForBlob(); break;
            case "find": gfd_insertLinkForFind(); break;
        }
    } else if (window.location.hostname == "gist.github.com") {
        gfd_insertLinkForGist();
    }
}

gfd_onLocalChange();
