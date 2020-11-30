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

`=`以外にも` < , >`などの不等号や`AND, OR`などの論理演算子も使える。

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

## 行の並び替え

結果を並び替えるためには`ORDER BY句`を使う。

とりあえず birth を昇順で並べる。

```
mysql> select * from students order by birth;
+----+---------+------------+
| id | name    | birth      |
+----+---------+------------+
|  1 | akashi  | 2004-08-22 |
|  4 | enokida | 2005-10-18 |
|  2 | iwaki   | 2005-11-04 |
|  5 | okita   | 2006-03-03 |
|  3 | ueno    | 2006-04-16 |
+----+---------+------------+
5 rows in set (0.00 sec)
```

降順で並べる場合は`DESC`を使う。

```
mysql> select * from students order by birth DESC;
+----+---------+------------+
| id | name    | birth      |
+----+---------+------------+
|  3 | ueno    | 2006-04-16 |
|  5 | okita   | 2006-03-03 |
|  2 | iwaki   | 2005-11-04 |
|  4 | enokida | 2005-10-18 |
|  1 | akashi  | 2004-08-22 |
+----+---------+------------+
5 rows in set (0.00 sec)
```

並び替えは文字列でもできる。

```
mysql> select * from students order by name;
+----+---------+------------+
| id | name    | birth      |
+----+---------+------------+
|  1 | akashi  | 2004-08-22 |
|  4 | enokida | 2005-10-18 |
|  2 | iwaki   | 2005-11-04 |
|  5 | okita   | 2006-03-03 |
|  3 | ueno    | 2006-04-16 |
+----+---------+------------+
5 rows in set (0.01 sec)
```

## 日付の計算

MySQL には、年齢の計算や日付の一部の抽出など、日付の計算を実行するために使用できるいくつかの関数が用意されている。

生徒の年齢を確認するには`TIMESTAMPDIFF()関数`を使う。

使い方は

```
TIMESTAMPDIFF([返り値の単位], [引数の日付1], [引数の日付2])
```

返り値の単位を`YEAR`にすると、計算結果が`YEAR`の形になるし、返り値の単位を`MONTH`にすれば、計算結果が`MONTH`で帰ってくる。

また、返り値は`[引数の日付2] - [引数の日付1]`になるので、`[現在の日付] - [生年月日] = [年齢]`という計算をすればいい。

今回は生徒の年齢を`age`というカラムとして出力する。

```
mysql> select name, birth, CURDATE(), TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age from students;
+---------+------------+------------+------+
| name    | birth      | CURDATE()  | age  |
+---------+------------+------------+------+
| akashi  | 2004-08-22 | 2020-11-24 |   16 |
| iwaki   | 2005-11-04 | 2020-11-24 |   15 |
| ueno    | 2006-04-16 | 2020-11-24 |   14 |
| enokida | 2005-10-18 | 2020-11-24 |   15 |
| okita   | 2006-03-03 | 2020-11-24 |   14 |
+---------+------------+------------+------+
5 rows in set (0.01 sec)
```

上記の日付の計算をしながら`ORDER BY句`でソートすることもできる。
例として age を昇順でソートする。

```
 mysql> select name, birth, CURDATE(), TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age from students order by age;
+---------+------------+------------+------+
| name    | birth      | CURDATE()  | age  |
+---------+------------+------------+------+
| ueno    | 2006-04-16 | 2020-11-24 |   14 |
| okita   | 2006-03-03 | 2020-11-24 |   14 |
| iwaki   | 2005-11-04 | 2020-11-24 |   15 |
| enokida | 2005-10-18 | 2020-11-24 |   15 |
| akashi  | 2004-08-22 | 2020-11-24 |   16 |
+---------+------------+------------+------+
5 rows in set (0.00 sec)
```

## NULL 値の操作

MySQL の公式曰く、NULL とは**欠落している未知の値**らしい。
分かるような分からないような感じだが、対象の値が NULL であるかを`IS NOT NULL演算子`を使えばテストできるので試してみる。

とりあえず１は NULL かそうじゃないのかをテストする。

```
mysql> SELECT 1 IS NULL, 1 IS NOT NULL;
+-----------+---------------+
| 1 IS NULL | 1 IS NOT NULL |
+-----------+---------------+
|         0 |             1 |
+-----------+---------------+
1 row in set (0.00 sec)
```

