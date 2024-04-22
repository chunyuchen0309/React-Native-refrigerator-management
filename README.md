# 冰箱管理app

## 實作目標
* 設計冰箱分層區塊介面，讓使用者能根據實體冰箱的分層，自訂擺放食物的區塊，有效紀錄食物位置。
* 根據食物有效日期，在預設時間內自動推播提醒到期時間，以及推薦使用食譜，幫助使用者解決剩餘食材問題。
* 透過掃描電子發票 QR code 來擷取購買食物資訊(購買時間、食物名稱)，自動推算食物有效日期，讓使用者能快速紀錄食物資訊。
* 設計簡易介面，讓老年人及視障者能透過手機內建的語音輔助功能輕鬆操作介面功能。
* 提供家用/商用兩種帳號類型，讓身兼家中及店面之主的使用者能透過切換身分來及時查看冰箱狀況，而成員能向主要管理者申請共用來 協助管理。

## 開發框架
* ReactNative 前端開發框架
* Redux 狀態管理
* Figma UI介面設計 [https://www.figma.com/file/mR9BFlMg2xb1K0gFYropoz/冰箱管理APP](https://www.figma.com/file/mR9BFlMg2xb1K0gFYropoz/%E5%86%B0%E7%AE%B1%E7%AE%A1%E7%90%86APP?type=design&mode=design&t=vxulk4J5UAmIKdKE-1).

## 專案架構圖
<img width="750" alt="截圖 2024-04-22 下午4 47 37" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/b030e1d6-cab5-482b-b33a-0de262746fb1">

## APP特色功能介紹
| 功能  | 敘述 |
| ------------- |:-------------:|
| 離線存取      | 可在無網路連線存取本地暫存     |
| 用戶身份切換      | 家用＆商用身份切換     |
| 推播提醒| 食材到期推播     |
| 複合式搜尋| 食材位置多樣化查詢     |
| QRcode掃描| 快速新增食材進入冰箱     |
| 自定義冰箱款式| 客製化冰箱層數     |
| 查詢演算法| 食譜推薦優先級演算法     |
| 視障者友善| 視障者模式     |
| 資料共享| 成員資料共享     |
| 金流服務| 綠界平台串接     |

## 程式介面展示

<img width="432" alt="截圖 2024-04-22 下午5 12 25" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/c1c496a0-f499-4a2d-a698-aceade42a315">
<img width="583" alt="截圖 2024-04-22 下午5 12 36" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/927109bd-8d9f-431e-9486-106e1c06d6cf">
<img width="636" alt="截圖 2024-04-22 下午5 12 46" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/51e75441-0cbd-417f-97a7-a46bac8ea514">
<img width="623" alt="截圖 2024-04-22 下午5 12 55" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/9207d8b4-4dde-4bdd-b658-59d9d14e3a95">
<img width="649" alt="截圖 2024-04-22 下午5 13 06" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/05c19126-7900-4bb0-aa9b-fcbfdc640d0c">
<img width="659" alt="截圖 2024-04-22 下午5 13 14" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/d962dab3-798f-47db-9878-94feca8dc7e5">
<img width="703" alt="截圖 2024-04-22 下午5 13 24" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/16ab0e49-a348-447d-a220-6b1977be442d">
<img width="462" alt="截圖 2024-04-22 下午5 13 36" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/ced04e91-720c-429c-a72e-6f8efe41e086">
<img width="466" alt="截圖 2024-04-22 下午5 13 55" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/8ec345be-235f-48ed-a8ea-a48964e9f264">
<img width="749" alt="截圖 2024-04-22 下午5 14 06" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/d621bc61-50b2-43ac-9d69-9f25aa263e5f">
<img width="787" alt="截圖 2024-04-22 下午5 14 13" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/c521b511-22eb-4019-87cd-3ecd97f96af2">
<img width="697" alt="截圖 2024-04-22 下午5 14 24" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/141bcc50-025e-4469-aa4e-8475da5b4bf7">
<img width="509" alt="截圖 2024-04-22 下午5 14 42" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/25271e98-eea0-4e3b-8b41-863fee48bb78">
<img width="752" alt="截圖 2024-04-22 下午5 14 50" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/957b7dd2-6154-4e33-aa36-443706d2846f">
<img width="743" alt="截圖 2024-04-22 下午5 14 58" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/fe00bcb5-1bf7-44c6-9954-f25f0f605d08">
<img width="722" alt="截圖 2024-04-22 下午5 15 11" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/fcd1374c-c40b-4d1a-93fa-fc565bb7f76a">
<img width="514" alt="截圖 2024-04-22 下午5 15 28" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/663d956a-c132-4588-874a-a13bc1caf03f">
<img width="743" alt="截圖 2024-04-22 下午5 15 36" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/6df555da-cc9f-4be3-ba82-e7a8c3839f85">
<img width="461" alt="截圖 2024-04-22 下午5 15 51" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/250de140-263d-407f-9bcb-123fbfbed1d0">
<img width="741" alt="截圖 2024-04-22 下午5 16 10" src="https://github.com/chunyuchen0309/React-Native-refrigerator-management/assets/134032677/0bf099b5-dcbc-4723-a719-34eef8abaebb">

## 食譜演算法
```
/*
 * jaccard
 * <cam@campedersen.com>
 */
var async = require('async');
/*
 * 返回兩個集合的交集
 */
var intersection = function (a, b, c) {
  var x = [];
  var check = function (e, cb) {
    if (~b.indexOf(e)) x.push(e); // 如果元素在b中存在，則將其添加到交集中
    if (cb && typeof cb == 'function') cb(null);
  };
  // 如果提供了回調函數c，使用async.forEach進行異步遍歷
  if (c) {
    async.forEach(a, check, function () {
      c(null, x);// 調用回調函數，傳遞交集結果
    });
  } else {// 使用forEach同步遍歷
    a.forEach(check);
    return x;// 返回交集結果
  }
}
/*
 * 返回兩個集合的聯集
 */
var union = function (a, b, c) {
  var x = [];
  var check = function (e, cb) {
    if (!~x.indexOf(e)) x.push(e);// 如果元素不在聯集中，則將其添加到聯集中
    if (cb && typeof cb == 'function') cb(null);
  }
  if (c) {
    // 使用async.forEach進行異步遍歷，等待兩次異步操作完成後調用回調函數
    var waiting = 2;
    var asyncCheck = function () {
      if (--waiting == 0) {
        c(null, x);// 調用回調函數，傳遞聯集結果
      }
    }
    async.forEach(a, check, asyncCheck);
    async.forEach(b, check, asyncCheck);
  } else {
    // 使用forEach同步遍歷
    a.forEach(check);
    b.forEach(check);
    return x; // 返回聯集結果
  }
}

/*
 * 計算Jccard相似性主要方法入口
 */
var index = function (a, b, c) {
  // a,b為兩個需要進行計算的陣列,為callback
  if (c) {
    async.parallel({
      // 使用async.parallel同時計算交集和聯集，並在完成後調用回調函數
      intersection: function (cb) {
        intersection(a, b, cb);
      },
      union: function (cb) {
        union(a, b, cb);
      }
    }, function (err, results) {
      // 調用回調函數，傳遞相似性結果
      c(results.intersection.length / results.union.length);
    });
  } else {
    // 直接計算相似性
    return intersection(a, b).length / union(a, b).length;
  }
}

/*
 * 計算不相似性，Jaccard距離
 */
var distance = function (a, b, c) {
  if (c) {
    c(1 - index(a, b));
  } else {
    return 1 - index(a, b);
  }
}

/*
 * export jaccard method
 */
module.exports = {
  index: index,
  distance: distance
}

```


