import { checkCardSuitability } from "../stringUtils"

describe("Testing 'checkCardSuitability' function", () => {

  it("Tests 'time' part of the card name", () => {
    // Valid
    expect(checkCardSuitability("Whatever - Пн 00:00")).toBe(true)
    expect(checkCardSuitability("Whatever - Вт 04:10")).toBe(true)
    expect(checkCardSuitability("Whatever - Ср 08:20")).toBe(true)
    expect(checkCardSuitability("Whatever - Чт 12:30")).toBe(true)
    expect(checkCardSuitability("Whatever - Пт 16:40")).toBe(true)
    expect(checkCardSuitability("Whatever - Сб 20:50")).toBe(true)
    expect(checkCardSuitability("Whatever - Вс 23:59")).toBe(true)

    // Hours invalid
    expect(checkCardSuitability("Whatever - Вс 24:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Вс 99:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Вс 140:00")).toBe(false)
    
    // Minutes invalid
    expect(checkCardSuitability("Whatever - Вс 12:60")).toBe(false)
    expect(checkCardSuitability("Whatever - Вс 12:61")).toBe(false)
    expect(checkCardSuitability("Whatever - Вс 12:99")).toBe(false)
    expect(checkCardSuitability("Whatever - Вс 12:100")).toBe(false)
    
    // Both invalid
    expect(checkCardSuitability("Whatever - Вс 24:60")).toBe(false)
    expect(checkCardSuitability("Whatever - Вс 25:70")).toBe(false)
    expect(checkCardSuitability("Whatever - Вс 100:100")).toBe(false)
  })

  it("Tests day abbreviation", () => {
    // Invalid
    expect(checkCardSuitability("Whatever - Пс 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Па 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Ре 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Нь 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Шо 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Ка 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Во 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Бб 12:00")).toBe(false)
    expect(checkCardSuitability("Whatever - Пп 12:00")).toBe(false)
  })
  it("Tests 'series title' part of the card name (left part)", () => {
    // Valid
    expect(checkCardSuitability("Whatever - Пн 12:00")).toBe(true)
    expect(checkCardSuitability("What ever - Вт 12:00")).toBe(true)
    expect(checkCardSuitability("Wh at ev er - Ср 12:00")).toBe(true)
    expect(checkCardSuitability("W h a t e v e r - Чт 12:00")).toBe(true)
    expect(checkCardSuitability("W hateve r - Пт 12:00")).toBe(true)
    expect(checkCardSuitability("Wh atev er - Сб 12:00")).toBe(true)
    expect(checkCardSuitability("What ever - Вс 12:00")).toBe(true)
    expect(checkCardSuitability("What - ever - Пн 12:00")).toBe(true)
    expect(checkCardSuitability("Wh-at - ev-er - Вт 12:00")).toBe(true)
    expect(checkCardSuitability("Wh - at - e - v - er - Сб 12:00")).toBe(true)

    // Invalid
    expect(checkCardSuitability(" - Вс 12:00")).toBe(false)
  })
})

describe("Testing 'processTitle' function", () => {
  
})


describe("Testing 'formatNumber' function", () => {
  
})