1 は`NOT NULL`ということが分かった。

※MySQL では 0 と NULL は false を意味し、それ以外は true を意味する

また NULL に対しては算術比較演算子は使えないらしい。

```
mysql> SELECT 1 = NULL, 1 <> NULL, 1 < NULL, 1 > NULL;
+----------+-----------+----------+----------+
| 1 = NULL | 1 <> NULL | 1 < NULL | 1 > NULL |
+----------+-----------+----------+----------+
|     NULL |      NULL |     NULL |     NULL |
+----------+-----------+----------+----------+
1 row in set (0.00 sec)
```

最後に`0`と`''`は NULL なのかテストする。

```
mysql> SELECT 0 IS NULL, 0 IS NOT NULL, '' IS NULL, '' IS NOT NULL;
+-----------+---------------+------------+----------------+
| 0 IS NULL | 0 IS NOT NULL | '' IS NULL | '' IS NOT NULL |
+-----------+---------------+------------+----------------+
|         0 |             1 |          0 |              1 |
+-----------+---------------+------------+----------------+
1 row in set (0.00 sec)
```

`0`と`''`は NULL ではないことが分かった。

## パターンマッチング

MySQL には標準の SQL パターンマッチングと、正規表現に基づくパターンマッチングの機能がある。

まず、標準のパターンマッチングから見ていく。
ちなみにデフォルトで大文字と小文字を区別しない。

演算子として`LIKE`または`NOT LIKE`比較演算子を使う。

例えば name に`a`で始まる値をもつレコードがあるかを検索する。

```
mysql> select * from students where name like 'a%';
+----+--------+------------+
| id | name   | birth      |
+----+--------+------------+
|  1 | akashi | 2004-08-22 |
+----+--------+------------+
1 row in set (0.00 sec)
```

次に`da`で終わる名前はあるかを検索する。

```
mysql> select * from students where name like '%da';
+----+---------+------------+
| id | name    | birth      |
+----+---------+------------+
|  4 | enokida | 2005-10-18 |
+----+---------+------------+
1 row in set (0.01 sec)
```

名前に`w`が含まれているレコードを検索する。

```
mysql> select * from students where name like '%w%';
+----+-------+------------+
| id | name  | birth      |
+----+-------+------------+
|  2 | iwaki | 2005-11-04 |
+----+-------+------------+
1 row in set (0.00 sec)
```

文字数で検索したい時は`_パターン文字`を任意の数使う。

例として、名前が５文字の人がいるかを調べてみる。

```
mysql> select * from students where name like '_____';
+----+-------+------------+
| id | name  | birth      |
+----+-------+------------+
|  2 | iwaki | 2005-11-04 |
|  5 | okita | 2006-03-03 |
+----+-------+------------+
2 rows in set (0.00 sec)
```

次に正規表現に基づくパターンマッチングを見ていく。

正規表現のパターンマッチングを使う場合は`REGEXP_LIKE()関数`を用いる。

標準のパターンマッチングで検索した条件を正規表現で見てみる。

名前の先頭に`a`を含むレコードの検索

```
mysql> select * from students where regexp_like(name, '^a');
+----+--------+------------+
| id | name   | birth      |
+----+--------+------------+
|  1 | akashi | 2004-08-22 |
+----+--------+------------+
1 row in set (0.00 sec)
```

名前の終わりに`da`を含むレコードの検索

```
mysql> select * from students where regexp_like(name, 'da$');
+----+---------+------------+
| id | name    | birth      |
+----+---------+------------+
|  4 | enokida | 2005-10-18 |
+----+---------+------------+
1 row in set (0.00 sec)
```

名前に`w`を含むレコードの検索

```
mysql> select * from students where regexp_like(name, 'w');
+----+-------+------------+
| id | name  | birth      |
+----+-------+------------+
|  2 | iwaki | 2005-11-04 |
+----+-------+------------+
1 row in set (0.00 sec)
```

名前が５文字のレコードの検索

```
mysql> select * from students where regexp_like(name, '^.{5}$');
+----+-------+------------+
| id | name  | birth      |
+----+-------+------------+
|  2 | iwaki | 2005-11-04 |
|  5 | okita | 2006-03-03 |
+----+-------+------------+
2 rows in set (0.00 sec)
```

