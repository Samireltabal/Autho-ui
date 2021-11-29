import Vue from 'vue'
import VueMqtt from 'vue-mqtt'

class Emqx {
  constructor (store, env) {
    this.store = store
    this.base = env
  }

  check () {
    console.log(this.base)
  }

  connect () {
    console.log(this.base)
    const host = this.base
    const store = this.store
    const options = {
      keepalive: 60,
      clientId: store.$auth.user.email,
      protocolId: 'MQTT',
      username: store.$auth.user.uuid,
      password: store.$auth.strategy.token.get(),
      protocolVersion: 4,
      clean: true,
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
    Vue.use(VueMqtt, host, options)
  }

  subscribe (topic) {

  }
}

export default Emqx
