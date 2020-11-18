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

## 補足

データベースオブジェクトの命名規則として、以下を参考にした。
[Qiita | データベースオブジェクトの命名規約](https://qiita.com/genzouw/items/35022fa96c120e67c637)
