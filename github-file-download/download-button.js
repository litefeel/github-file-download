// is blod page
function gfd_isBlob() {
    return window.location.href.match(/https:\/\/github\.com\/[^\/]+\/[^\/]+\/blob\/.+/);
}

function gdf_insertLinkForTree() {
    $(".octicon-file-text").not(".gfdclass").each(function(idx,elem){
        elem = $(elem);
        elem.addClass("gfdclass");
        var url = elem.parent().parent().children(".content").find("a").attr("href");
        url = url.replace("blob", "raw");
        var filename = url.substring(url.lastIndexOf('/')+1);
        var html = '<a href="'+url+'" download="'+filename+'" data-skip-pjax=""></a>';
        $(html).insertBefore(elem);
        elem.appendTo(elem.prev());
    });
}

function gfd_insertLinkForBlob() {
    if ($("#ext-file-download").length > 0) return;

    var rawurl = $("#raw-url")
    var url = rawurl.attr('href')
    var filename = url.substring(url.lastIndexOf('/')+1);
    var html = '<a href="'+url+'" id="ext-file-download" download="'+filename+'" class="btn btn-sm">Download</a>';
    $(html).insertBefore(rawurl);
}

function gfd_insertLinkForGist() {
    if ($("#ext-file-download").length > 0) return;

    var rawurl = $(".raw-url")
    var url = rawurl.attr('href')
    var filename = url.substring(url.lastIndexOf('/')+1);
    var html = '<a href="'+url+'" id="ext-file-download" download="'+filename+'" data-skip-pjax="" class="minibutton">Download</a>';
    $(html).insertBefore(rawurl);
}


function gfd_onLocalChange() {
    jQuery(function ($){
        if (window.location.hostname == "github.com") {
            if (gfd_isBlob()) {
                gfd_insertLinkForBlob();
            } else {
                gdf_insertLinkForTree();
            }
        } else if (window.location.hostname == "gist.github.com") {
            gfd_insertLinkForGist();
        }
    });
}

gfd_onLocalChange();
