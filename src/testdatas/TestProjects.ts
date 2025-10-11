import type Project from "../interface/Project";

export const testProjects: Project[] = [
  {
    projectId: "P001",
    name: "社内システムリプレイス",
    startDt: "2025-01-10",
    endDt: "2025-05-30",
    client: "株式会社ABC",
    subjects: [
      {
        subjectId: "S001",
        name: "要件定義",
        startDt: "2025-01-10",
        endDt: "2025-02-05",
        status: "40",
        leader: "田中",
        tasks: [
          { taskId: "T001", subjectId: "S001", name: "ヒアリング", startDt: "2025-01-10", endDt: "2025-01-20", status: "40", manager: "佐藤" },
          { taskId: "T002", subjectId: "S001", name: "要件書作成", startDt: "2025-01-21", endDt: "2025-02-05", status: "40", manager: "田中" }
        ]
      },
      {
        subjectId: "S002",
        name: "設計",
        startDt: "2025-02-06",
        endDt: "2025-03-15",
        status: "10",
        leader: "鈴木",
        tasks: [
          { taskId: "T003", subjectId: "S002", name: "DB設計", startDt: "2025-02-06", endDt: "2025-02-20", status: "10", manager: "高橋" },
          { taskId: "T004", subjectId: "S002", name: "画面設計", startDt: "2025-02-21", endDt: "2025-03-15", status: "00", manager: "加藤" }
        ]
      }
    ]
  },
  {
    projectId: "P002",
    name: "ECサイト構築",
    startDt: "2025-02-01",
    endDt: "2025-07-30",
    client: "オンラインストア合同会社",
    subjects: [
      {
        subjectId: "S003",
        name: "バックエンドAPI開発",
        startDt: "2025-02-10",
        endDt: "2025-05-10",
        status: "30",
        leader: "中村",
        tasks: [
          { taskId: "T005", subjectId: "S003", name: "認証機能", startDt: "2025-02-10", endDt: "2025-03-10", status: "30", manager: "吉田" },
          { taskId: "T006", subjectId: "S003", name: "商品API", startDt: "2025-03-15", endDt: "2025-05-10", status: "10", manager: "中村" }
        ]
      },
      {
        subjectId: "S004",
        name: "テスト",
        startDt: "2025-06-01",
        endDt: "2025-07-10",
        status: "00",
        leader: "石田",
        tasks: [
          { taskId: "T007", subjectId: "S004", name: "単体テスト", startDt: "2025-06-01", endDt: "2025-06-20", status: "00", manager: "田辺" },
          { taskId: "T008", subjectId: "S004", name: "総合テスト", startDt: "2025-06-21", endDt: "2025-07-10", status: "00", manager: "石田" }
        ]
      }
    ]
  },
  {
    projectId: "P003",
    name: "会計システム改善",
    startDt: "2025-03-01",
    endDt: "2025-09-01",
    client: "経理支援株式会社",
    subjects: [
      {
        subjectId: "S005",
        name: "既存調査",
        startDt: "2025-03-01",
        endDt: "2025-03-20",
        status: "40",
        leader: "木村",
        tasks: [
          { taskId: "T009", subjectId: "S005", name: "現行フロー分析", startDt: "2025-03-01", endDt: "2025-03-10", status: "40", manager: "佐藤" },
          { taskId: "T010", subjectId: "S005", name: "課題洗い出し", startDt: "2025-03-11", endDt: "2025-03-20", status: "40", manager: "木村" }
        ]
      },
      {
        subjectId: "S006",
        name: "改善提案",
        startDt: "2025-03-21",
        endDt: "2025-04-10",
        status: "20",
        leader: "山本",
        tasks: [
          { taskId: "T011", subjectId: "S006", name: "新ワークフロー案作成", startDt: "2025-03-21", endDt: "2025-03-30", status: "20", manager: "山本" },
          { taskId: "T012", subjectId: "S006", name: "承認フロー設計", startDt: "2025-03-31", endDt: "2025-04-10", status: "20", manager: "伊藤" }
        ]
      }
    ]
  },
  {
    projectId: "P004",
    name: "顧客管理アプリ刷新",
    startDt: "2025-01-05",
    endDt: "2025-04-15",
    client: "CRMソリューションズ",
    subjects: [
      {
        subjectId: "S007",
        name: "UIデザイン",
        startDt: "2025-01-05",
        endDt: "2025-02-10",
        status: "40",
        leader: "近藤",
        tasks: [
          { taskId: "T013", subjectId: "S007", name: "トップ画面デザイン", startDt: "2025-01-05", endDt: "2025-01-20", status: "40", manager: "佐々木" },
          { taskId: "T014", subjectId: "S007", name: "詳細画面デザイン", startDt: "2025-01-21", endDt: "2025-02-10", status: "40", manager: "近藤" }
        ]
      },
      {
        subjectId: "S008",
        name: "実装",
        startDt: "2025-02-11",
        endDt: "2025-04-15",
        status: "10",
        leader: "大谷",
        tasks: [
          { taskId: "T015", subjectId: "S008", name: "API連携", startDt: "2025-02-11", endDt: "2025-03-10", status: "10", manager: "岡田" },
          { taskId: "T016", subjectId: "S008", name: "状態管理実装", startDt: "2025-03-11", endDt: "2025-04-15", status: "00", manager: "大谷" }
        ]
      }
    ]
  }
];