## 行のカウント

テーブル内にどの値が何個あるかを調べたい時は`COUNT()`が使える。

COUNT の引数には`カラム`が入る。
この時に返される値は NULL のデータを除いた数になる。

null を含めて行数を返した時は引数に`*`を入れる。

例として、students テーブルに何個のデータがあるかを調べたいとする(id があるから分かるけど)。

そのような時に`COUNT()`を以下のように使う。

```
mysql> select count(*) from students;
+----------+
| count(*) |
+----------+
|        5 |
+----------+
1 row in set (0.00 sec)
```

また、特定の値が何個あるかを調べたい時は`COUNT()`と`GROUP BY`を組み合わせて使う。

例として、生年月日の同じ年でグループ化してカウントしてみる。

```
mysql> select date_format(birth, "%Y"), count(date_format(birth, "%Y")) from students group by date_format(birth, "%Y");
+--------------------------+---------------------------------+
| date_format(birth, "%Y") | count(date_format(birth, "%Y")) |
+--------------------------+---------------------------------+
| 2004                     |                               1 |
| 2005                     |                               2 |
| 2006                     |                               2 |
+--------------------------+---------------------------------+
3 rows in set (0.00 sec)
```

## 複数のテーブルの使用

2 つのテーブルの両方からデータを取得するときは内部結合を使う。
内部結合とは 2 つのテーブルでそれぞれ結合の対象となるカラムを指定し、それぞれのカラムに同じ値が格納されているデータを結合して取得するもののこと。

今回は例として

- teams テーブルを新たに作成
- students テーブルに部活 ID を持たせる
- teams テーブルと students テーブルを結合させる

の 3 つをやってみる。

まずは、teams テーブルを新たに作成する。
持たせるデータ型は以下のようにする。

- id SMALLINT UNIQUE NOT NULL,
- team_name VARCHAR(20)

```
mysql> CREATE TABLE teams (id SMALLINT UNIQUE NOT NULL, team_name VARCHAR(20));
Query OK, 0 rows affected (0.01 sec)
```

テーブル構造を確認する。

```
mysql> DESCRIBE teams;
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| id        | smallint    | NO   | PRI | NULL    |       |
| team_name | varchar(20) | YES  |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

次に teams テーブルにデータを登録する。
持たせるデータは以下にする。

- id = 1, team_name = 'baseball team'
- id = 2, team_name = 'basketball team'
- id = 3, team_name = 'tennis team'

```
mysql> insert into teams value(1, 'baseball_team');
Query OK, 1 row affected (0.01 sec)

mysql> insert into teams value(2, 'basketball team');
Query OK, 1 row affected (0.01 sec)

