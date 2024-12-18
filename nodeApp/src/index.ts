const printLine = (text: string, breakLine: boolean = true) => {
  process.stdout.write(text + (breakLine ? '\n' : ''))
}

const promptInput = async (text: string) => {
  printLine(`\n${text}\n> `, false);
  const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())));
  return input.trim();
}

class HitAndBlow {
  private readonly answerSource = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
  private answer: string[] = []
  private tryCount = 0
  private mode: 'normal' | 'hard'
  
  constructor(mode: 'normal' | 'hard') {
    this.mode = mode
  }
  
  settting() {
    const answerLength = this.getAnserLength()
    
    while (this.answer.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length)
      const selectedItem = this.answerSource[randNum]
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem)
      }
    }
  }
  
  async play() {
    const answerLength = this.getAnserLength()
    const inputArr = (await promptInput(`「,」区切りで${answerLength}つの数字を入力してください`)).split(',')
    const result = this.check(inputArr)
    
    if (!this.validate(inputArr)) {
      printLine('無効な入力です。')
      await this.play()
      return
    }
    
    if (result.hit !== this.answer.length) {
      // 不正解だったら続ける
      printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`)
      this.tryCount += 1
      await this.play()
    } else {
      // 正解だったら終了
      this.tryCount += 1
    }
  }
  
  private check(input: string[]) {
    let hitCount = 0
    let blowCount = 0
    
    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1
        
      } else if (this.answer.includes(val)) {
        blowCount += 1
      }
    })
    
    return {
      hit: hitCount,
      blow: blowCount,
    }
  }
  
  end() {
    printLine(`正解です！\n試行回数: ${this.tryCount}回`)
    process.exit()
  }
  
  private validate(inputArr: string[]) {
    const isLengthValid = inputArr.length === this.answer.length
    const isAllAnswerSourceOption = inputArr.every((val) => this.answerSource.includes(val))
    const isAllDirrerentValues = inputArr.every((val, i) => inputArr.indexOf(val) === i)
    return isLengthValid && isAllAnswerSourceOption && isAllDirrerentValues
  }
  
  private getAnserLength() {
    switch (this.mode) {
      case 'normal':
        return 3
      case 'hard':
        return 4
    }
  }
}

(async () => {
  const hitAndBlow = new HitAndBlow('hard')
  hitAndBlow.settting()
  await hitAndBlow.play()
  hitAndBlow.end()
}
)()