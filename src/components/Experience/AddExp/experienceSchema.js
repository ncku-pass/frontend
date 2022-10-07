import { defineAsyncComponent } from 'vue'
import { helpers, required } from '@vuelidate/validators'

const generateSemesters = () => {
  const year = new Date().getFullYear() - 1911
  return [...Array(5).keys()]
    .map((_, i) => [`${year - i}-2`, `${year - i}-1`])
    .flat()
    .map(sem => { return { key: sem, label: sem } })
}

const requiredValidatorWithCustomMsg = {
  required: helpers.withMessage('請輸入Value', required)
}

export const course = [
  {
    inputKey: 'name',
    label: '課程名稱',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: 'position',
    label: '課程分數',
    type: 'FormInputNumber',
    defaultValue: '',
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
            <div>
              <span>歷年選課成績資料查詢：</span>
              <a href='https://qrys.ncku.edu.tw/ncku/qrys05.asp' target='_blank'>https://qrys.ncku.edu.tw/ncku/qrys05.asp</a>
            </div>
          )
        },
      })
    }))
  },
  {
    inputKey: 'semester',
    label: '課程時間',
    type: 'FormSelect',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
    options: generateSemesters()
  },
  {
    inputKey: 'categories',
    label: '課程類別',
    type: 'FormMultiSelect',
    defaultValue: [],
    validations: null,
    required: false,
    options: ['必修課程', '選修課程', '通識', '工作坊', '密集課程', '線上課程']
  },
  {
    inputKey: 'tags',
    label: '獲得技能Tag',
    type: 'FormSelectTag',
    defaultValue: [],
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
           <div className='tags'>
              <div className='title'>創建Tag</div>
              <p>輸入完畢後按下<code className='inline-code'>Enter</code>新增</p>
              <div className='title'>搜尋Tag</div>
              <p>直接輸入要搜尋的Tag名稱</p>
            </div>
          )
        },
      })
    }))
  },
  {
    inputKey: 'description',
    label: '課程簡介 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '填寫課程簡介以便日後方便回想課程內容'
  },
  {
    inputKey: 'feedback',
    label: '課程收穫及成就 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '將課程中所得到的收穫及成就記錄下來，或是寫出課程內容的特色吧'
  },
  {
    inputKey: 'link',
    label: '作品和相關證明',
    type: 'FormInputText',
    defaultValue: '',
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
            <div>
              <p>可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！</p>
              <p>若有多個連結，使用<code className='inline-code'>,</code>將連結隔開</p>
            </div>
          )
        },
      })
    }))
  }
]

export const activity = [
  {
    inputKey: 'name',
    label: '活動名稱',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: 'position',
    label: '活動擔任職位',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: ['dateStart', 'dateEnd'],
    label: '活動時間',
    type: 'FormTimeRange',
    defaultValue: null,
    validations: [requiredValidatorWithCustomMsg, null],
    required: true,
  },
  {
    inputKey: 'categories',
    label: '活動類別',
    type: 'FormMultiSelect',
    defaultValue: [],
    validations: null,
    required: false,
    options: ['社團', '系內活動', '校內活動', '校外活動', '其他']
  },
  {
    inputKey: 'tags',
    label: '獲得技能Tag',
    type: 'FormSelectTag',
    defaultValue: [],
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
           <div className='tags'>
              <div className='title'>創建Tag</div>
              <p>輸入完畢後按下<code className='inline-code'>Enter</code>新增</p>
              <div className='title'>搜尋Tag</div>
              <p>直接輸入要搜尋的Tag名稱</p>
            </div>
          )
        }
      })
    }))
  },
  {
    inputKey: 'description',
    label: '活動簡介 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '填寫活動簡介以便日後方便回想活動內容'
  },
  {
    inputKey: 'feedback',
    label: '活動收穫及成就 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '將活動中所得到的收穫及成就記錄下來吧～若有辦理相關活動也可紀錄下來唷'
  },
  {
    inputKey: 'link',
    label: '作品和相關證明',
    type: 'FormInputText',
    defaultValue: '',
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
            <div>
              <p>可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！</p>
              <p>若有多個連結，使用<code className='inline-code'>,</code>將連結隔開</p>
            </div>
          )
        }
      })
    }))
  }
]

export const competition = [
  {
    inputKey: 'name',
    label: '競賽名稱',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
    placeholder: '可以填入競賽名稱、組別、獲獎類別（國內/國外）、類型（個人/團體）'
  },
  {
    inputKey: 'position',
    label: '競賽獲得獎項',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: ['dateStart', 'dateEnd'],
    label: '競賽時間',
    type: 'FormTimeRange',
    defaultValue: null,
    validations: [requiredValidatorWithCustomMsg, null],
    required: true,
  },
  {
    inputKey: 'tags',
    label: '獲得技能Tag',
    type: 'FormSelectTag',
    defaultValue: [],
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
           <div className='tags'>
              <div className='title'>創建Tag</div>
              <p>輸入完畢後按下<code className='inline-code'>Enter</code>新增</p>
              <div className='title'>搜尋Tag</div>
              <p>直接輸入要搜尋的Tag名稱</p>
            </div>
          )
        }
      })
    }))
  },
  {
    inputKey: 'description',
    label: '競賽簡介 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '填寫競賽簡介以便日後方便回想競賽內容'
  },
  {
    inputKey: 'feedback',
    label: '競賽收穫及成就 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '將競賽中所得到的收穫及成就記錄下來吧~'
  },
  {
    inputKey: 'link',
    label: '作品和相關證明',
    type: 'FormInputText',
    defaultValue: '',
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
            <div>
              <p>可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！</p>
              <p>若有多個連結，使用<code className='inline-code'>,</code>將連結隔開</p>
            </div>
          )
        }
      })
    }))
  }
]

