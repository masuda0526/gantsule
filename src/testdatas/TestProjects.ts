import type Project from "../interface/Project";

export const projects: Project[] = [
  {
    name: "ECサイト開発",
    startDt: "2025-01-10",
    endDt: "2025-06-30",
    client: "株式会社スカイリンク",
    subjects: [
      {
        name: "フロントエンド開発",
        startDt: "2025-01-10",
        endDt: "2025-04-15",
        status: "完了",
        leader: "佐藤",
        tasks: [
          { subjectId: "1", name: "デザイン実装", startDt: "2025-01-10", endDt: "2025-02-10", status: "完了", manager: "田中" },
          { subjectId: "1", name: "API連携", startDt: "2025-02-15", endDt: "2025-03-30", status: "完了", manager: "山田" },
          { subjectId: "1", name: "テスト", startDt: "2025-04-01", endDt: "2025-04-15", status: "完了", manager: "佐藤" },
        ]
      },
      {
        name: "バックエンド開発",
        startDt: "2025-02-01",
        endDt: "2025-06-30",
        status: "進行中",
        leader: "鈴木",
        tasks: [
          { subjectId: "2", name: "API設計", startDt: "2025-02-01", endDt: "2025-02-28", status: "完了", manager: "鈴木" },
          { subjectId: "2", name: "DB設計", startDt: "2025-03-01", endDt: "2025-03-20", status: "完了", manager: "中村" },
          { subjectId: "2", name: "テスト実装", startDt: "2025-05-01", endDt: "2025-06-30", status: "進行中", manager: "鈴木" },
        ]
      }
    ]
  },
  {
    name: "業務管理システム刷新",
    startDt: "2024-09-01",
    endDt: "2025-03-31",
    client: "株式会社デルタソフト",
    subjects: [
      {
        name: "要件定義",
        startDt: "2024-09-01",
        endDt: "2024-10-15",
        status: "完了",
        leader: "小林",
        tasks: [
          { subjectId: "3", name: "現行調査", startDt: "2024-09-01", endDt: "2024-09-20", status: "完了", manager: "斎藤" },
          { subjectId: "3", name: "ヒアリング", startDt: "2024-09-21", endDt: "2024-10-15", status: "完了", manager: "小林" }
        ]
      },
      {
        name: "開発フェーズ",
        startDt: "2024-11-01",
        endDt: "2025-03-31",
        status: "進行中",
        leader: "小林",
        tasks: [
          { subjectId: "4", name: "設計", startDt: "2024-11-01", endDt: "2024-12-10", status: "完了", manager: "森" },
          { subjectId: "4", name: "実装", startDt: "2024-12-11", endDt: "2025-03-10", status: "進行中", manager: "田村" }
        ]
      }
    ]
  },
  {
    name: "モバイルアプリ開発",
    startDt: "2025-03-01",
    endDt: "2025-08-15",
    client: "有限会社エアリンク",
    subjects: [
      {
        name: "UI/UX設計",
        startDt: "2025-03-01",
        endDt: "2025-03-20",
        status: "完了",
        leader: "加藤",
        tasks: [
          { subjectId: "5", name: "画面フロー設計", startDt: "2025-03-01", endDt: "2025-03-10", status: "完了", manager: "木村" },
          { subjectId: "5", name: "デザインレビュー", startDt: "2025-03-11", endDt: "2025-03-20", status: "完了", manager: "加藤" }
        ]
      },
      {
        name: "Flutter実装",
        startDt: "2025-04-01",
        endDt: "2025-08-15",
        status: "進行中",
        leader: "田辺",
        tasks: [
          { subjectId: "6", name: "API結合", startDt: "2025-05-01", endDt: "2025-06-30", status: "進行中", manager: "田辺" }
        ]
      }
    ]
  },
  {
    name: "AIチャットボット導入",
    startDt: "2025-02-10",
    endDt: "2025-05-30",
    client: "株式会社ネオリンクス",
    subjects: [
      {
        name: "設計・開発",
        startDt: "2025-02-10",
        endDt: "2025-04-30",
        status: "完了",
        leader: "藤本",
        tasks: [
          { subjectId: "7", name: "対話フロー設計", startDt: "2025-02-10", endDt: "2025-03-01", status: "完了", manager: "藤本" },
          { subjectId: "7", name: "テスト導入", startDt: "2025-04-10", endDt: "2025-04-30", status: "完了", manager: "吉田" }
        ]
      },
      {
        name: "運用支援",
        startDt: "2025-05-01",
        endDt: "2025-05-30",
        status: "進行中",
        leader: "藤本",
        tasks: [
          { subjectId: "8", name: "初期FAQ登録", startDt: "2025-05-01", endDt: "2025-05-15", status: "完了", manager: "吉田" },
          { subjectId: "8", name: "効果測定", startDt: "2025-05-16", endDt: "2025-05-30", status: "進行中", manager: "藤本" }
        ]
      }
    ]
  },
  {
    name: "社内ポータルリニューアル",
    startDt: "2025-04-01",
    endDt: "2025-10-31",
    client: "自社",
    subjects: [
      {
        name: "要件整理",
        startDt: "2025-04-01",
        endDt: "2025-04-30",
        status: "完了",
        leader: "山本",
        tasks: [
          { subjectId: "9", name: "ヒアリング", startDt: "2025-04-01", endDt: "2025-04-10", status: "完了", manager: "佐々木" },
          { subjectId: "9", name: "仕様決定", startDt: "2025-04-11", endDt: "2025-04-30", status: "完了", manager: "山本" }
        ]
      },
      {
        name: "開発",
        startDt: "2025-05-01",
        endDt: "2025-10-31",
        status: "進行中",
        leader: "山本",
        tasks: [
          { subjectId: "10", name: "コンテンツ移行", startDt: "2025-07-01", endDt: "2025-09-30", status: "進行中", manager: "高橋" }
        ]
      }
    ]
  },
  {
    name: "IoTデバイス管理システム",
    startDt: "2025-06-01",
    endDt: "2026-01-31",
    client: "株式会社テックウェーブ",
    subjects: [
      {
        name: "PoC開発",
        startDt: "2025-06-01",
        endDt: "2025-07-31",
        status: "完了",
        leader: "長谷川",
        tasks: [
          { subjectId: "11", name: "デバイス接続試験", startDt: "2025-06-10", endDt: "2025-07-10", status: "完了", manager: "岡田" }
        ]
      },
      {
        name: "本番構築",
        startDt: "2025-08-01",
        endDt: "2026-01-31",
        status: "未着手",
        leader: "長谷川",
        tasks: []
      }
    ]
  },
  {
    name: "クラウド移行プロジェクト",
    startDt: "2025-05-10",
    endDt: "2025-12-20",
    client: "株式会社アルファテック",
    subjects: [
      {
        name: "インフラ構築",
        startDt: "2025-05-10",
        endDt: "2025-08-10",
        status: "進行中",
        leader: "西村",
        tasks: [
          { subjectId: "12", name: "AWS環境構築", startDt: "2025-05-10", endDt: "2025-06-30", status: "完了", manager: "西村" },
          { subjectId: "12", name: "監視設計", startDt: "2025-07-01", endDt: "2025-08-10", status: "進行中", manager: "川上" }
        ]
      }
    ]
  },
  {
    name: "受注管理アプリ開発",
    startDt: "2024-11-01",
    endDt: "2025-04-30",
    client: "株式会社トラスト",
    subjects: [
      {
        name: "バックエンドAPI",
        startDt: "2024-11-01",
        endDt: "2025-02-28",
        status: "完了",
        leader: "井上",
        tasks: [
          { subjectId: "13", name: "GraphQL設計", startDt: "2024-11-01", endDt: "2024-11-30", status: "完了", manager: "井上" },
          { subjectId: "13", name: "テスト", startDt: "2025-02-01", endDt: "2025-02-28", status: "完了", manager: "井上" }
        ]
      }
    ]
  },
  {
    name: "販売分析ダッシュボード",
    startDt: "2025-01-01",
    endDt: "2025-09-30",
    client: "株式会社データリンク",
    subjects: [
      {
        name: "BI設計",
        startDt: "2025-01-01",
        endDt: "2025-03-31",
        status: "完了",
        leader: "田村",
        tasks: [
          { subjectId: "14", name: "データモデル作成", startDt: "2025-01-01", endDt: "2025-02-15", status: "完了", manager: "田村" }
        ]
      },
      {
        name: "可視化構築",
        startDt: "2025-04-01",
        endDt: "2025-09-30",
        status: "進行中",
        leader: "田村",
        tasks: [
          { subjectId: "15", name: "グラフ作成", startDt: "2025-06-01", endDt: "2025-09-30", status: "進行中", manager: "三浦" }
        ]
      }
    ]
  },
  {
    name: "予約システム構築",
    startDt: "2025-02-01",
    endDt: "2025-07-31",
    client: "株式会社アークライン",
    subjects: [
      {
        name: "要件定義",
        startDt: "2025-02-01",
        endDt: "2025-02-28",
        status: "完了",
        leader: "堀",
        tasks: [
          { subjectId: "16", name: "ヒアリング", startDt: "2025-02-01", endDt: "2025-02-10", status: "完了", manager: "堀" }
        ]
      },
      {
        name: "実装",
        startDt: "2025-03-01",
        endDt: "2025-07-31",
        status: "進行中",
        leader: "堀",
        tasks: [
          { subjectId: "17", name: "予約カレンダー作成", startDt: "2025-03-01", endDt: "2025-05-15", status: "進行中", manager: "大野" }
        ]
      }
    ]
  }
];
