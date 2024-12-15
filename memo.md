## 基本的な型
- string型
- number型
- boolean型
- 配列型
- undefined型／null型
- 関数型
- object型／オブジェクト型
- any型
### bigint型
　BigIntをTypeScript上で扱う必要が出てきた場合は、bigint型というものがnumber型とは別に存在している
### boolean型
　boolean型に入るものは、`true`か`false`の2パターンしかない
空文字（`""`）、数値の`0`、`undefined`などは`if`文の判定で`false`として扱われるが、TypeScript上はいずれもboolean型としては扱われない
もし`true`と`false`以外の値をboolean型の変数に代入したい場合は、次のコードのように`Boolean()`や`!!`を使うなどして`true`か`false`に変換する必要があります。
```
const id = "";
const hasId1: boolean = Boolean(id);
const hasId2: boolean = !!id;
```
### 配列型
#### 書き方① 型名[]
`const list: number[] = [1, 2, 3];`
#### 書き方② Array<型名>
`const list: Array<number> = [1, 2, 3];`