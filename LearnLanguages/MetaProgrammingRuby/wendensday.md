# ブロック

### スコープゲート

プログラムがスコープを切り替えて新しいスコープをオープンするのは以下の３つの場所。

- クラス定義
- モジュール定義
- メソッド

```Ruby
v1 = 1

class HogeClass # スコープゲートclassの入り口
  v2 = 2
  p local_variables # => [:v2]
  def hoge_method # スコープゲートdefの入り口
    v3 = 3
    local_variables
  end # スコープゲートdefの出口
  p local_variables # => [:v2]
end # スコープゲートclassの出口

object = HogeClass.new

p object.hoge_method # => [:v3]
p local_variables # => [:v1, :object]
```

### スコープのフラット化

以下のようなことをしたい場合はどうすればいいだろうか？

```Ruby
var = '成功'

class HogeClass
  # varをここに表示したい
  def hoge_method
    # ここにも表示したい
  end
end
```

以下のように`Class.new`と`Module#define_method`を使うと解決できる。

```Ruby
var = '成功'

HogeClass = Class.new do
  p var # => "成功"
  define_method :hoge_method do
    p var
  end
end

HogeClass.new.hoge_method # => "成功"
```

### instance_eval

BasicObject#instance_eval はオブジェクトのコンテキストでブロックを評価する。

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
```

このように instance_eval は渡したブロックの内部探査してコードを実行できる。

このようなものをコンテキスト探査機と呼ぶ。

#### カプセル化の破壊

コンテキスト探査機を使うことでカプセル化を破壊することができる。

```Ruby
class HogeClass
  def initialize
    @v = 1
  end
end

object = HogeClass.new

v = 2

object.instance_eval { @v = v }
object.instance_eval { p @v } # => 2
```

テストを書くときにこのテクニックがたまに使われるらしい。

## 呼び出し可能オブジェクト

Ruby でコードを保管できるものは基本的に以下の３つ。

- Proc の中
- lambda の中
- メソッドの中

### Proc オブジェクト

ブロックはオブジェクトではないため、保管しておいて後から実行というのができない。

この問題を解決するために Proc クラスがある。

```
inc = Proc.new { |x| x + 1 }

p inc.call(2) # => 3
```

Ruby ではブロックを Proc に変換する方法が上以外に lambda を使う方法がある。

```Ruby
# 通常の使い方
dec = lambda { |x| x - 1 }
p dec.class # => Proc
p dec.call(2) # => 1

# 矢印ラムダの使い方
inc = ->(x) { x + 1 }
p inc.call(2) # => 3
```

#### &修飾

ブロックは普通はメソッドの中で使う場合は yield を使うが yield では足りないパターンがある。

- 他のメソッドにブロックを渡したい時
- ブロックを Proc に変換したい時

上のような問題を解決したい時は&演算子を使うと、proc オブジェクトをブロック引数の代わりにメソッドに渡せる。

```Ruby
def math(a, b)
  yield(a, b)
end

def do_math(a, b, &operation)
  p operation.class # => Proc
  p math(a, b, &operation)
end

do_math(2, 3) { |x, y| x + y } # => 5
```

ちなみにブロックは変数 operation が参照された時点で Proc オブジェクトに変換されている。

### Proc と lambda の違い

#### return

lambda の return は単に lambda から戻るだけ。

```Ruby
def double(callable_object)
  callable_object.call*2
end

l = lambda { return 10 }
p double(l) # => 20
```

Proc の場合、Proc から戻らずに Proc が定義されたスコープから戻る。

```Ruby
def double
  p = Proc.new { return 10 }
  result = p.call
  result*2 # ここまで渡らない
end

p double # => 10
```

この挙動を知っていれば以下のようなバグは避けられる。

```Ruby
def double(callable_object)
  callable_object.call*2
end

p = Proc.new { return 10 }
p double(p) # =>
```

p はトップレベルでされているため、戻れないためプログラムは期待した動作をしない。

明示的な return を使わなければこのようなミスは回避できる。

```Ruby
def double(callable_object)
  callable_object.call*2
end

p = Proc.new { 10 }
p double(p) # => 20
```

### Method オブジェクト

ruby ではメソッドも呼び出し可能オブジェクトとして扱うことができる。

```Ruby
class HogeClass
  def initialize(value)
      @x = value
  end

  def hoge_method
    p @x
  end
end

object = HogeClass.new(1)
m = object.method(:hoge_method)
m.call # => 1
```
