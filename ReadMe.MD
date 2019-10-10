# 使い方

## Lineの設定
1. [この記事](https://qiita.com/iitenkida7/items/576a8226ba6584864d95) の `[スマフォで作業] 設定したルームに「LINE notify」 を招待する` まで同様。
1. GetTrainfo.pyの `'YOUR TOKEN'` の部分(20行目)のYOUR TOKEN部分をコピーしたトークンに置き換える。

## 路線の設定
1. URL_DB.txtに鉄道運行状情報のサイト内の登録する路線のURLを張る。
1. SENKU_DB.txtに↑の路線に対応する線区名を登録。
1. LineBot.batを実行すると、運行状況に変更があった場合はLINEに通知。
> 初回起動時は必ず通知が来ます。
