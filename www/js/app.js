'use strict';

var peerCon;
var ch;

$(document)
    .ready(function()
    {
        init();

        $('#remotebtn2')
            .attr("disabled", "");

        $('#localbtn')
            .click(function()
            {
                offerCreate();

                $('#localbtn')
                    .attr("disabled", "");
                $('#remotebtn')
                    .attr("disabled", "");

                $('#remotebtn2')
                    .removeAttr("disabled");
            });

        $('#remotebtn')
            .click(function()
            {
                answerCreate(
                    new RTCSessionDescription(JSON.parse($('#remote')
                        .val())));

                $('#localbtn')
                    .attr("disabled", "");
                $('#remotebtn')
                    .attr("disabled", "");

                $('#remotebtn')
                    .attr("disabled", "");
            });

        $('#remotebtn2')
            .click(function()
            {
                answerGet(
                    new RTCSessionDescription(JSON.parse($('#remote')
                        .val())));

                $('#remotebtn2')
                    .attr("disabled", "");
            });
        $('#msgbtn')
            .click(function()
            {
                msgSend($('#msg')
                    .val());

            });
    });

var init = function()
{
    //offer------
    peerCon =
        new RTCPeerConnection(
        {
            "iceServers": [
            {
                "url": "stun:stun.l.google.com:19302"
            }]
        },
        {
            "optional": []
        });

    var localDescriptionOut = function()
    {
        console.log(JSON.stringify(peerCon.localDescription));
        $('#local')
            .text(JSON.stringify(peerCon.localDescription));


    };

    peerCon.onicecandidate = function(e)
    {
        console.log(e);

        if (e.candidate === null)
        {
            console.log('candidate empty!');
            localDescriptionOut();
        }
    };

    ch = peerCon.createDataChannel(
        'ch1',
        {
            reliable: true
        });
    ch.onopen = function()
    {
        dlog('ch.onopen');
    };
    ch.onmessage = function(e)
    {
        dlog(e.data);
    };
    ch.onclose = function(e)
    {
        dlog('closed');
    };
    ch.onerror = function(e)
    {
        dlog('error');
    };
};

var msgSend = function(msg)
{
    ch.send(msg);
}



var offerCreate = function()
{
    peerCon
        .createOffer(function(description)
        {
            peerCon
                .setLocalDescription(description, function()
                {
                    //wait for complete of peerCon.onicecandidate
                }, error);
        }, error);
};

var answerCreate = function(descreption)
{
    peerCon
        .setRemoteDescription(descreption, function()
        {
            peerCon
                .createAnswer(
                    function(description)
                    {
                        peerCon
                            .setLocalDescription(description, function()
                            {
                                //wait for complete of peerCon.onicecandidate
                            }, error);
                    }, error);
        }, error);
};
var answerGet = function(description)
{
    peerCon.setRemoteDescription(description, function()
    { //
        console.log(JSON.stringify(description));
        dlog('local-remote-setDescriptions complete!');
    }, error);
};

var error = function(e)
{
    console.log(e);
};

var dlog = function(msg)
{
    var content = $('#onmsg')
        .html();
    $('#onmsg')
        .html(content + msg + '<br>');
}