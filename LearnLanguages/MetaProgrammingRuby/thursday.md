# クラス定義

## クラス定義の中身

クラス定義にはメソッド以外のあらゆるコードを書くことができる。

```Ruby
class HelloClass
 p 'hello'
end

# => "hello"
```

また、メソッドやブロックと同じように最後の命令文の値を戻す。

```Ruby
result = class HogeClass
 a = 10
 b = 20
end

p result # => 20
```

## カレントクラス

Ruby はカレントオブジェクト self を持っている。
それと同様にカレントクラスを持っている。

カレントクラスの追跡のルールは以下の通り。

- プログラムのトップレベルでは main のクラスの Object になる。

```Ruby
p self # => main
p self.class # => Object
```

- class キーワードでクラス(あるいは module キーワードでモジュール)をオープンすると、そのクラスがカレントクラスになる

- メソッドの中では、カレントオブジェクトのクラスがカレントクラスになる

### class_eval

class_eval はクラスのコンテキストでブロックを評価できる。

```Ruby
def add_method_to(klass)
  klass.class_eval do
    def greet
      p 'Hello!'
    end
  end
end

add_method_to(String)

'abc'.greet # => "Hello!"
```

こんな感じで、オープンクラスみたく、クラスをブロックで開くことができる。

また、class_eval は self とカレントクラスを変更することができる。

```Ruby
class HogeClass
  def initialize
    @v = 1
  end
end

object = HogeClass.new

object.instance_eval do
  p self # => #<HogeClass:0x00000000015cddb0 @v=1>
  p @v # => 1
end

HogeClass.class_eval do
  def initialize
    @v = 2
  end

  def hoge
    p 'hoge'
  end
end

# 書き換え前に作られたオブジェクトにもhogeメソッドは使える。
object.hoge # => "hoge"

# 書き換え前に作られたオブジェクトのselfは上書きされない。
object.instance_eval do
  p self # => #<HogeClass:0x00000000015cddb0 @v=1>
  p @v # => 1
end

object2 = HogeClass.new

# 書き換え後に作られたオブジェクトのselfは上書きされている。
object2.instance_eval do
  p self #<HogeClass:0x0000000001b64558 @v=2>
  p @v # => 2
end
```
