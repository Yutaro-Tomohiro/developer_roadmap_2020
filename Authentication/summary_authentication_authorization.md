# 認証・認可の概要

## 認証とは

認証とはアクセスしてきたユーザーが「本人であるかどうか」を検証すること。

現実の世界での認証の分かりやすい例は「マイナンバーカードを使った本人確認」である。

例えば、僕が誰かにマイナンバーカードを提示して、そこに「山田太郎」と書いてあったら、提示された人は僕のことを山田太郎さんであることを認める(はず)。
でも山田太郎であることを認めるだけで何かできるようになるわけではない。

## 認証の３要素

コンピュータの世界を含めて、現実世界で「認証」を行うための要素に以下の３つがある。

### WHAT YOU ARE (inherence factor)

願望、声、指紋、証明などその人自身を提示して相手にアイデンティティを確認させる方法。
小さなコミュニティではお互いの顔や声を相互に知っているため、面と向かえば相手が誰かは分かるため、認証は完了する。

### WHAT YOU HAVE (possession factor)

身分証など、その人だけが持っているものを提示することによって認証を行う方法。

ある程度コミュニティが大きくなってくるとお互いの特徴を覚えきれなくなる。
このような場合は免許書などの身分証明書を提示することで相手が誰であるかを認証することができる。

### WHAT YOU KNOW (knowledge factor)

パスワード、秘密の質問などのその人だけが知っていることを提示して認証を行う方法。
コンピュータの世界で最も多く使われる方法。

一般的には上記の３つのうち１つを満たすことで認証を完了する場合が多い。
しかし、より確実な認証を行いたい場合は Multi-Factor Authentication (MFA) という考え方で、複数のファクターを確認することもある。

## 認可とは

認可とは「リソースへの権限を条件の範囲で与える」こと。

条件を提示しても身分が明らかになるわけではないことが重要。

現実の世界での認可の分かりやすい例は「切符の発行」などがある。

駅で切符を買う(条件)と、電車に乗る権利(リソースへの権限)を得ることができる。
しかし、切符を買った人が誰であるかを証明することはできない。

また、購入済みの切符を誰かから貰っても電車に乗る権利を得ることができる。
つまりこの場合は電車に乗る権利を委譲されたことになる。

## まとめ

- 認証とはアクセスしてきたユーザーが誰であるかを検証すること
- 認証には WHAT YOU ARE, WHAT YOU HAVE, WHAT YOU KNOW の３つがある
- 認可とは条件に対して適切な範囲でリソースへの権限を与えること

## 参考文献

Developers IO | よくわかる認証と認可
(最終閲覧日：2021 年 3 月 15 日）
https://dev.classmethod.jp/articles/authentication-and-authorization/

Qiita | ユーザログイン（ユーザ認証）の歴史
(最終閲覧日：2021 年 3 月 15 日）
https://qiita.com/YukiMiyatake/items/4c2162f85fe3c9c203a7