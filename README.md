## このプロジェクトについて

ブラウザを使ってバレットタイム撮影を行うためのWebアプリケーションです。

## 環境構築

### 必要なもの

- Node.js

### 手順

1. このリポジトリをクローンします。
2. クローンしたディレクトリに移動します。
3. `npm install` を実行します。
4. `npm start` を実行します。
5. `http://localhost:3000/1` にアクセスします。この`1`が撮影するカメラのIDです。撮影した画像のファイル名になるので、1から順にカメラを追加していくことでアニメーションが作成できます。
6. `http://localhost:3000/capture` にアクセスすると、ボタンが表示されます。`Capture`ボタンを押すと、接続しているカメラの画像が撮影され、サーバに保存されます。
7. `data`ディレクトリに画像が保存されます。この画像を使ってアニメーションを作成します。