export const work = [
  {
    inputKey: 'name',
    label: '公司單位名稱',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: 'position',
    label: '職位',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: ['dateStart', 'dateEnd'],
    label: '實習 / 工作時間',
    type: 'FormTimeRange',
    defaultValue: null,
    validations: [requiredValidatorWithCustomMsg, null],
    required: true,
  },
  {
    inputKey: 'tags',
    label: '獲得技能Tag',
    type: 'FormSelectTag',
    defaultValue: [],
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
           <div className='tags'>
              <div className='title'>創建Tag</div>
              <p>輸入完畢後按下<code className='inline-code'>Enter</code>新增</p>
              <div className='title'>搜尋Tag</div>
              <p>直接輸入要搜尋的Tag名稱</p>
            </div>
          )
        }
      })
    }))
  },
  {
    inputKey: 'description',
    label: '實習 / 工作內容 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '填寫以便日後方便回想實習 / 工作內容'
  },
  {
    inputKey: 'feedback',
    label: '收穫及成就 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '將實習 / 工作中所得到的收穫及成就記錄下來吧~'
  },
  {
    inputKey: 'link',
    label: '相關證明',
    type: 'FormInputText',
    defaultValue: '',
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
            <div>
              <p>可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！</p>
              <p>若有多個連結，使用<code className='inline-code'>,</code>將連結隔開</p>
            </div>
          )
        }
      })
    }))
  }
]

export const certificate = [
  {
    inputKey: 'name',
    label: '證照/檢定名稱',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: 'position',
    label: '證照分數或等級',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: ['dateStart', 'dateEnd'],
    label: '考取時間',
    type: 'FormTimeRange',
    defaultValue: null,
    validations: [requiredValidatorWithCustomMsg, null],
    required: true,
  },
  {
    inputKey: 'tags',
    label: '獲得技能Tag',
    type: 'FormSelectTag',
    defaultValue: [],
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
           <div className='tags'>
              <div className='title'>創建Tag</div>
              <p>輸入完畢後按下<code className='inline-code'>Enter</code>新增</p>
              <div className='title'>搜尋Tag</div>
              <p>直接輸入要搜尋的Tag名稱</p>
            </div>
          )
        },
      })
    }))
  },
  {
    inputKey: 'feedback',
    label: '收穫及成就 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '將過程中所得到的收穫及成就記錄下來吧~'
  },
  {
    inputKey: 'link',
    label: '相關證明',
    type: 'FormInputText',
    defaultValue: '',
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
            <div>
              <p>可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！</p>
              <p>若有多個連結，使用<code className='inline-code'>,</code>將連結隔開</p>
            </div>
          )
        },
      })
    }))
  }
]

export const other = [
  {
    inputKey: 'name',
    label: '經歷名稱',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: 'position',
    label: '經歷職位、成就',
    type: 'FormInputText',
    defaultValue: '',
    validations: requiredValidatorWithCustomMsg,
    required: true,
  },
  {
    inputKey: ['dateStart', 'dateEnd'],
    label: '時間',
    type: 'FormTimeRange',
    defaultValue: null,
    validations: [requiredValidatorWithCustomMsg, null],
    required: true,
  },
  {
    inputKey: 'tags',
    label: '獲得技能Tag',
    type: 'FormSelectTag',
    defaultValue: [],
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
           <div className='tags'>
              <div className='title'>創建Tag</div>
              <p>輸入完畢後按下<code className='inline-code'>Enter</code>新增</p>
              <div className='title'>搜尋Tag</div>
              <p>直接輸入要搜尋的Tag名稱</p>
            </div>
          )
        },
      })
    }))
  },
  {
    inputKey: 'description',
    label: '經歷簡介 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '填寫簡介以便日後方便回想經歷內容'
  },
  {
    inputKey: 'feedback',
    label: '經歷收穫及成就 (500字以內)',
    type: 'FormTextArea',
    defaultValue: '',
    validations: null,
    required: false,
    placeholder: '將過程中所得到的收穫及成就記錄下來吧~'
  },
  {
    inputKey: 'link',
    label: '其他連結',
    type: 'FormInputText',
    defaultValue: '',
    validations: null,
    required: false,
    remarks: defineAsyncComponent(() => new Promise((resolve) => {
      resolve({
        render() {
          return (
            <div>
              <p>可以將更多相關資訊（ex.照片、PPT等等）統整到自己的連結裡頭喔！</p>
              <p>若有多個連結，使用<code className='inline-code'>,</code>將連結隔開</p>
            </div>
          )
        },
      })
    }))
  }
]
