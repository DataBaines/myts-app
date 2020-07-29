export function getWeekNumber(d: Date){
    //Get the week number and year.
    //Weeks start on a Saturday
    //Week number 1 is the first full week of the year, 
    //  therefore 1st jan could be week 52 of the previous year

    function yearStart(y){
        var onejan = new Date(y,0,1)
        var firstSatJan = new Date(y,0,1)
        firstSatJan.setDate(onejan.getDate() + (6 - onejan.getDay())) //First 'Day 6' (Sat)
        return firstSatJan
    }
    console.log('getwknum '+ d)

    d.setHours(0,0,0,0)
    var yr = d.getFullYear()
    var yearStartDate = yearStart(yr)
  
    if(d < yearStartDate){
        yr = yr -1
        yearStartDate = yearStart(yr)
    }
    
    var wk = Math.ceil((((d.valueOf() - yearStartDate.valueOf()) / 86400000) + 1)/7)

    return {year:yr, week:wk}
}
  
export function getYearWeekString(d:Date){
    let yw = getWeekNumber(d)
    return yw.year + '_' + yw.week
}

export function getSaturdayFriday(d: Date)
{
    let d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    let dayNo = d1.getDay()
    d1.setDate(d1.getDate() - dayNo + 5)

    if(dayNo > 5){
        d1.setDate(d1.getDate() + 7)
    }

    let d2 = new Date(d1.valueOf())
    d2.setDate(d1.getDate() - 6)
   
    return {Sat:d2, Fri:d1}
}

export function getSaturdayFridayString (selDate: Date) {
    let d = getSaturdayFriday(selDate)
    let str = [d.Sat.getDate(), d.Sat.getMonth()+1, d.Sat.getFullYear()].join('/')
    str += ' - '
    str += [d.Fri.getDate(), d.Fri.getMonth()+1, d.Fri.getFullYear()].join('/')

    return str
}

export function getDateString (selDate: Date) {
    return [selDate.getDate(), selDate.getMonth()+1, selDate.getFullYear()].join('/')
}
