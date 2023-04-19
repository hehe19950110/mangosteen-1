export class Time {
  date: Date;
  constructor(date?: string | Date) {
    if (date === undefined) {
      this.date = new Date();
    } else if (typeof date === "string") {
      this.date = new Date(date); // new Date 可以接受字符串
    } else {
      this.date = date;
    }
  }

  format(pattern = "YYYY-MM-DD") {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    const hour = this.date.getHours();
    const minute = this.date.getMinutes();
    const second = this.date.getSeconds();
    const msecond = this.date.getMilliseconds();
    return pattern
      .replace(/YYYY/g, year.toString())
      .replace(/MM/, month.toString().padStart(2, "0"))
      .replace(/DD/, day.toString().padStart(2, "0"))
      .replace(/HH/, hour.toString().padStart(2, "0"))
      .replace(/mm/, minute.toString().padStart(2, "0"))
      .replace(/ss/, second.toString().padStart(2, "0"))
      .replace(/SSS/, msecond.toString().padStart(3, "0"));
  }
  firstDayOfMonth() {
    return new Time( //创建一个新的时间，新的时间用new Date（）来构造
      new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0) //获取到当前日期的年月日
    );
  }
  firstDayOfYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0));
  }
  lastDayOfMonth() {
    return new Time(
      new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0) // 月份＋1，日期变成0
    );
  }
  lastDayOfYear() {
    return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0)); // 年份＋1，日期变成0
  }
  getRaw() {
    return this.date;
  }
  add(
    amount: number,
    unit:
      | "year"
      | "month"
      | "day"
      | "hour"
      | "minute"
      | "second"
      | "millisecond"
  ) {
    // return new Time 但是不改变 this.date
    let date = new Date(this.date.getTime());
    switch (unit) {
      case "year":
        date.setFullYear(date.getFullYear() + amount);
        break;

      case "month": // 需要考虑闰年闰月的情况
        const d = date.getDate(); //假设日期是 1.31
        date.setDate(1); // 将日期设成1号，即1.31 变成 1.1
        date.setMonth(date.getMonth() + amount); // 月份＋1，即 2.1
        const d2 = new Date( // 需要知道1月的最后一天是几号，然后 ＋1月后 得到2.28 或者 2.29
          date.getFullYear(),
          date.getMonth() + 1,
          0,
          0,
          0,
          0
        ).getDate();
        date.setDate(Math.min(d, d2)); // 需要判断 d 和 d2 哪一个小，用哪一个
        break;

      case "day":
        date.setDate(date.getDate() + amount);
        break;

      case "hour":
        date.setHours(date.getHours() + amount);
        break;

      case "minute":
        date.setMinutes(date.getMinutes() + amount);
        break;

      case "second":
        date.setSeconds(date.getSeconds() + amount);
        break;

      case "millisecond":
        date.setMilliseconds(date.getMilliseconds() + amount);
        break;
      default:
        throw new Error("Time.add: unknown unit");
    }
    return new Time(date);
  }
}

/* 
可以直接引用 dayjs 库：
npm install dayjs --save

dayjs('2018-08-08') // parse
dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // display
dayjs().set('month', 3).month() // get & set
dayjs().add(1, 'year') // manipulate
dayjs().isBefore(dayjs()) // query
*/
