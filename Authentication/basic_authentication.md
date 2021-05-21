# Basic 認証

## Basic 認証とは

Basic 認証とは HTTP に定義された認証方式の１つ。

ID(ユーザー名)とパスワードのペアをコロン":"でつなぎ、Base64 でエンコードしたものをクレデンシャル情報として送信する。

## Basic 認証の安全性

Basic 認証ではクレデンシャル情報をネットワークを介してクリアテキスト(Base64 は可逆エンコードのため)として渡されるため、**安全ではない**。
そのため、Basic 認証は HTTPS/TLS と組み合わせて使用する必要がある。

## Basic 認証の通信の流れ

典型的な Basic 認証における HTTP クライアントと HTTP サーバー間の通信は以下の５ステップのようになる。

1. クライアントが認証が必要なページにアクセスする。このタイミングではクライアントはページに認証が必要かどうか知らない為、クレデンシャル情報を送っていない

2. サーバーは 401 のレスポンスを返し、クライアントに認証領域と認証方式に関する情報を伝える

3. それを受けたクライアントは、認証に関する情報をユーザーに提示し、クレデンシャル情報の入力を求める。

4. ユーザーがクレデンシャル情報を入力し、クライアントはリクエストに認証ヘッダを追加して再度送信する。

5. 認証に成功すると、サーバーは認証の必要なページのリクエストを処理する。認証に失敗した場合は 401 レスポンスを返す。

## Basic 認証の使い所

Basic 認証は HTTP 標準の認証方式で低コストで認証を組み込むことができる一方、セキュリティの脆弱性があるので機密性が高いリソースに対しては適していないと言える。

Basic 認証を採用する場合は HTTPS/TLS はもちろんのこと、特定の IP アドレスからのみアクセス可能な IP 制限も併用することでより厳重な制限をかけることができる。

## まとめ

- Basic 認証は HTTP に定義されている認証方式
- Basic 認証はリソースにアクセスする際に、ID とパスワードをクレデンシャル情報として要求される
- Basic 認証はセキュリティに脆弱性があるため、 HTTPS/TLS などと併用して使う必要がある

## 参考文献

IETF Tools | The 'Basic' HTTP Authentication Scheme
(最終閲覧日：2021 年 3 月 15 日）
https://tools.ietf.org/html/rfc7617

MDN Web Docs | HTTP 認証
(最終閲覧日：2021 年 3 月 15 日）
https://developer.mozilla.org/ja/docs/Web/HTTP/Authentication

Wikipedia | Basic 認証
(最終閲覧日：2021 年 3 月 15 日）
https://ja.wikipedia.org/wiki/Basic%E8%AA%8D%E8%A8%BC