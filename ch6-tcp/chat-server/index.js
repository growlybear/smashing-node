var net = require('net');

var server = net.createServer(function (conn) {

    var count = 0
      , users = {};

    conn.setEncoding('utf8');

    conn.write(
        '\n > welcome to \033[92mnode chat\033[39m!' +
        '\n > ' + count + ' other people are connected at this time.' +
        '\n > please write your name and press Enter: '
    );
    count++;

    conn.on('data', function (data) {
        var userA, userB, nickname;

        data = data.replace('\r\n', '');

        // expect the first piece of data to be a nickname
        if (!nickname) {
            if (users[data]) {
                conn.write('\033[93m> nickname already in use - try again:\033[39m ');
                return;
            }
            else {
                nickname = data;
                users[nickname] = conn;

                for (userA in users) {
                    users[userA].write('\033[90m > ' + nickname + ' joined the room\033[39m\n');
                }
            }
            console.log(nickname)
        }
        else {
            // otherwise consider it a chat message
            for (userB in users) {
                // prevent messages from going to self
                if (userB !== nickname) {
                    users[userB].write('\033[96m > ' + nickname + ':\033[39m\n ' + data);
                }
            }
        }
        console.log(' ', data);
    });

    conn.on('close', function () {
        count--;
        delete users[nickname];
    });
});

server.listen(3003, function () {
    console.log('\033[96m  server listening on *:3003\033[39m');
});