mysql> insert into teams value(3, 'tennis team');
Query OK, 1 row affected (0.01 sec)
```

データが正しく登録されているか確認する。

```
mysql> select * from teams;
+----+-----------------+
| id | team_name       |
+----+-----------------+
|  1 | baseball team   |
|  2 | basketball team |
|  3 | tennis team     |
+----+-----------------+
3 rows in set (0.00 sec)
```

次に students テーブルに部活 ID を持たせる。
今の students テーブルには部活 ID に相当するものがないので、新たに`team_id`カラムを追加する。

テーブルにカラムを追加するために`ALTER TABLE ~ ADD`コマンドを使う。

```
ALTER TABLE [テーブル名] ADD [新規カラム名] [型情報] [オプション];
```

```
mysql> ALTER TABLE students ADD team_id SMALLINT;
Query OK, 0 rows affected (0.00 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

テーブル構造の確認。

```
mysql> describe students;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| id      | smallint    | NO   | PRI | NULL    |       |
| name    | varchar(20) | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| team_id | smallint    | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
```

上手くいっているっぽいので、後は適当に team_id の情報を追加する。

テーブルの中身を確認。

```
mysql> select * from students;
+----+---------+------------+---------+
| id | name    | birth      | team_id |
+----+---------+------------+---------+
|  1 | akashi  | 2004-08-22 |       1 |
|  2 | iwaki   | 2005-11-04 |       2 |
|  3 | ueno    | 2006-04-16 |       3 |
|  4 | enokida | 2005-10-18 |       1 |
|  5 | okita   | 2006-03-03 |       2 |
+----+---------+------------+---------+
5 rows in set (0.00 sec)
```

いよいよ内部結合をする。

2 つのテーブルを内部結合させてデータを取得するには`SELECT文`と`INNER JOIN句`を組み合わせて使えば良い。

```
SELECT table_name.col_name1 [, table_name.col_name2 ...]
FROM table_name1
INNER JOIN tbl_name2
ON table_name1.col_name1 = table_name2.col_name2;
```

`SELECT`以下は見たいデータのカラムを指定する。
全部見たい時は`*`を記述すれば良い。

`FROM`以下には結合元のテーブル名を指定する。

`INNER JOIN`以下には結合先のテーブル名を指定する。

どのように結合するのかは`ON`の後に記述する。
結合の対象となるカラムについて`テーブル名1.カラム名1 = テーブル名2.カラム名2`の形式で指定する。

```
mysql> select * from students inner join teams on students.team_id = teams.id;
+----+---------+------------+---------+----+-----------------+
| id | name    | birth      | team_id | id | team_name       |
+----+---------+------------+---------+----+-----------------+
|  1 | akashi  | 2004-08-22 |       1 |  1 | baseball team   |
|  2 | iwaki   | 2005-11-04 |       2 |  2 | basketball team |
|  3 | ueno    | 2006-04-16 |       3 |  3 | tennis team     |
|  4 | enokida | 2005-10-18 |       1 |  1 | baseball team   |
|  5 | okita   | 2006-03-03 |       2 |  2 | basketball team |
+----+---------+------------+---------+----+-----------------+
5 rows in set (0.00 sec)
```

上記のコマンドより、from で指定したテーブルが左側に、inner join で指定したテーブルが右側にきていることが分かる。

この結合は「students テーブルに対して、teams テーブルを結合した」と言う。

今度は逆に「teams テーブルに対して、students テーブルを結合」してみる。

```
mysql> select * from teams inner join students on teams.id = students.team_id;
+----+-----------------+----+---------+------------+---------+
| id | team_name       | id | name    | birth      | team_id |
+----+-----------------+----+---------+------------+---------+
|  1 | baseball team   |  1 | akashi  | 2004-08-22 |       1 |
|  2 | basketball team |  2 | iwaki   | 2005-11-04 |       2 |
|  3 | tennis team     |  3 | ueno    | 2006-04-16 |       3 |
|  1 | baseball team   |  4 | enokida | 2005-10-18 |       1 |
|  2 | basketball team |  5 | okita   | 2006-03-03 |       2 |
+----+-----------------+----+---------+------------+---------+
5 rows in set (0.00 sec)
```

今は id カラムが２個出ていたりしてデータが見にくい状態になっている。
どの生徒がなんの部活に所属しているかだけ見たい時には、

- name カラム
- team_name カラム

だけ指定すれば良い。

複数テーブルを結合した状態でカラムを指定するときは`SELECT`以下に次のようにすることで指定できる。

```
[テーブル名].[カラム名]
```

ただし、複数テーブルを結合した状態でもカラム名が一意に分かる場合は`[テーブル名].`は省略できる。

と言うことで`name`カラムと`team_name`カラムを指定してデータを取得してみる。

```
mysql> select name, team_name from students inner join teams on students.team_id = teams.id;
+---------+-----------------+
| name    | team_name       |
+---------+-----------------+
| akashi  | baseball team   |
| iwaki   | basketball team |
| ueno    | tennis team     |
| enokida | baseball team   |
| okita   | basketball team |
+---------+-----------------+
5 rows in set (0.00 sec)
```

## データベースとテーブルに関する情報の取得

データベースとテーブルに関する情報の取得したい時のコマンドを表形式でまとめておく

| コマンド              | ユースケース                                             |
| --------------------- | -------------------------------------------------------- |
| SHOW DATABASES        | サーバーによって管理されているデータベースを一覧表示する |
| SELECT DATABASE()     | 現在選択されているデータベースを確認する                 |
| SHOW TABLES           | 現在選択されているデータベースのテーブルを一覧する       |
| DESCRIBE [テーブル名] | テーブルの構造を確認する                                 |

## 列の最大値

例に用いるために`shopテーブル`を新しく作成する。

```
mysql> CREATE TABLE shop (
    ->     article INT UNSIGNED  DEFAULT '0000' NOT NULL,
    ->     dealer  CHAR(20)      DEFAULT ''     NOT NULL,
    ->     price   DECIMAL(16,2) DEFAULT '0.00' NOT NULL,
    ->     PRIMARY KEY(article, dealer));
Query OK, 0 rows affected (0.02 sec)
```

テーブル構造は以下のようになっている。

```
mysql> describe shop;
+---------+---------------+------+-----+---------+-------+
| Field   | Type          | Null | Key | Default | Extra |
+---------+---------------+------+-----+---------+-------+
| article | int unsigned  | NO   | PRI | 0       |       |
| dealer  | char(20)      | NO   | PRI |         |       |
| price   | decimal(16,2) | NO   |     | 0.00    |       |
+---------+---------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

データを入れておく。

```
mysql> INSERT INTO shop VALUES
    ->     (1,'A',3.45),(1,'B',3.99),(2,'A',10.99),(3,'B',1.45),
    ->     (3,'C',1.69),(3,'D',1.25),(4,'D',19.95);
Query OK, 7 rows affected (0.01 sec)
Records: 7  Duplicates: 0  Warnings: 0
```

データの確認

```
mysql> SELECT * FROM shop ORDER BY article;
+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|       1 | A      |  3.45 |
|       1 | B      |  3.99 |
|       2 | A      | 10.99 |
|       3 | B      |  1.45 |
|       3 | C      |  1.69 |
|       3 | D      |  1.25 |
|       4 | D      | 19.95 |
+---------+--------+-------+
7 rows in set (0.00 sec)
```

カラムの最大値を取得する。
最大値を取得するには`MAX`コマンドを使えば良い。

使い方は以下のような感じ。

```
SELECT MAX([カラム名]) AS [表示するときのカラム名] FROM [テーブル名];
```

例として、`article`の最大値を取得する。

```
mysql> select max(article) as articleNamber from shop;
+---------------+
| articleNamber |
+---------------+
|             4 |
+---------------+
1 row in set (0.00 sec)
```

## 特定の列の最大値を保持する行

最大値のフィールドだけでなく、特定のカラムで最大値をもつフィールドを含んだレコードを取得したい時には`MAX`コマンドをサブクエリで実行すれば良い。

例として、price カラムで最大値を持つフィールドを含んだレコードを取得する。

```
mysql> select * from shop where price=(select max(price) from shop);
+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|       4 | D      | 19.95 |
+---------+--------+-------+
1 row in set (0.00 sec)
```

## グループあたりの最大列数

グループあたりの最大値だけを抜き出して列挙する時には、`MAX`コマンドと`GROUP BY`コマンドを組み合わせて使う。

例として article ごとの price の最大値を見つけてみる。

```
mysql> select article, max(price) as price from shop group by article order by article;
+---------+-------+
| article | price |
+---------+-------+
|       1 |  3.99 |
|       2 | 10.99 |
|       3 |  1.69 |
|       4 | 19.95 |
+---------+-------+
4 rows in set (0.00 sec)
```

## 特定のカラムのグループごとの最大値が格納されている行

## ユーザー定義変数の使用

MySQL ユーザー変数を使用すると、クライアントの一時変数に結果を保存しなくても結果を記憶することができる。

例えば price が最大値と最小値の article を見つけてくる。

まずはユーザー定義変数に price の最大値と最小値を定義する。

```
mysql> select @min_price:=min(price), @max_price:=max(price) from shop;
+------------------------+------------------------+
| @min_price:=min(price) | @max_price:=max(price) |
+------------------------+------------------------+
|                   1.25 |                  19.95 |
+------------------------+------------------------+
1 row in set, 2 warnings (0.00 sec)
```

次に上で定義したユーザー定義変数を使って、price が最大値と最小値の article を見つけてくる。

```
mysql> select * from shop where price=@min_price or price=@max_price;
+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|       3 | D      |  1.25 |
|       4 | D      | 19.95 |
+---------+--------+-------+
2 rows in set (0.00 sec)
```

## 補足

データベースオブジェクトの命名規則として、以下を参考にした。

[Qiita | データベースオブジェクトの命名規約](https://qiita.com/genzouw/items/35022fa96c120e67c637)
