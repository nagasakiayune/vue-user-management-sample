// 1. 苗字と名前のパーツ定義（各10種類、計100通りの組み合わせ）
const lastNames = [
  { kanji: "佐藤", kana: "サトウ", romaji: "sato" },
  { kanji: "鈴木", kana: "スズキ", romaji: "suzuki" },
  { kanji: "高橋", kana: "タカハシ", romaji: "takahashi" },
  { kanji: "田中", kana: "タナカ", romaji: "tanaka" },
  { kanji: "伊藤", kana: "イトウ", romaji: "ito" },
  { kanji: "渡辺", kana: "ワタナベ", romaji: "watanabe" },
  { kanji: "山本", kana: "ヤマモト", romaji: "yamamoto" },
  { kanji: "中村", kana: "ナカムラ", romaji: "nakamura" },
  { kanji: "小林", kana: "コバヤシ", romaji: "kobayashi" },
  { kanji: "加藤", kana: "カトウ", romaji: "kato" },
];
const firstNames = [
  { kanji: "太郎", kana: "タロウ", romaji: "taro" },
  { kanji: "花子", kana: "ハナコ", romaji: "hanako" },
  { kanji: "健", kana: "ケン", romaji: "ken" },
  { kanji: "美咲", kana: "ミサキ", romaji: "misaki" },
  { kanji: "翔", kana: "ショウ", romaji: "sho" },
  { kanji: "愛", kana: "アイ", romaji: "ai" },
  { kanji: "蓮", kana: "レン", romaji: "ren" },
  { kanji: "優奈", kana: "ユウナ", romaji: "yuna" },
  { kanji: "誠", kana: "マコト", romaji: "makoto" },
  { kanji: "彩", kana: "アヤ", romaji: "aya" },
];

// 2. 全100通りの氏名と部署・ステータスの組み合わせを生成
const baseData = [];
let deptCounter = 0;

lastNames.forEach((ln) => {
  firstNames.forEach((fn) => {
    // 部署(1-4)とisActiveの割り当て用
    // 0-24: Dept1, 25-49: Dept2... のように一旦作成
    const deptIdx = Math.floor(deptCounter / 25);
    const isWithinDeptCount = deptCounter % 25;

    baseData.push({
      ln,
      fn,
      department: String(deptIdx + 1),
      isActive: isWithinDeptCount < 20, // 各部署20名がActive
      retireDate: isWithinDeptCount < 20 ? null : "20240331",
    });
    deptCounter++;
  });
});

// 3. 氏名・部署・ステータスのセットをランダムにシャッフル
for (let i = baseData.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [baseData[i], baseData[j]] = [baseData[j], baseData[i]];
}

// 4. シャッフルされたデータに対し、昇順のUserIdを付与してエクスポート
export const usersMock = baseData.map((item, index) => {
  const idNum = index + 1;
  const userId = `U${String(idNum).padStart(4, "0")}`;

  return {
    userId: userId,
    lastName: item.ln.kanji,
    firstName: item.fn.kanji,
    lastNameKana: item.ln.kana,
    firstNameKana: item.fn.kana,
    email: `${item.ln.romaji}.${item.fn.romaji}@example.com`,
    department: item.department,
    joinDate: `2018${String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      "0",
    )}10`,
    isActive: item.isActive,
    retireDate: item.retireDate,
  };
});

console.log("総件数", usersMock.length);

// 部署別件数
const deptSummary = {};

usersMock.forEach((user) => {
  const dept = user.department;

  if (!deptSummary[dept]) {
    deptSummary[dept] = {
      total: 0,
      active: 0,
      retired: 0,
    };
  }

  deptSummary[dept].total++;

  if (user.isActive) {
    deptSummary[dept].active++;
  } else {
    deptSummary[dept].retired++;
  }
});

console.log("部署集計", deptSummary);

// userId重複確認
const ids = usersMock.map((u) => u.userId);
const uniqueIds = new Set(ids);

console.log("userId重複なし", ids.length === uniqueIds.size);

// 氏名重複確認
const names = usersMock.map((u) => `${u.lastName}${u.firstName}`);
const uniqueNames = new Set(names);

console.log("氏名重複なし", names.length === uniqueNames.size);
