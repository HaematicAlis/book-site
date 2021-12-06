import React from 'react';
import { Page } from '../src/App.js'; 
import { sendEmail } from '../src/api.js';
import { createScheduleEmail, getAllProfessors, checkScheduleEmail, removeBlankEmail} from '../src/api.js';



const Requests = ({setCurrentPage, currentUser}) => {
    
    
    const doSendInviteEmail = () => {
        var recpt = document.getElementById("emailEntry").value
        var message = ""
        
        if(recpt === '')
        {
            alert('Email Missing')
        }
        else
        {
            message = '<html><body>';
            message += '<h3>Professor please submit your book request</h3>'
            message += 'Time is running out<br>'
            message += '<a href="http://localhost:3000">Go to book order website</a>';
            message += '</body></html>';
            sendEmail([recpt], "Please enter your book requests", message)
        }

    }



    const doSendDeadlineEmail = () => {
        var recpt = document.getElementsByClassName("emailCheck")
        var count = recpt.length;
        var i = 0;
        var checked = false;
        var date = document.getElementById("dateDeadline").value
        
        if(date === '')
        {
            alert('Please set a deadline')
        }
        else
        {
            for(i;i < count;i++)
            {
                if(recpt[i].checked)
                {
                    var emailAdd = recpt[i].id;
                    checked = true;
                    var message = ""
                    message = '<html><body>';
                    message += '<h3>Professor please be aware of our deadline</h3>'
                    message += 'The deadline is '
                    message += date + '.<br/>'
                    message += '<a href="http://localhost:3000">Go to book order website now</a>' ;
                    message += '</body></html>';
                    sendEmail([emailAdd], "Please enter your book requests", message)
                }
                recpt[i].checked = false;
            }
            if(checked)
            {
                alert('Message Sent')
            }
            else
            {
                alert('Please Select Check Box')
            }
        }
    
    }
    

    const doGoBack = () => {
        setCurrentPage(Page.AdminDashboard)
    }

    const updateTable = (employeeList) => {
        document.getElementById("table").innerHTML = ""
        employeeList.forEach(employ => {
            if(employ.email.length > 10){
                document.getElementById("table").innerHTML +=
                '<tr> <td class="tdinvite">' + '<input class="emailCheck" type="checkbox" id = "' + employ.email + '"></input>' +
                '</td> <td class="tdinvite">' + employ.name +
                '</td> <td class="tdinvite">' + employ.email +'</td> </tr>';
            }
            
/*             document.getElementById()
 */
        })
    }

    const getProfessorList1 = () => {

        var res = getAllProfessors()
        console.log("get request form result: " + res)
        if (res.status === "success") {
            document.getElementById("requestFormGroup").hidden = false
            updateTable(res.employ)
            document.getElementById("deadline").hidden = false
            document.getElementById("dateDeadline").hidden = false

        } else {
            document.getElementById("requestFormGroup").hidden = true
            document.getElementById("dateDeadline").hidden = true
            document.getElementById("deadline").hidden = true
        }
    }

    const updateDropdown = (employeeList) => 
    {
        var selectElement = document.getElementById("professorList");
        var i, list = selectElement.options.length - 1;
        for(i = list; i >= 0; i--) {
           selectElement.remove(i);
        }
        var option = document.createElement('option');
        option.text = "Select a Professor";
        option.value = "";
        selectElement.add(option);

        for(var j = 0; j < employeeList.length; j++ )
        {
            var option = document.createElement('option');
            option.text = employeeList[j].name;
            option.value = employeeList[j].email;
            selectElement.add(option);
        }
        selectElement.onchange = addEmail;

    }

    const updateDropdown2 = (employeeList) => 
    {
        var selectElement = document.getElementById("professorList2");
        var i, list = selectElement.options.length - 1;
        for(i = list; i >= 0; i--) {
           selectElement.remove(i);
        }
        var option = document.createElement('option');
        option.text = "Select a Professor";
        option.value = "";
        selectElement.add(option);

        for(var j = 0; j < employeeList.length; j++ )
        {
            var option = document.createElement('option');
            option.text = employeeList[j].name;
            option.value = employeeList[j].email;
            selectElement.add(option);
        }
        selectElement.onchange = addEmail2;

    }

    const addEmail = () => {
        var selectElement = document.getElementById("professorList");
        document.getElementById("emailEntry").value = selectElement.value;
    }

    const addEmail2 = () => {
        var selectElement = document.getElementById("professorList2");
        document.getElementById("emailEntry2").value = selectElement.value;
    }

    const getProfessorList2 = () => {
        document.getElementById("professorList").hidden = false;

        var res = getAllProfessors()
        console.log("get request form result: " + res)
        if (res.status === "success") {
            updateDropdown(res.employ)
            document.getElementById("emailEntry").hidden = false
            document.getElementById("emailButton").hidden = false

        } 
        else {
            document.getElementById("emailEntry").hidden = true
            document.getElementById("emailButton").hidden = true
        }
    }

    const getProfessorList3 = () => {
        document.getElementById("professorList2").hidden = false;

        var res = getAllProfessors()
        console.log("get request form result: " + res)
        if (res.status === "success") {
            updateDropdown2(res.employ)
            document.getElementById("emailEntry2").hidden = false
            document.getElementById("emailButton2").hidden = false
            document.getElementById("scheduleDate").hidden = false
            

        } 
        else {
            document.getElementById("emailEntry2").hidden = true
            document.getElementById("emailButton2").hidden = true
            document.getElementById("scheduleDate").hidden = true

        }
    }

    if (document.readyState === "complete") 
    {
        setTimeout(() => {
            getProfessorList2();
            
        }, 0);
    } 
    else
    {
        window.addEventListener('load', getProfessorList2);
        return () => document.removeEventListener('load', getProfessorList2);
    }

    if (document.readyState === "complete") 
    {
        setTimeout(() => {
            getProfessorList3();
            
        }, 0);
    } 
    else
    {
        window.addEventListener('load', getProfessorList3);
        return () => document.removeEventListener('load', getProfessorList3);
    }

    const scheduleInviteEmail = () => {
        var recpt = document.getElementById("emailEntry2").value;
        var date = document.getElementById("scheduleDate").value;
        var res = checkScheduleEmail(recpt, date);

        if (res.status === "NotExists") {
        
            createScheduleEmail(recpt, date);
            alert('The invite is scheduled');

            document.getElementById("professorList2").selectedindex = 0;
            document.getElementById("scheduleDate").value = '';
            document.getElementById("emailEntry2").value = '';
                        
        }
        else
        {
            alert('This invite was aready scheduled');
        }

        removeBlankEmail();

    }

    return (
        
        <div className="loginPage">
            <h3>Broadcast Request Deadline</h3>
            <p id="flair" hidden={true}>Hey!!!</p>
            <button style={{ margin: "1em" }} type="button" onClick={getProfessorList1}> get all professors</button><br />
            <br />
            <input type="date" id="dateDeadline" hidden={true}/><br />
            <br/>
            <table className="tblinvite" id="requestFormGroup" hidden={true}> 
                    <thead className="invite">
                        <tr>
                            <th className="invite">Send</th> <th className="invite">Professor Name</th> <th className="invite">Email</th>
                        </tr>
                    </thead>
                    <tbody id="table">

                    </tbody>
            </table>
            <button style={{ margin: "1em"}} id="deadline" hidden={true} type="button" onClick={doSendDeadlineEmail}> Send Deadline</button><br />
            
            <h3>Schedule Reminder</h3>
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
                <p id="changeFlair" hidden={true}>Hey!!!</p>
                <select id="professorList2" hidden={true}></select>    
                <br />
                <input type="text" id="emailEntry2" placeholder="email" hidden={true}/><br />
                <input type="date" id="scheduleDate" hidden={true}/><br />
                <button style={{ margin: "1em" }} id="emailButton2" type="button" onClick={scheduleInviteEmail} hidden={true}>Schedule Reminder</button><br />
                <br />
            </div>
            <h3>Send a Invite</h3>
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
            }}>
{/*                 <button style={{ margin: "1em" }} type="button" onClick={getProfessorList2}>Invite Professor</button><br />
 */}                
                <select id="professorList" hidden={true}>
                </select>

                
                <br />
        
                <input type="text" id="emailEntry" placeholder="email" hidden={true}/><br />
                <button style={{ margin: "1em" }} id="emailButton" type="button" onClick={doSendInviteEmail} hidden={true}>Send Invite</button><br />
            </div>
            
            <button type="button" onClick={doGoBack}>Back To Dashboard</button><br />
        </div>
    );

    
}

export default Requests;