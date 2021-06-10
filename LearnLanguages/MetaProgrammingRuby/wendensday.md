# ブロック

### スコープゲート

プログラムがスコープを切り替えて新しいスコープをオープンするのは以下の３つの場所。

- クラス定義
- モジュール定義
- メソッド

```
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

```
var = '成功'

class HogeClass
  # varをここに表示したい
  def hoge_method
    # ここにも表示したい
  end
end
```

以下のように`Class.new`と`Module#define_method`を使うと解決できる。

```
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

```
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

```
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
