import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let res = await fetch(`${config.backendEndpoint}/reservations/`);
    let data = await res.json();
    console.log(data)
    return data;}
    catch(err){return null;}


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length==0)
  {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }

  for (let res of reservations)
  { 
    const option1 = { year: 'numeric', month: 'long', day: 'numeric' };
    const option2={hour:'numeric', minute:'2-digit', second:'2-digit', hour12:true}
    
    let dt=new Date(`${res.date}`).toLocaleDateString('en-IN');

    let d=new Date(`${res.time}`)
    let date=d.toLocaleDateString("en-IN", option1)
    let t=d.toLocaleDateString("en-IN", option2)
    let Time1=t.split(", ")
    let time=Time1[1];
    let s=date+", "+time

    let tbody=document.getElementById("reservation-table");
    let row=document.createElement("tr");
    row.innerHTML=`
    <td>${res.id}</td>
    <td>${res.name}</td>
    <td>${res.adventureName}</td>
    <td>${res.person}</td>
    <td>${dt}</td> 
    <td>${res.price}</td>
    <td>${s}</td>
    <td id=${res.id}> <a href=${config.backendEndpoint}/adventures/detail/?adventure=${res.adventure}> <button type="button" class="reservation-visit-button"> Visit Adventure </button> <a> </td>`
    tbody.appendChild(row)
    
  }
  }
  

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */


export { fetchReservations, addReservationToTable };
