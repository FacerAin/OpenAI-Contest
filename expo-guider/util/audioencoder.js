const Lame = require("node-lame").Lame;

const audio_encode = (uri) => {
    return new Promise((resolve,reject) => {
    const encoder = new Lame({
        'output': uri,
        'bitrate': 192,
        'little-endian': true,
        'to-mono': true,
        'signed': true
      }).setFile(uri);

      encoder
      .encode()
      .then(()=>{
        console.log('Success Encoding')
      })
      .catch(error=>{
          console.log('error ',error)
      })
    })
}
