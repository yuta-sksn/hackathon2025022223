export const useReviewDetailsOptions = () => {
  // 出席
  const attendanceOptions = [
    {
      value: 10,
      text: '任意',
    },
    {
      value: 20,
      text: '確認する',
    },
    {
      value: 30,
      text: '必須',
    },
  ]

  // 課題
  const assignmentOptions = [
    {
      value: 10,
      text: '少ない',
    },
    {
      value: 20,
      text: '普通',
    },
    {
      value: 30,
      text: '多い',
    },
  ]

  // 単位
  const difficultyOptions = [
    {
      value: 10,
      text: '取得しにくい',
    },
    {
      value: 20,
      text: '普通',
    },
    {
      value: 30,
      text: '取得しやすい',
    },
  ]

  return {
    attendanceOptions,
    assignmentOptions,
    difficultyOptions,
  }
} 