# フロントエンドの基礎知識
## HTMLの基礎知識
### HTMLとは？
HTMLとは「Hyper Text Markup Language（ハイパーテキスト・マークアップ・ランゲージ）」の頭文字をとった略称で、ウェブページを作成するために開発された言語のこと。

Hyper Textとは「ハイパーリンクが挿入できる高機能なテキスト」のことである。
ハイパーリンクとは「クリックすると別のページに行ける仕組み」のことで、つまり「リンク」のこと。
ハイパーリンクは画像や動画、音声などのデータファイルなどの様々なデータを埋め込むことができる。

Mark upとは「目標をつける」という意味で、ここでは「文章中の要素を明確に示す」と捉えると分かりやすい。

文章は基本的にタイトルや見出し、段落などの要素から成り立っている。
HTMLは文章構造に目標をつけることでコンピュータに理解できるようにしている。

どのように目標をつけて、文章構造を定義しているのか？というとHTMLタグというものを使っている。

### HTMLタグについて
HTMLタグとは、<　>で囲まれた記号のこと。
タグ毎にそれぞれ意味があり、文章構造を定義している。

タグは例えば以下のように書く。

例：`<h1>「虹ふたつが、雨あがった富士に」は回文です</h1>`

HTMLでは基本的に<開始タグ>～</終了タグ>で内容(要素)を囲む。
上記の例で言うと、「開始タグ、終了タグ」は「`<h1>,</h1>`」で、「要素」は「「虹ふたつが、雨あがった富士に」は回文です」になる。

## CSSとは？
CSS（Cascading Style Sheets）とは、ウェブページを装飾するための言語。
CSSをHTMLと組み合わせて使用することで、要素の色や、位置、サイズ、レイアウトなどを指定することができる。

例えば、以下のような文字が

![HTTPレスポンス_パフォーマンス](../Images/css_onlyHTML.png)

こんな感じに文字を緑色に装飾できる。

![HTTPレスポンス_パフォーマンス](../Images/css_HTMLandCSS.png)

## JavaScriptの基礎知識
JavaScriptとは動的にコンテンツを更新したり、マルチメディアを管理したり、その他多くのことができるスクリプト言語のこと。

え？何言ってるか分からない？
じゃあ、下のボタンをクリックしてみたらJavaScriptがどんなものかなんとなくわかると思うよ。
<!DOCTYPE html>
<html>
<body>

<h3 id="example">ボタンをクリックすると文章が変わるよ</h3>

<button type="button" onclick='document.getElementById("example").innerHTML = "これがJavaScriptの働きです！"'>ボタンをクリックしてね</button>

</body>
</html>

## 参考文献
なんでものびるWEB - ホームページの基本、HTMLとは何か？やさしく学ぶ基礎知識（最終閲覧日：2020年7月27日）

https://nandemo-nobiru.com/web-5214

HTMLクイックリファレンス - ★HTMLの基本（最終閲覧日：2020年7月27日）

http://www.htmq.com/htmlkihon/003.shtml

HTMLクイックリファレンス - ★CSSの基本（最終閲覧日：2020年7月27日）

http://www.htmq.com/csskihon/001.shtml


MDN web docs - JavaScriptとは（最終閲覧日：2020年7月27日）

https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/What_is_JavaScript