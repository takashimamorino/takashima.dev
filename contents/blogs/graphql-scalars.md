---
title: GraphQL Scalars を使う
published: 2021-12-31
tags:
  - GraphQL
---

## スカラ型

スカラ型とは、いくつかの種類がある GraphQL の型において最もプリミティブな値を表すものである。
組み込みスカラとカスタムスカラがある。

### 組み込みスカラ

以下の 5 種類の組み込みスカラが用意されている

- Int
- Float
- String
- Boolean
- ID

### カスタムスカラ

`scalar` キーワードを使うことで 独自のスカラ型を使用することができる。
どうシリアライズされるかやパースされるかは実装による。

## GraphQL Scalars とは

[Urigo/graphql-scalars](https://github.com/Urigo/graphql-scalars)

カスタムスカラを提供してくれているパッケージ

## 実装

[ドキュメント](https://www.graphql-scalars.dev/docs/quick-start) を参考

### リゾルバー

```typescript
// resolvers.ts

import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as scalarResolvers } from 'graphql-scalars';

export const resolvers = mergeResolvers([
  scalarResolvers,
  // ...
]);
```

### スキーマ

```typescript
// schemas.ts

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as scalarsTypeDefs } from 'graphql-scalars';
import path from 'path';

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));
const types = [scalarsTypeDefs, typesArray];

export const typeDefs = mergeTypeDefs(types);
```

使用したい graphql-scalars のカスタムスカラを定義

```graphql
# schema.graphql

scalar EmailAddress
scalar DateTime
scalar URL
```

## 結果

適切にバリデーションされるようになる

```graphql
# schemas.graphql

type User {
  id: ID!
  name: String!
  email: EmailAddress!
  birthDate: DateTime!
  homePage: URL
}

type Query {
  users(url: URL!): [User]!
}
```

### email フィールドに適切な値で返ってこなかった場合

```json
{
  "errors": [
    {
      "message": "Value is not a valid email address: foo",
      "locations": [
        {
          "line": 5,
          "column": 5
        }
      ],
      "path": [
        "users",
        0,
        "email"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",

```

### query などの引数に適切な値をとらなかった場合

```json
{
  "errors": [
    {
      "message": "Variable \"$url\" got invalid value \"bar\"; Expected type \"URL\". Invalid URL",
      "locations": [
        {
          "line": 1,
          "column": 13
        }
      ],
      "extensions": {
        "code": "BAD_USER_INPUT",
        "exception": {
          "stacktrace": [
            "TypeError: Invalid URL",

```

## GraphQL Code Generator を使う時の Tips

そのまま型生成をしてしまうと any になってしまうので適切な型定義をする

```typescript
// schemas.ts

// ・・・
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  EmailAddress: any;
  URL: any;
};
// ・・・
```

any になるのを防ぐために設定の追加

`defaultScalarType` を任意の型にすると、 any の代わりに設定した型になる

`scalars` を設定すると、指定した型で上書きすることができる

```yml
# codegen.yml

config:
  minify: true
  defaultScalarType: unknown
  scalars:
    EmailAddress: string
```

```typescript
// schemas.ts

// ・・・
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: unknown;
  EmailAddress: string;
  URL: unknown;
};
// ・・・
```

## 参考

- [The GraphQL specification](https://spec.graphql.org/draft)
- [Urigo/graphql-scalars](https://github.com/Urigo/graphql-scalars)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/plugins/typescript)
