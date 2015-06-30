// is blod page
function gfd_isBlob() {
    return window.location.href.match(/https:\/\/github\.com\/[^\/]+\/[^\/]+\/blob\/.+/);
}


function gfd_urlpath(url) {
    var idx = url.indexOf('/', 9);
    return url.substring(idx);
}

function gdf_insertLinkForTree() {
    var callHandler = 0;
    var insertLink = function() {
        var arr =  $(".octicon-file-text");
        if (arr.length == 0) {
            callHandler = setTimeout(insertLink, 1000);
            return;
        }
        var localtionPath = gfd_urlpath(window.location.href);
        localtionPath = localtionPath.replace("tree", "blob");
        arr.each(function(idx,elem){
            elem = $(elem);
            var url = "";
            if (elem.hasClass("gfdclass")){
                clearTimeout(callHandler);
                callHandler = 0;
                url = elem.parent().parent().parent().children(".content").find("a").attr("href");
                if (url.indexOf(localtionPath) !== 0) {
                    callHandler = setTimeout(insertLink, 1000);
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
    callHandler = setTimeout(insertLink, 1000);
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
    if ($("#ext-file-download").length > 0) return;

    var rawurl = $(".raw-url")
    if (rawurl.length == 0) return;

    var url = rawurl.attr('href')
    var filename = url.substring(url.lastIndexOf('/')+1);
    var html = '<a href="'+url+'" id="ext-file-download" download="'+filename+'" data-skip-pjax="" class="minibutton">Download</a>';
    $(html).insertBefore(rawurl);
}


function gfd_onLocalChange() {
    if (window.location.hostname == "github.com") {
        if (gfd_isBlob()) {
            gfd_insertLinkForBlob();
        } else {
            gdf_insertLinkForTree();
        }
    } else if (window.location.hostname == "gist.github.com") {
        gfd_insertLinkForGist();
    }
}

gfd_onLocalChange();
