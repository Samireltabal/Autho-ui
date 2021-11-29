import * as mqtt from 'mqtt'

class Emqx {
  constructor (store, env) {
    this.clientId = store.$auth.user.email
    this.username = store.$auth.user.uuid
    this.token = store.$auth.strategy.token.get()
    this.base = env
  }

  check () {
    console.log(this.base)
  }

  async connect () {
    const options = {
      keepalive: 60,
      clientId: this.clientId,
      protocolId: 'MQTT',
      username: this.username,
      password: this.token,
      protocolVersion: 4,
      clean: false,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    }
    console.log(options)
    console.log(this.base)
    this.mqtt = await mqtt.connect(this.base, options)
    console.log('from plugin obj : ', this.mqtt)
    console.log('connection status from plugin is :', this.mqtt.connected)
    return this.mqtt
  }

  subscribe (topic) {

  }
}

export default Emqx
