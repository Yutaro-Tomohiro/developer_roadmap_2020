# Fizz Buzzを書いてみよう

## Fizz Buzzとは？
英語圏で長距離ドライブ中や飲み会の時に行われる言葉遊び。以下、遊び方というかルールについて。

- １からスタートして１づつ加算した数値を答える。
- この時に3の倍数の場合は数の代わりに「Fizz」と答える。
- 5の倍数の場合は「Buzz」と答える。
- 3と5の公倍数の場合は「Fizz Buzz」を答える。
- 発言を間違えた者や、ためらった者は脱落となる。

今回は、このゲームに則ったアルゴリズムを整数の1 ~ 30の範囲でRubyとGoで書いていく。

## 開発環境と実行環境について
開発環境と実行環境は[paiza.io](https://paiza.io/ja)を使った。

## Rubyでのコードと実行結果
Rubyを用いて1から30以下の整数でFizz Buzzを満たすコードを書くと以下のようになる。

```
(1...51).each do |num|
  if num % 15 == 0
    puts 'Fizz Buzz'
  elsif num % 3 == 0
    puts 'Fizz'
  elsif num % 5 == 0
    puts 'Buzz'
  else
    puts num
  end
end
```

実行結果は以下のようになる。

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
Fizz Buzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
Fizz Buzz
```

## Goでのコードと実行結果
Goを用いて1から30以下の整数でFizz Buzzを満たすコードを書くと以下のようになる。

```
package main
import "fmt"
func main(){
    for i := 1; i < 31; i++ {
        if i % 15 == 0 {
            fmt.Println("Fizz Buzz")
        } else if i % 3 == 0 {
            fmt.Println("Fizz")
        } else if i % 5 == 0 {
            fmt.Println("Buzz")
        } else {
            fmt.Println(i)
        }
    }
}
```

実行結果は以下のようになる。

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
Fizz Buzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
Fizz Buzz
```

## 参考文献
Wikipedia | Fizz Buzz(最終閲覧日：2020年9月28日）
https://ja.wikipedia.org/wiki/Fizz_Buzz

golangの日記 | Go言語(golang)のループ for, for..range, foreach, while(最終閲覧日：2020年9月28日）
https://golang.hateblo.jp/entry/2019/10/07/171630

golangの日記 |Go言語(golang) if文の使い方(最終閲覧日：2020年9月28日）
https://golang.hateblo.jp/entry/golang-if-statement
