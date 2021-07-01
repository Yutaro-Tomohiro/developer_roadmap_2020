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

## クラスインスタンス変数

以下の例ではクラスのインスタンス変数とクラスのオブジェクトのインスタンス変数は別物であることを示している。

```Ruby
class MyClass
  @v = 1
  def self.read; p @v; end
  def write; @v = 2; end
  def read; p @v; end
end

obj = MyClass.new
obj.read # => nil
obj.write
obj.read # => 2
MyClass.read # => 1
```

上のコードでは 2 つの@v が異なるスコープで定義されている。

クラスもオブジェクトであることと self がスコープによってどのような振る舞いをするのかを思い出すと理解しやすい。

write メソッドで定義されている@v は obj が self となるため、obj のインスタンス変数である。

MyClass 直下に定義されている@v は MyClass が self となるため、MyClass というオブジェクトのインスタンス変数となる。

このようなインスタンス変数をクラスインスタンス変数と呼ぶ。

## 特異メソッドの導入

Ruby では特定のオブジェクトにメソッドを追加できる。

```Ruby
str = "jast a regular string"

p str.methods.grep(/title?/) # => []

def str.title?
  self.upcase == self
end

p str.title? # => false

p str.methods.grep(/title?/) # => [:title?]
p 'aaa'.methods.grep(/title?/) # => []

# singleton_methodsはそのオブジェクトに定義されている特異メソッドの一覧を返すメソッド
p str.singleton_methods # => [:title?]
```

上記のコードは文字列 str に title?メソッドを追加している。
String クラスの他のオブジェクトには影響がない。

このように単一のオブジェクトに特化したメソッドを特異メソッドと呼ぶ。

特異メソッドは上記の方法か、Object#define_singleton_method で定義できる。

## クラスメソッドはクラスの特異メソッド

いきなりの復習になるが、クラスは単なるオブジェクトであり、クラス名は単なる定数である。

このことが分かれば、クラスメソッドの呼び出しと、インスタンスメソッドの呼び出しは同じものであることが分かる。

```Ruby
an_object.a_method
AClass.a_class_method
```

1 行目は変数で参照したオブジェクトのメソッドを呼び出している。

2 行目は定数で参照したオブジェクトのメソッドを呼び出している。

ここで思い出したいのはクラスメソッドの定義の方法である。

特異メソッドとクラスメソッドの定義の仕方を比較してみると、この 2 つは同じものであることが分かる。

```
def obj.a_singleton_method; end
def MyClass.another_class_method; end
```

つまり、特異メソッドを def を使って定義する構文は常に以下のようになる。

```Ruby
def object.method
  #  メソッドの中身
end
```

上記の object の部分には以下の 3 つが使える。

- オブジェクトの参照
- クラス名の定数
- self