# MySQL のハンズオン

## データベースの作成と使用

データベースを作るコマンドは以下の通り。

```
CREATE DATABASE [データベース名];
```

データベース名は大文字と小文字で区別されているので注意。

今回は`schoolデータベース`を作成する。

```
mysql> CREATE DATABASE school;
Query OK, 1 row affected (0.00 sec)
```

作成しただけだと、そのデータベースを使用できる状態ではないので、どのデータベースを使うか明示的に指定する必要がある。

```
USE [使いたいデータベース名];
```

なので school データベースを選択する。

```
mysql> USE school;
Database changed
```

どんなデータベースが作成されているかを調べるには以下のコマンドを使えば良い。

```
SHOW databases;
```

## テーブルの作成

次はテーブルの作成方法について。
コマンドは以下の通り。

```
CREATE TABLE [テーブル名] ([カラム名][データ型], ...);
```

今回は学校の生徒を管理するための`studentsテーブル`を作成する。
students テーブルは現時点では以下のデータ型を持たせて作成する。

- id SMALLINT UNIQUE NOT NULL,
- name VARCHAR(20)
- birth DATE

```
mysql> CREATE TABLE students(id SMALLINT UNIQUE NOT NULL, name VARCHAR(20), birth DATE);
Query OK, 0 rows affected (0.01 sec)
```

作成したテーブル一覧は以下のコマンドで確認できる。

```
SHOW TABLES;
```

ということで、students テーブルがちゃんとあるか確認する。

```
mysql> SHOW TABLES;
+------------------+
| Tables_in_school |
+------------------+
| students         |
+------------------+
1 row in set (0.00 sec)
```

テーブル構造は以下のコマンドで確認できるので、

```
DESCRIBE [テーブル名];
```

students テーブルが期待通りに作成されているか確認する。

```
mysql> DESCRIBE students;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | smallint    | NO   | PRI | NULL    |       |
| name  | varchar(20) | YES  |     | NULL    |       |
| birth | date        | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

## テーブルへのデータ登録

テーブルに値を登録するには 2 つの方法がある。

- 値を含んだテキストファイルを作成して、テーブルにロード
- INSERT 文

今回は INSERT 文を使う。
INSERT 文の使い方は以下の通り。

```
INSERT INTO [テーブル名]  VALUES('値1', '値2', ...);
```

今回は５人生徒を登録する。

- id=1, name='akashi', birth='2004-08-22'
- id=2, name='iwaki', birth='2005-11-04'
- id=3, name='ueno', birth='2006-04-16'
- id=4, name='enoshima', birth='2005-10-18'
- id=5, name='okita', birth='2006-03-03'

```
mysql> INSERT INTO students VALUES(1,'akashi','2004-08-22');
Query OK, 1 row affected (0.01 sec)
```

この調子で全員登録する。
ちゃんと登録できているかは次の章で確認する。

せっかくなので、ちょっとした実験もする。
id は制約で`UNIQUE`かつ`NOT NULL`なので、本当に

- 重複した値
- null 値

が登録できないのかを試してみる。

```
mysql> INSERT INTO students VALUES(1,'kawazoe','2006-08-03');
ERROR 1062 (23000): Duplicate entry '1' for key 'students.id'
```

`id=1`で登録しようとすると重複しているから無理！っていうエラーをちゃんと吐いた。

```
mysql> INSERT INTO students VALUES(null,'kawazoe','2006-08-03');
ERROR 1048 (23000): Column 'id' cannot be null
```

`id=null`で登録しようとすると、null は入りません！っていうエラーを吐いた。

なので、`UNIQUE`と`NOT NULL`は働いていることが分かった。

## すべてのデータの選択

テーブルから情報を pull するには、`SELECT`文を使う。
使い方の基本は以下の通り。

```
SELECT [カラム] FROM [テーブル] WHERE [条件];
```

とりあえず前の章のデータ登録がうまくいっているか確認する。
前カラムを指定する場合は`*`を使う。

```
mysql> select * from students;
+----+----------+------------+
| id | name     | birth      |
+----+----------+------------+
|  1 | akashi   | 2004-08-22 |
|  2 | iwaki    | 2005-11-04 |
|  3 | ueno     | 2006-04-16 |
|  4 | enoshima | 2005-10-18 |
|  5 | okita    | 2006-03-03 |
+----+----------+------------+
5 rows in set (0.00 sec)
```

ちゃんとデータ登録できてるっぽいことが分かった。

データを更新する方法についてだが、構文は以下の通り。

```
UPDATE [テーブル名] SET [カラム = 値] WHERE [条件];
```

今回は
`id=4, name='enoshima', birth='2005-10-18`を`id=4, name='enokida', birth='2005-10-18`
に変えてみる。

```
mysql> update students set name = 'enokida' where id = 4;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

なんかうまくいっているぽい。

本当にうまくいっているかは次の章で確認する。
(特定のレコードの情報を取得する方法は次の章でやるので)

## 特定の行と列の選択

`WHERE`に特定の条件を入れてあげればいい。
例えば、WHERE 以下に`id = 1`とか`name = 'hoge'`など。

`=`意外にも` < , >`などの不等号や`AND, OR`などの論理演算子も使える。

とりあえず、先ほど更新したレコードを取得してみる。
生年月日は更新してないので、id と name だけ取得する。

```
mysql> select id,name from students where id = 4;
+----+---------+
| id | name    |
+----+---------+
|  4 | enokida |
+----+---------+
1 row in set (0.02 sec)
```

ちゃんと更新されているのが分かった。

せっかくなので少し複雑な条件で抜き出してみる。

条件は生年月日が 2005-04-01 より大きく 2006-01-01 より小さい とする。

この条件が満たされるのは id=2, 4 となる。

```
mysql> select * from students where birth < '2006-01-01' and birth > '2005-04-01';
+----+---------+------------+
| id | name    | birth      |
+----+---------+------------+
|  2 | iwaki   | 2005-11-04 |
|  4 | enokida | 2005-10-18 |
+----+---------+------------+
2 rows in set (0.00 sec)
```

ちゃんと期待した値を取得することができた。

行の選択と列の選択は組み合わせることができる。
上記の例で id と birth だけでいい時は、

```
mysql> select id, birth from students where birth < '2006-01-01' and birth > '2005-04-01';
+----+------------+
| id | birth      |
+----+------------+
|  2 | 2005-11-04 |
|  4 | 2005-10-18 |
+----+------------+
2 rows in set (0.01 sec)
```

とすれば良い。

## 補足

データベースオブジェクトの命名規則として、以下を参考にした。
[Qiita | データベースオブジェクトの命名規約](https://qiita.com/genzouw/items/35022fa96c120e67c637)
