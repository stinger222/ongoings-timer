import { Week, formatTimeDuration } from "../dateTimeUtils"

describe("Testing 'formatTimeDuration' function", () => {
  it("Should format positive duration", () => {
    expect(formatTimeDuration(23456)).toBe("00:06:30:56")
    expect(formatTimeDuration(345678)).toBe("04:00:01:18")
  })

  it("Should format negative duration", () => {
    expect(formatTimeDuration(-12345)).toBe("-03:25:45")
    expect(formatTimeDuration(-987654)).toBe("-10:20:54")
  })

  it("Should format zero duration", () => {
    expect(formatTimeDuration(0)).toBe("00:00:00:00")
  })

  it("Should format floating point duration (rounded up)", () => {
    expect(formatTimeDuration(1234.5678)).toBe("00:00:20:35")
  })

  it("Should format floating point negative duration (rounded up)", () => {
    expect(formatTimeDuration(-987.654)).toBe("-00:16:28")
  })

  it("Should format large positive duration", () => {
    expect(formatTimeDuration(98765432)).toBe("1143:02:50:32")
    expect(formatTimeDuration(9847286727844)).toBe("113973226:00:24:04")
  })

  it("Should format large negative duration", () => {
    expect(formatTimeDuration(-987654321)).toBe("-04:25:21")
  })
})

describe("Testing Week class", () => {
  describe("Testing '.getIdByDay()' method", () => {
    it("Should return the correct ID for a valid day abbreviation", () => {
      expect(Week.getIdByDay("вт")).toBe(2)
      expect(Week.getIdByDay("ср")).toBe(3)
    })
  
    it("Should return -1 for an invalid day abbreviation", () => {
      expect(Week.getIdByDay("xyz")).toBe(-1)
    })
  
    it("Should be case-insensitive", () => {
      expect(Week.getIdByDay("Пн")).toBe(1)
    })
  
    it("Should return -1 for false-ish(?) input", () => {
      expect(Week.getIdByDay("")).toBe(-1)
      expect(Week.getIdByDay(null)).toBe(-1)
      expect(Week.getIdByDay(undefined)).toBe(-1)
    })
  
    it("Should return the correct IDs for all days", () => {
      Week.daysAbbr.forEach((day, index) => {
        expect(Week.getIdByDay(day)).toBe(index)
      })
    })
  })

  describe("Testing '.getIdByCardName()' method", () => {
    it("Should return the correct ID for a valid card name", () => {
      expect(Week.getIdByCardName("Some Card Name - Пн 10:00")).toBe(1)
      expect(Week.getIdByCardName("Some Card Name - Ср 12:00")).toBe(3)
      expect(Week.getIdByCardName("Some Card Name - Сб 15:00")).toBe(6)
    })
  
    it("Should return -1 for an invalid day abbreviation", () => {
      expect(Week.getIdByCardName("Some Card Name - xyz 10:00")).toBe(-1)
      expect(Week.getIdByCardName("invalid")).toBe(-1)
    })
  
    it("Should be case-insensitive", () => {
      expect(Week.getIdByCardName("Some Card Name - ВС 10:00")).toBe(0)
      expect(Week.getIdByCardName("Some Card Name - ЧТ 10:00")).toBe(4)
      expect(Week.getIdByCardName("Some Card Name - ПТ 10:00")).toBe(5)
    })
  
    it("Should return -1 for false-ish input", () => {
      expect(Week.getIdByCardName("")).toBe(-1)
      expect(Week.getIdByCardName(null)).toBe(-1)
      expect(Week.getIdByCardName(undefined)).toBe(-1)
    })
  })
})