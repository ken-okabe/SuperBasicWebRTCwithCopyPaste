

I'm testing WebRTC procedure step by step for my sake.

I wrote some testing site for server-less WebRTC. 

GoogleAppEngine(GAE)(Python)

http://webrtcdevelop.appspot.com/

In fact, STUN server by Google is used, but no signalling server deployed.

Session Description Protocol (SDP) is exchanged manually by hand that is CopyPaste between browser windows.

![enter image description here][1]

![enter image description here][2]

![enter image description here][3]
![enter image description here][4]

So far, here is the result I've got with the code:
 
- Firefox(26.0):
```RtpDataChannels``` 
```onopen``` event is fired successfully, but ```send``` fails.

- Chrome(31.0):
```RtpDataChannels``` 
```onopen``` event is fired successfully, and ```send``` also succeeded.

 



  [1]: http://i.stack.imgur.com/ajQp7.png
  [2]: http://i.stack.imgur.com/iw7dA.png
  [3]: http://i.stack.imgur.com/3lVPh.png
  [4]: http://i.stack.imgur.com/tr6Qa.png

 
