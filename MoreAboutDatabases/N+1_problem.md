# N + 1 問題

## N + 1 問題とは

N+1 問題とは ループ処理の中で都度 SQL を発行してしまい、大量の SQL が発行されてパフォーマンスが低下してしまう問題のこと。

## 原因

N ＋ 1 問題は複数のテーブルが 1 対多などのリレーションがある時に発生する問題である。

例えば以下のような 1 対多の 2 つのテーブルがあったとする。
このテーブルの関係は

```
departments : employees = 1 : 多
```

である。

departments_table
|id|department_name|
|--|--|
|1|営業部|
|2|製造部|
|3|人事部|

employees_table
|id|employee_name|department_id|position|
|--|--|--|--|
|1|梅野|1|部長|
|2|大山|3|課長|
|3|糸原|2|次長|
|4|小幡|2|社員|
|5|近本|1|係長|

この時、各部署ごとの従業員の名を表示したいとする。

ActiveRecord で直観的に書くと、以下のようになる。

```
departments = department.all

departments.map do |department|
 puts department.employee.name
end
```

これを実行すると、SQL 的には

```
select * from departments;
select * from employees where department_id = 1;
select * from employees where department_id = 2;
select * from employees where department_id = 3;
```

となり、

- department を全て取得
- map の 1 週目のループで department_id = 1 のデータを取得
- map の 2 週目のループで department_id = 2 のデータを取得
- map の 3 週目のループで department_id = 3 のデータを取得

と、departments_table に対して 1 回、employees_table に対して 3 回の計 4 回のアクセスが発生する。

## 解決策

### eager loading

Eager loading とは、予め Active Record で関連するテーブルを すべてメモリ上に確保してしまうという方法のこと。
これによって、例の department_id=1 ~ 3 のデータをループを回さずに一度で取得できる。
しかし、関連するテーブルもすべてメモリ上にあるので大量のメモリを消費することになるデメリットがある。

Eager loading を ActiveRecord で実現する方法として、`includesメソッド`がある。

構文は以下の通り。

```
モデルA.include(:モデルB)
```

上の例を用いて`includesメソッド`を表現すると以下のようになる。

```
departments = department.include(:employee).all

departments.map do |department|
 puts department.employee.name
end
```

SQL 的には`includesメソッド`を使うと、

```
select * from departments;
select * from employees where department_id in (1, 2, 3);
```

という感じになり、`department_id = ~`と１つずつアクセスしていたのを`IN`でまとめて取得できる。

### lazy loading

Lazy loading とは、関連する Record のテーブルが必要になった時に SQL を発行して 必要な値を取り出す方法。
この場合はメモリを確保する量は少なくてすむが、関連するテーブルを使うごとに SQL が発行されることになり、 動作が重くなる可能性がある。
遅延読み込みとも呼ばれる。

## 参考文献

にょけんのボックス | Rails「N+1 問題」超分かりやすい解説・解決方法【includes を使おう】(最終閲覧日：2020 年 12 月 14 日）
https://nyoken.com/rails-includes

withnic の Web エンジニアな日々 | ORM の eager loading と lazy loading について(最終閲覧日：2020 年 12 月 14 日）
https://blog.withnic.net/2015/08/orm-%E3%81%AE-eager-loading-%E3%81%A8-lazy-loading%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/

withnic の Web エンジニアな日々 |Rails: Active Record メソッドのパフォーマンス改善と N+1 問題の克服（翻訳）(最終閲覧日：2020 年 12 月 14 日）
https://techracho.bpsinc.jp/hachi8833/2020_03_11/89510
