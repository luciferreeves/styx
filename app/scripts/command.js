var cmd=require('node-cmd');
let os = require('os')
var homedir = os.userInfo().homedir
var backFolder = []
var forwardFolder =[]
loadpath(homedir)
checkForFolderHistory()


function loadpath(path) {
    path =  path
    cmd.get(
        'ls ' + path,
        function(err, data, stderr){
            var dataString = data
            var dataArray = dataString.split("\n")
            dataArray.pop()
            listItems(dataArray, path); 
        }
    );
}


function checkForFolderHistory() {
    if(backFolder.length === 0) {
        $('#back').prop('disabled', true)
    }
    if(forwardFolder.length === 0) {
        $('#forward').prop('disabled', true)
    }
}


function listItems(data, path) {
    var reference = document.getElementById('iconView')
    if(reference.classList.contains('active-btn')) {
        var appendString = ''
        for (index = 0; index < data.length; index++) { 
            var fs = require('fs');
            var fullpath = path + '/' + data[index]
            var stats = fs.statSync(fullpath);
            if (stats.isDirectory()) {
                appendString = appendString + '<div class="single-item"><h1 class="folder blue"><i class="fas fa-folder"></i></h1><div class="folder_desc">'+data[index]+'</div></div>'
            }
            else {
                appendString = appendString + '<div class="single-item"><h1 class="folder file"><i class="fas fa-file"></i></h1><div class="folder_desc">'+data[index]+'</div></div>'
            }
        }
        $('#items').empty()
        $('#items').html(appendString)
        $('.single-item').dblclick(function(){
            if($(this).children("h1").hasClass("blue")) {
                $('#Home').removeClass('active_link')
                var referencer = $(this).children("div").text()
                if(referencer === 'Downloads') {
                    $('#Downloads').addClass('active_link');
                }
                if(referencer === 'Documents') {
                    $('#Documents').addClass('active_link');
                }
                if(referencer === 'Pictures') {
                    $('#Pictures').addClass('active_link');
                }
                if(referencer === 'Movies') {
                    $('#Movies').addClass('active_link');
                }
                var navigatorPath = path + '/' + referencer
                loadpath(navigatorPath)
            }
            else {
                alert('Selection is not a directory. This software can currently open directories only.')
            }
        })
    }
    else {
        var appendString = ''
        for (index = 0; index < data.length; index++) { 
            var fs = require('fs');
            var fullpath = path + '/' + data[index]
            var stats = fs.statSync(fullpath);
            if (stats.isDirectory()) {
                appendString = appendString + '<div class="listview"><div class="folder blue"><i class="fas fa-folder"></i></div><div class="folder_desclist">'+data[index]+'</div></div>'
            }
            else {
                appendString = appendString + '<div class="listview"><div class="folder file"><i class="fas fa-file"></i></div><div class="folder_desclist">'+data[index]+'</div></div>'
            }
        }
        $('#items').empty()
        $('#items').html(appendString)
        $('.listview').dblclick(function(){
            if($(this).children(".folder").hasClass("blue")) {
                $('#Home').removeClass('active_link')
                var referencer = $(this).children(".folder_desclist").text()
                if(referencer === 'Downloads') {
                    $('#Downloads').addClass('active_link');
                }
                if(referencer === 'Documents') {
                    $('#Documents').addClass('active_link');
                }
                if(referencer === 'Pictures') {
                    $('#Pictures').addClass('active_link');
                }
                if(referencer === 'Movies') {
                    $('#Movies').addClass('active_link');
                }
                var navigatorPath = path + '/' + referencer
                loadpath(navigatorPath)
            }
            else {
                alert('Selection is not a directory. This software can currently open directories only.')
            }
        })
    }
    $('#listView').click(function(){
        $('#iconView').removeClass('active-btn')
        $('#listView').addClass('active-btn')
        loadpath(path)
    })
    $('#iconView').click(function(){
        $('#listView').removeClass('active-btn')
        $('#iconView').addClass('active-btn')
        loadpath(path)
    })
}

$(document).ready(function () {
    $(".sidebar_links li").on('click', function(){
        $(this).siblings().removeClass('active_link')
        $(this).addClass('active_link');
        var id = ($(this).attr('id'));
        if(id === 'Home') {
            loadpath(homedir)
        }
        else if (id === 'root') {
            loadpath('/')
        }
        else {
            loadpath(homedir + '/' + id)
        }
    })
});