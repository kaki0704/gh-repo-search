# GitHubリポジトリ検索

GitHub REST APIを使い、公開リポジトリをキーワード検索するNext.jsアプリケーションです。検索結果の一覧と、各リポジトリの独立した詳細ページを提供します。

## 主な機能

- キーワードとGitHub検索修飾子によるリポジトリ検索
- URLで共有・再表示できる検索条件
- 10件ずつ自動で追加する無限スクロール
- リポジトリ名、オーナーアイコン、言語、Star、Watcher、Fork、Open Issueの表示
- ライト・ダーク表示への対応

## セットアップ

Node.js 24.0.0以上が必要です。

```bash
pnpm install
pnpm dev
```

`http://localhost:3000` を開いてください。

## コマンド

```bash
pnpm dev          # 開発サーバー
pnpm build        # 本番ビルド
pnpm test         # Vitest
pnpm typecheck    # TypeScript
pnpm lint         # Oxlint
pnpm lint:fix     # Oxlintの自動修正
pnpm format       # Oxfmtで整形
pnpm format:check # 整形差分の確認
```

## ディレクトリ構成

小規模なNext.jsプロジェクトとして、ルート、UI、ロジック、スタイルをトップレベルで分けています。

```text
.
├── app/                    # Next.js App Routerとルート固有の状態画面
├── components/             # HeroUIベースの共有UIコンポーネント
├── lib/
│   ├── services/           # リポジトリ検索・詳細取得のユースケース
│   ├── types/              # アプリ内で共有するドメイン型
│   ├── gateways/           # データ取得Port、GitHub API Adapter、生成Factory
│   ├── errors/             # データ取得エラー
│   └── utils/              # 表示整形とURL生成の純粋関数
├── public/images/          # 静的画像
└── styles/globals.css      # グローバルスタイルとTailwindエントリ
```

## 工夫した点

- 検索はクライアント側の一時状態ではなくURLクエリで管理し、戻る操作やリンク共有に対応しました。
- 検索結果を60秒、詳細を300秒revalidateすることでRate Limitを抑えていること。
- アクセシビリティを考慮するためHeroUI v3を使用したこと。

## AI利用レポート

実装支援としてOpenAI Codexを使用。

- Next.js 16、HeroUI v3、GitHub REST API、Oxcを使用するように指示をした。
- アーキテクチャ案、UIコンポーネント、テストコード、READMEの初稿作成
- format、lint、typecheck、test、buildとブラウザ表示による検証・修正
