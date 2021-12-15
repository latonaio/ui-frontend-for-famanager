# FAManager+Kafka構築手順

## Jetson GCE混合クラスタの構築

kafka-kubeのREADMEに記載のgcpとedgeのバイブリッド環境構築手順
に従って環境構築を行ってください。

## Master-AION, Worker-AIONの構築

aion-coreのREADMEに記載のセットアップ手順に従って、
クラスタモードでのAIONの構築を行ってください。

## kafkaの構築

kafka-kubeのREADMEに記載の構築手順に従って、Master-AIONにkafkaをデプロイしてください。

## FAManaterの構築

### 必要なマイクロサービス一覧

* kafka-producer [ビルド手順](https://github.com/latonaio/kafka-producer#%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)
* mysql [ビルド手順](https://github.com/latonaio/mysql-kube#how-to-setup)
* direct-next-service [ビルド手順](https://github.com/latonaio/direct-next-service-kube#%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)
* check-multiple-camera-connection [ビルド手順](https://github.com/latonaio/check-multiple-camera-connection-kube#%E5%8B%95%E4%BD%9C%E6%96%B9%E6%B3%95)
* stream-usb-video-by-rtsp [ビルド手順](https://github.com/latonaio/stream-usb-video-by-rtsp)
    * `/bin/sh docker-build-multi.sh`
* template-matching-by-opencv-for-rtsp [ビルド手順](https://github.com/latonaio/template-matching-by-opencv-for-rtsp#installation)
    * `/bin/sh docker-build-multi.sh`
* ui-backend-for-famanager
* ui-frontend-for-famanager

## manifestファイルの修正
### ui-backend-for-famanager
```md
ui-backend-for-famanager/k8s/deployment.yml

--- 全namespace
# 修正前
  namespace: default
# 修正後
  namespace: {ノード名前}

--- volumes
# 修正前
      volumes:
        - name: direct-next-service
          hostPath:
            path: /var/lib/aion/pluto-desktop/Data/direct-next-service_1/
        - name: template-matching-by-opencv-for-rtsp
          hostPath:
            path: /var/lib/aion/pluto-desktop/Data/template-matching-by-opencv-for-rtsp/
        - name: public
          hostPath:
            path: /var/lib/aion/pluto-desktop/UI/ui-backend-for-famanager/public/
# 修正後
      volumes:
        - name: direct-next-service
          hostPath:
            path: /var/lib/aion/{ノード名前}/Data/direct-next-service_1/
        - name: template-matching-by-opencv-for-rtsp
          hostPath:
            path: /var/lib/aion/{ノード名前}/Data/template-matching-by-opencv-for-rtsp/
        - name: public
          hostPath:
            path: /var/lib/aion/{ノード名前}/UI/ui-backend-for-famanager/public/
```


### ui-frontend-for-famanager
```md
ui-frontend-for-famanager/k8s/deployment.yml

--- 全namespace
# 修正前
namespace: default
# 修正後
namespace: {ノード名前}
```
### mysql
```md
mysql-kube/mysql-deployment.yml
mysql-kube/mysql-pv.yml

--- 全namespace
# 修正前
namespace: default
# 修正後
namespace: {ノード名前}
```

### project.yml修正

```shell
vi project.yml


devices:
 aion-cloud: 
   addr: 10.0.0.1 # <- openvpnでのIP
   aionHome: /var/lib/aion
 worker-node:
   addr: 10.0.0.6 #<- openvpnでのIP
   aionHome: /var/lib/aion
microservices:
  check-multiple-camera-connection:
    scale: 1
    startup: yes
    always: yes
    env:
      MYSQL_PORT: 3306
      MYSQL_USER: "UserName" # <- mysql-kubeで設定した値
      MYSQL_PASSWORD: "PassWord!" # <- mysql-kubeで設定した値
    volumeMountPathList:
      - /devices:/dev:Bidirectional
    privileged: yes
    nextService: 
      video0:
        - name: stream-usb-video-by-rtsp-1
      video1:
        - name: stream-usb-video-by-rtsp-2
    targetNode: pluto-desktop
  stream-usb-video-by-rtsp-1: # <- カメラ１
    scale: 1
    always: yes
    multiple: no
    network: NodePort
    privileged: yes
    ports:
      - name: usb
        protocol: TCP
        port: 8555
        nodePort: 30055
    env:
      SUFFIX: 1
    volumeMountPathList:
      - /devices:/dev:Bidirectional
    nextService:
      default:
        - name: template-matching-by-opencv-for-rtsp-1
    targetNode: pluto-desktop
  stream-usb-video-by-rtsp-2: # <- カメラ2
    scale: 1
    always: yes
    multiple: no
    network: NodePort
    privileged: yes
    ports:
      - name: usb
        protocol: TCP
        port: 8556
        nodePort: 30056
    env:
      SUFFIX: 2
    volumeMountPathList:
      - /devices:/dev:Bidirectional
    nextService:
      default:
        - name: template-matching-by-opencv-for-rtsp-2
    targetNode: pluto-desktop
  template-matching-by-opencv-for-rtsp-1:
    startup: no
    multiple: no
    network: NodePort
    env:
      PROCESS_NUM: 1
      KAFKA_MODE: true
    ports:
      - name: fitness
        protocol: TCP
        port: 5000
        nodePort: 32001
    targetNode: pluto-desktop
    nextService:
      kafka:
        - name: kafka-producer
  template-matching-by-opencv-for-rtsp-2:
    startup: no
    multiple: no
    network: NodePort
    env:
      PROCESS_NUM: 2
      KAFKA_MODE: true
    ports:
      - name: fitness
        protocol: TCP
        port: 5001
        nodePort: 32002
    targetNode: pluto-desktop
    nextService:
      kafka:
        - name: kafka-producer
  direct-next-service:
    scale: 1
    startup: yes
    always: yes
    nextService:
      template-1:
        - name: template-matching-by-opencv-for-rtsp-1
      template-2:
        - name: template-matching-by-opencv-for-rtsp-2
    targetNode: pluto-desktop
  kafka-producer:
    scale: 1
    startup: no
    always: yes
    env:
      KAFKA_SERVER: kafka-0.kafka-service.default.svc.cluster.local:9092,kafka-1.kafka-service.default.svc.cluster.local:9092,kafka-2.kafka-service.default.svc.cluster.local:9092
```

--- 
### aionctlを使ったproject.ymlリモート投入
```shell
# project.yml のdevicesに記述されたノードに対して,マイクロサービスを展開。
aionctl apply {project.yamlのpath} -H {master node の IP}
# 例:
aionctl apply project.yml -H 10.0.0.1
```

### aionctlで各ノード上のマイクロサービスデプロイ状況を確認
```shell
aionctl status -H {master node の IP}
# 例:
aionctl status -H 10.0.0.1
```
