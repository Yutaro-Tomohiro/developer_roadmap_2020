# What is HTTP? - HTTPって何?
## HTTPとは？
HTTPとはWWWの世界でHTMLをやり取りするためのプロトコルのこと。**Hyper Text Transfer Protocol**の略。

## HTTP通信の仕組み
HTTP通信は以下の(1) ~ (3)の流れで通信が行われる。

（1）クライアントからサーバーに「リクエスト（要請）」を送る

（2）サーバーが必要な処理を行う

（3）サーバーからクライアントに「レスポンス（返答）」を返す

ちなみに、HTTPでは1回のやりとりで処理できる情報は1つに限られる。
そのため、複数の情報を処理したいときは、この動作を必要な回繰り返す。

## HTTPリクエストの中身
リクエストは大きく三つの部分に分類でき、それぞれ、「リクエスト行」「ヘッダーフィールド」「メッセージ本体」と呼ばれる。

- リクエスト行：「情報を取り出したいのか」「情報を送りたいのか」などのサーバに送るリクエストの種類を指定する部分
- ヘッダーフィールド：サーバー名、ブラウザーの種類、接続維持の指定などリクエストに関連する各種の補足的な情報を指定する部分
- メッセージ本体：主に「情報を送る」リクエストのときに、送りたい情報を格納する部分

リクエスト行はメソッド、ターゲット、HTTPバージョンを含んでいる。
メソッドには以下のようなものがある。

|メソッド|意味|
|--|--|
|GET|サーバ上のファイルを取り出す|
|HEAD|サーバ上のファイルのヘッダフィールドのみ取り出す|
|POST|サーバ上にデータを送付する|
|PUT|サーバ上のファイルを書き換える|
|DELETE|サーバ上のファイルを削除する|
|CONNECT|中継のための接続を作る|
|OPTIONS|対象の利用できるメソッドの一覧を読み出す|
|TRACE|リクエストをそのまま送り返す|

## HTTPレスポンスの中身
レスポンスの中身はリクエストとよく似ていて、大きく「ステータス行」「ヘッダーフィールド」「メッセージ本体」の３つがある。

ステータス行は、HTTPバージョン、ステータスコード、理由フレーズで構成されている。
ステータスコードは以下のように分類される。

|コード|分類|意味|
|--|--|--|
|1xx|情報系|リクエストを受信して、その処理を継続中|
|2xx|成功系|リクエストの処理に成功|
|3xx|リダイレクト系|リクエストを終えるにはさらに処理が必要|
|4xx|クライアントエラー系|リクエストの構文に問題がある、もしくは実行できない|
|5xx|サーバエラー系|リクエストの構文は正常だが、サーバが実行できない|

ヘッダフィールドはフィールド名と値で構成されている。

リクエストでよく使われるヘッダーフィールドは以下のようなものがある。

|フィールド名|意味|
|--|--|
|Host (Request/End-to-End)|唯一必須のヘッダで、宛先サーバ名を意味する|
|User-Agent (Request/End-to-End)|ブラウザやクライアントプログラムの名称やバージョン|
|Referer (Request/End-to-End)|参照元のURI|
|Accept-Encoding(Request/End-to-End)|受理可能なエンコーディング|
|Accept-Language (Request/End-to-End)|受理可能な言語|
|Content-Encoding (Entity/End-to-End)|内容のエンコーディング|
|Content-Language (Entity/End-to-End)|内容の言語|
|Last-Modified (Entity/End-to-End)|内容の最終更新日|
|ETag (Response/End-to-End)|内容を要約する情報(この変化から更新が分かる)|
|Connection (General/Hop-by-Hop)|接続状態に関する通知(リクエスト処理後は即座に切断など)|

<!-- |||
|||
|||
||| -->

## 
## 

## 実際のHTTPレスポンスの中身
```※HTTP/1.1要求の送信例
GET / HTTP/1.1 ……サイトのトップページデータの取得
HOST: www.microsoft.com ……HTTP/1.1を使う場合はhost:ヘッダを指定すること

※HTTP/1.1応答の例
HTTP/1.1 200 OK ……1行目はHTTP応答
Server: Apache ……2行目以下はHTTP応答ヘッダフィールド
ETag: "6082151bd56ea922e1357f5896a90d0a:1425454794"
Last-Modified: Wed, 04 Mar 2015 07:39:54 GMT
Accept-Ranges: bytes
Content-Length: 1020
Content-Type: text/html
Date: Mon, 27 Mar 2017 07:07:14 GMT
Connection: keep-alive
……空行（ヘッダと本文の境界）
<html> ……以下、HTTP応答本文。HTML形式のテキストが返ってきている
<head>
<title>Microsoft Corporation</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"></meta>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
<meta name="SearchTitle" content="Microsoft.com" scheme=""></meta>
……（以下省略）……

```
## 
<!-- 
開発者ツールでのレスポンスの見方を調べる
