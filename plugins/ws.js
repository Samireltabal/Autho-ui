import * as mqtt from 'mqtt'
export default function ({ store }, inject) {
  const MQTT = mqtt
  inject('mqtt', MQTT)
}
