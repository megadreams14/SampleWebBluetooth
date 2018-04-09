import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    console.log(navigator.bluetooth);
  }

  device:any;

  batteryLevel: number = -1;;

  onClickBleBtn() {
    // セキュリティの都合上、requestDeviceメソッドの呼び出しには何かしらのユーザジェスチャーが必要です。「通信開始」ボタンなどを用意するといいでしょう。
    navigator.bluetooth.requestDevice({acceptAllDevices:true, optionalServices:['battery_service']})
    .then(device => {
      this.device = device;
      return device.gatt.connect();
    }).then((server:any) =>{
      return server.getPrimaryService('battery_service');
    }).then((service:any) =>{
      return service.getCharacteristic('battery_level');
    }).then((characteristic)  => {
      return characteristic.readValue();
    }).then((value:any) =>{
      let batteryLevel = value.getUint8(0);
      this.batteryLevel = batteryLevel;
      // 接続解除
      this.device.gatt.disconnect()
    }).catch((error) => {
      console.log(error);
      this.device.gatt.disconnect()
    });
  }

  onClickMeasurementBtn() {

  }

}
