# What is HTTP? - HTTPって何?
## HTTPとは？
HTTPとはWWWの世界でHTMLをやり取りするためのプロトコルのこと。**Hyper Text Transfer Protocol**の略。
## 
## 
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
開発者ツールでのレスポンスの見方を調べる
