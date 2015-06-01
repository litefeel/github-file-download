function gdb_onLocalChange() {
    jQuery(function ($){
        console.log("User s has d points");
        if ($("#ext-download-link").length > 0) return;

        var rawurl = $("#raw-url")
        var url = rawurl.attr('href')
        var filename = url.substring(url.lastIndexOf('/')+1);
        var html = '<a href="'+url+'" id="ext-download-link" download="'+filename+'" class="btn btn-sm">Download</a>';
        $(html).insertBefore(rawurl);
    });
}

gdb_onLocalChange();
