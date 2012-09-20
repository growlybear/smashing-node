var fs = require('fs')
  , stdin = process.stdin
  , stdout = process.stdout;

fs.readdir(__dirname, function (err, files) {
    console.log('');

    if (!files.length) {
        return console.log('    \033[31m No files to show!\033[39m\n');
    }

    console.log('    Select which file or directory you want to see\n');

    function file (i) {
        var filename = files[i];

        fs.stat(__dirname + '/' + filename, function (err, stat) {
            if (stat.isDirectory()) {
                console.log('    ' + i + ' \033[36m' + filename + '/\033[39m\n');
            } else {
                console.log('    ' + i + ' \033[90m' + filename + '/\033[39m\n')
            }

            i++;
            if (i === files.length) {
                console.log('');
                stdout.write('    ' + i + ' \033[33mEnter your choice: \033[39m');
                stdout.resume();
                stdin.setEncoding('utf-8');
            } else {
                file[i];
            }
        });
    }

    file(0);

});
