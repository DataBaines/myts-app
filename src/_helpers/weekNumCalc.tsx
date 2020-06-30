export function weekNumberCalculation(d: Date){
    if(d >= new Date(2020, 4, 9) && d < new Date(2020, 4, 16))
        return '2020_19' //Month 4 is May, zero index on month but not day
    else if(d >= new Date(2020, 4, 16) && d < new Date(2020, 4, 23)){
        return '2020_20'
    }
    else if(d >= new Date(2020, 4, 23) && d < new Date(2020, 4, 30)){
        return '2020_21'
    }
    else if(d >= new Date(2020, 4, 30) && d < new Date(2020, 5, 6)){
        return '2020_22'
    }
    else if(d >= new Date(2020, 5, 6) && d < new Date(2020, 5, 13)){
        return '2020_23'
    }
    else if(d >= new Date(2020, 5, 13) && d < new Date(2020, 5, 20)){
        return '2020_24'
    }
    else {
        return '2019_12' //Random!!! no result
    }
        
}

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

// function getWeek(d: Date) {
//     var sevenjan = new Date(d.getFullYear(),0,7);
//     var first = d.getDate() - d.getDay(); // Day minus day of week
  
//     var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
//     var dayOfYear = ((today - sevenjan + 86400000)/86400000);
//     return Math.ceil(dayOfYear/7)
//   };
  
// var today = new Date(2019,11,31);