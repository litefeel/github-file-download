
function gfd_onLocalChange() {
    jQuery(function ($){
        console.log("User s has d points");
        if ($("#ext-file-download").length > 0) return;

        if (window.location.hostname == "github.com") {
            var rawurl = $("#raw-url")
            var url = rawurl.attr('href')
            var filename = url.substring(url.lastIndexOf('/')+1);
            var html = '<a href="'+url+'" id="ext-file-download" download="'+filename+'" class="btn btn-sm">Download</a>';
            $(html).insertBefore(rawurl);
        } else if (window.location.hostname == "gist.github.com") {
            var rawurl = $(".raw-url")
            var url = rawurl.attr('href')
            var filename = url.substring(url.lastIndexOf('/')+1);
            var html = '<a href="'+url+'" id="ext-file-download" download="'+filename+'" data-skip-pjax="" class="minibutton">Download</a>';
            $(html).insertBefore(rawurl);
        }
    });
}

gfd_onLocalChange();
