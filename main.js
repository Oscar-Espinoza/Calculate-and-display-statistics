function createTable(data) {
    dataMembers = data.results[0].members;

    let memberProperties = {
        'First name': 'first_name',
        'Middle name': 'middle_name',
        'Last name': 'last_name',
        'Party': 'party',
        'State': 'state',
        'Seniority': 'seniority',
        'Votes with party pct': 'votes_with_party_pct'
    };

    let tableHead = "<tr>";
    let table;
    for (let propertyName in memberProperties) {
        tableHead += "<th>" + propertyName + "</th>";
    }

    dataMembers.forEach(member => {

        if (member.middle_name == null) {
            member.middle_name = "";
        }

        member.votes_with_party_pct = member.votes_with_party_pct.toString() + " %";
        member.first_name = "<a href='" + member.url + "' target='_blank'>" + member.first_name + "</a>";

        table += "<tr>";
        for (let property in memberProperties) {
            table = table + "<td>" + member[memberProperties[property]] + "</td>";
        }
        table += "</tr>";
    });

    table = tableHead + table;
    document.getElementById("senate-data").innerHTML = table;
}

function getGlanceData(members){

  let glanceData = [
          {'party': 'Republicans',
          'total': 0,
          'votesWithParty': 0},
          {'party': 'Democrats',
          'total': 0,
          'votesWithParty': 0},
          {'party':'Independents',
          'total': 0,
          'votesWithParty': 0},
          {'party': 'Total',
          'total': 0,
          'votesWithParty':0},
      ]
      const [Republicans, Democrats, Independents, Total] = glanceData
      
      members.forEach(member => {      
        switch (member.party) {
          case 'D':
            Democrats.total += 1;
            Democrats.votesWithParty += member.votes_with_party_pct;
          break;

          case 'R':
            Republicans.total += 1;
            Republicans.votesWithParty += member.votes_with_party_pct;
          break;

          default:
            Independents.total += 1;
            Independents.votesWithParty += member.votes_with_party_pct;
          break;
        }
      })

      glanceData.forEach(party => {
        if (party.total != 0) {
          party.votesWithParty /= party.total
        }
      });
      
      Total.total = Independents.total + Democrats.total + Republicans.total
      Total.votesWithParty = Independents.votesWithParty + Democrats.votesWithParty + Republicans.votesWithParty
      return glanceData
}

function getAttendanceData(tableID, members, propertyFilter){

  let AttendanceData = [];
  if (tableID == "Least") {
    members.sort((a, b) => {
      if (a.missed_votes < b.missed_votes) {return 1} 
      else if (a.missed_votes > b.missed_votes) {return -1} 
      else {return 0}      
    })
  } else if (tableID == "Most") {
    members.sort((a, b) => {
      if (a.missed_votes > b.missed_votes) {return 1} 
      else if (a.missed_votes < b.missed_votes) {return -1} 
      else {return 0}
    })
  }

  for (let i = 0; i < Math.round(members.length/10); i++) {
    AttendanceData.push(members[i])
  }
  return AttendanceData

}

function GetLoyaltyData(tableID, members){
  let AttendanceData = [];
  if (tableID == "Least") {
    members.sort((a, b) => {
      if ((a.total_votes) < (b.total_votes)) {return 1} 
      else if ((a.total_votes) > (b.total_votes)) {return -1} 
      else {return 0}      
    })
  } else if (tableID == "Most") {
    members.sort((a, b) => {
      if ((a.total_votes) > (b.total_votes)) {return 1} 
      else if ((a.total_votes) < (b.total_votes)) {return -1} 
      else {return 0}
    })
  }

  for (let i = 0; i < Math.round(members.length/10); i++) {
    AttendanceData.push(members[i])
  }
  
  return AttendanceData

}


function getTableData(tableID, members){

let tableData;

  switch (tableID) {
    case 'GlanceTable':
      tableData = getGlanceData(members)
    break;

    case 'Least Engagged':
    tableData = getAttendanceData(tableID, members)
    break;

    case 'Most Engagged':
    tableData = getAttendanceData(tableID, members)
    break;

    case 'Most Loyal':
      tableData = GetLoyaltyData(tableID, members)
    break;
    case 'Least Loyal':
      tableData = GetLoyaltyData(tableID, members)
    break;
  }

  return tableData

}

function createCalculatedTable(tableID, data, tableProperties) {

  const dataMembers = data.results[0].members;
  dataMembers.forEach( member => {
    member.first_name = "<a href='" + member.url + "' target='_blank'>" + member.first_name + "</a>";
  });
  const tableData = getTableData(tableID, dataMembers)
  if(tableID == 'Least'){
    console.log(tableData)
  }

  let tableHead = "<tr>";
  for (let propertyName in tableProperties) {
      tableHead += "<th>" + propertyName + "</th>";
  }

  tableHead+="</tr>";

let table = "";

tableData.forEach(row => {
  table+="<tr>";
  for(let property in tableProperties){
    property = tableProperties[property];
    table += `<td>${row[property]}`;
  }
  table+="</tr>";

});

table = tableHead + table;
document.getElementById(tableID).innerHTML = table;
}



// DATOS A LLAMAR PARA GENERAR LAS TABLAS 

const glanceProperties = {
            'Party': 'party',
            'Number of Representants': 'total',
            '% Votes with party': 'votesWithParty',
        }

const attendanceProperties = {
  'Name': 'first_name',
  'No. Missed Votes':'missed_votes',
  '% Missed': 'missed_votes_pct'
}

const loyaltyProperties = {
  'Name': 'first_name',
  'No Party Votes':'total_votes',
  '% Party votes': 'votes_with_party_pct'
}