function generateCard(type = 'experience', names = []) {
  return names.map(name => {
    return {
      id: 0,
      vForKey: `${Math.random()}`.slice(2, 7),
      name,
      experiences: [],
      text: '',
      type
    }
  })
}

export const templates = [
  {
    name: '升學備審',
    sections: '自我介紹、必修優異課程、特殊經歷、研究計畫、語言證照',
    cards: [
      ...generateCard('text', ['自我介紹']),
      ...generateCard('experience', ['必修優異課程', '特殊經歷', '研究計畫', '語言證照'])
    ]
  }, {
    name: '工作履歷',
    sections: '自我介紹、專長科目、英文教學經驗、語言證照、優異課程',
    cards: [
      ...generateCard('text', ['自我介紹']),
      ...generateCard('experience', ['專長科目', '特殊經歷', '英文教學經驗', '語言證照', '優異課程'])
    ]
  }, {
    name: '個人整理',
    sections: '行銷設計、創意執行能力、簡報力、語言能力證明',
    cards: [
      ...generateCard('text', ['行銷設計']),
      ...generateCard('experience', ['創意執行能力', '簡報力', '語言能力證明'])
    ]
  }, {
    name: '實習履歷',
    sections: '自我介紹、設計軟體、產品規劃及表達、專案執行、課外活動、語言證照',
    cards: [
      ...generateCard('text', ['自我介紹']),
      ...generateCard('experience', ['設計軟體', '產品規劃及表達', '專案執行', '課外活動', '語言證照'])
    ]
  }
]
