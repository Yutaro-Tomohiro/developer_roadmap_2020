# メソッド

## 動的メソッド

### メソッドを動的に呼び出す

通常、メソッドを呼び出す時にはドット記法を使うが、`Object#send`を使って呼び出す方法もある。

```
# ドッド記法
'abc'.upcase # => "ABC"

# Object#send
'abc'.send(:upcase) # => "ABC"
```

send を使うと、呼び出したいメソッド名が引数として扱えるので、コードの実行時に呼び出すメソッドを決められるというメリットがある。

これを動的ディスパッチと呼ぶ。

### メソッドを動的に定義する

Module#define_method を使うと動的にメソッドを定義できる。

使い方はメソッド名とブロックを渡す。

ブロックがメソッドの本体となる。

```
class HogeClass
  define_method :hoge_method do |arg|
      arg * 2
  end
end

object = HogeClass.new

object.hoge_method(3)
# => 6
```

### リファクタリングしてみよう

以下のコードをリファクタリングしていく。

```
class GetPrice
  def get_display_price
    price = 1000
  end

  def get_cpu_price
    price = 500
  end

  def get_keyboard_price
    price = 100
  end
end

class Computer
  def initialize(data_source)
      @data_source = data_source
  end

  def display
    price =  @data_source.get_display_price
    dollar = "#{price}$"
    result = "display is #{dollar}"
    p result
  end

  def cpu
    price =  @data_source.get_cpu_price
    dollar = "#{price}$"
    result = "Cpu is #{dollar}"
    p result
  end

  def keyboard
    price =  @data_source.get_keyboard_price
    dollar = "#{price}$"
    result = "keyboard is #{dollar}"
    p result
  end
end

pc = Computer.new(GetPrice.new)
pc.keyboard # => "keyboard is 100$"
```

### 動的ディスパッチを追加する

```
class Computer
  def initialize(data_source)
      @data_source = data_source
  end

  def display
    component(:display)
  end

  def cpu
    component(:cpu)
  end

  def keyboard
    component(:keyboard)
  end

  def component(name)
    price =  @data_source.send(:"get_#{name}_price")
    p "#{name.capitalize} is #{price}$"
  end
end
```

### メソッドを動的に生成する

```
class Computer
  def initialize(data_source)
      @data_source = data_source
  end

  def self.component(name)
    define_method(name) do
      price =  @data_source.send(:"get_#{name}_price")
      p "#{name.capitalize} is #{price}$"
    end
  end

  component(:display)
  component(:cpu)
  component(:keyboard)
end
```

### 重複をさらに取り除く

```
class Computer
  def initialize(data_source)
      @data_source = data_source
      data_source.methods.grep(/^get_(.*)_price$/){ Computer.component $1 }
  end

  def self.component(name)
    define_method(name) do
      price =  @data_source.send(:"get_#{name}_price")
      p "#{name.capitalize} is #{price}$"
    end
  end
end
```

## method_missing

動的ディスパッチでは「この名前のメソッドを定義しておいてね」という感じだったが、ruby では「知らないメソッド名がきたらこの処理してね」ということもできる。

### method_missing のオーバーライド

method_missing をオーバーライドすることで実際には存在しないメソッドを呼び出せる。

```
class HogeClass
  def method_missing(method, *args)
    p "called : #{method}(#{args.join(',')})"
  end
end

object = HogeClass.new
object.hoge('a', 'b')
# => "called : hoge(a,b)"
```

こんな感じで呼び出し側からは通常の呼び出しのように見えるが、レシーバー側からすればメソッドが見当たらない。

これをゴーストメソッドと呼ぶ。

### ブランクスレート

method_missing をして動的にメソッドを呼べるようにしても、継承チェーンのクラスのインスタンスメソッドにすでに定義されているメソッド名と被れば、そちらが優先されてしまうため、期待した動作と異なる場合があるかもしれない。

それを避けるためには BasicObject を直接継承すれば良い。

これをブランクスレートと呼ぶ。

```
class HogeClass
  def method_missing(method, *args)
    "ゴーストメソッド!"
  end
end

object = HogeClass.new
p object.hoge # => "ゴーストメソッド!"
p object.display # => #<HogeClass:0x00000000014de300>nil
```

display メソッドは Object クラスのインスタンスメソッドのため、method_missing に引っかからずに期待とは違う動作になった。

```
class HogeClass < BasicObject
  def method_missing(method, *args)
    "ゴーストメソッド!"
  end
end

object = HogeClass.new
p object.hoge # => "ゴーストメソッド!"
p object.display # => "ゴーストメソッド!"
```

HogeClass は BasicObject のサブクラスのため、Object#display は呼び出されない。

## まとめ

- メソッドを動的に呼び出したいなら基本的に動的ディスパッチを使う
- なぜならゴーストメソッドは複雑なバグを引き起こすため
- 仕方ない時だけゴーストメソッドを使う(生成したいメソッドが無数にある場合など)
