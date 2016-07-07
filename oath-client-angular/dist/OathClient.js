'use strict';

angular.module('ngOath', []).service('OathService', ['$q', '$window', function ($q, $window) {

    this.checkConnection = function () {
        // console.log('Connection Status: %s');

    }

    this.fetchPromises = function () {
        var deferrd = $q.defer();

        console.log('fetch promises');
        var socket = io($window.location.origin);

        socket.on('on connect', function (msg) {
            console.log(msg);
        });

        socket.on('promiseId', function (socketId) {
            console.log('Promise id RECEVIED: %s', socketId);
            $('#messages').append($('<li>').text(socketId));
            socket.on(socketId, function (data) {
                deferrd.resolve(data);
                socket.disconnect();
            });

        });

        $('form').submit(function(){
            console.log('emitcharmsg');
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });

        return [deferrd.promise];
    }
}]);
