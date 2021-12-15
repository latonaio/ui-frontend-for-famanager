# ui-ftontend-for-famanager
ui-frontend-for-famanager は、FAビジョンシステムのUIフロントエンドリソースです。

## 概要
* テンプレート登録機能
    * テンプレートマッチングで使用するためのテンプレート画像生成、アノテーション範囲指定機能
* テンプレートマッチング結果出力
    * テンプレートマッチングによる判定結果をストリーミングで表示

## 動作環境
### 1.前提条件
動作には以下の環境であることを前提とします。
* OS: Linux
* CPU: ARM
* Kubernetes
* AION

### 2.事前準備
実行環境に以下のソフトウェアがインストールされている事を前提とします。

* Kubernetesのインストール
* Envoyのインストール
* aion-core-manifests の設定と構築
* aion-service-definitions/services.yaml の設定と構築


## 機器構成
* エッジ端末 x 1台(このUIリソースを配置する)
* USBカメラ x 2台

## ローカル起動の方法

.env.local ファイルを .env.template ファイルをもとに作成してください。

```sh
PORT=4000
REACT_APP_PUBLIC_URL="http://192.168.***.***:30081/"
REACT_APP_API_URL="http://192.168.***.***:30081/api/"
REACT_APP_WS_URL="ws://192.168.***.***"
```

`yarn start` を実行し、http://localhost:4000 を開いてください。

## Kubernetes上での使用方法

aion-service-definitions の services.yml に以下のように記載し、AION を実行してください。

```yaml
  ui-frontend-for-famanager:
    scale: 1
    startup: ues
    always: yes
    network: NodePort
    env:
      REACT_APP_FACTORY_NAME: ''
    ports:
      - name: frontend
        port: 4000
        protocol: TCP
        nodePort: 30041
```

`http://[エッジ端末の IP アドレス]:30041/` でフロントエンドを開くことができます。

## FAManagerとKafkaの連携方法

FAManagerとKafka(on GCP)との連携方法については、以下のドキュメントをご確認ください。

- [FAManager+Kafka構築手順](kafka/kafka.md)
